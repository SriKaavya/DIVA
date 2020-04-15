#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 24 16:46:11 2020

@author: srikaavya
"""
import pandas as pd
import numpy as np
import csv
import json
from pandas import DataFrame

from flask import Flask, render_template, jsonify, request, flash, redirect, url_for


app = Flask(__name__)
data = pd.read_csv('/Users/srikaavya/Desktop/DIVA/Project/combined_csv.csv', iterator=True, chunksize=100000)
data = pd.concat(data, ignore_index=True)
dumb_data = data[['PrimaryType', 'Arrest']]
domestic = data[data['Domestic'] == True]
slice_pie = domestic[['PrimaryType','District']]


def myconverter(obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, datetime.datetime):
            return obj.__str__()

# pie_chart_data process
def pie_chart():
    pie_chart_data = data['PrimaryType'].value_counts().rename_axis('Crime').reset_index(name='counts')
    return pie_chart_data

@app.route('/pie-of-pie_charts')
def pie_of_pie():
    slice_pie_data = domestic[['PrimaryType','District']]
    crimes = slice_pie_data.groupby(['PrimaryType']).size().reset_index(name='counts')
    max_crimes = crimes.counts.nlargest(15).iloc[-1]
    slice_pie_data = slice_pie_data.groupby(['PrimaryType', 'District']).size().reset_index(name='counts')
    dict = []
    list = {}
    for crime in  slice_pie_data["PrimaryType"].unique():
        c = domestic[domestic.PrimaryType == crime]['PrimaryType'].count()
        if c > max_crimes:
            filtered = slice_pie_data[slice_pie_data.PrimaryType == crime]
            list['Crime'] = crime
            list['Count'] = c
            list['subData'] = []
            sub_list = {}
            max_limit = filtered.counts.nlargest(10).iloc[-1]
            for row in filtered.itertuples(index=False):
                if  row[2] > max_limit:
                    sub_list["District"] = row[1]
                    sub_list["value"] = row[2]
                    list['subData'].append(sub_list)
                    sub_list = {}
            dict.append(list)
            list = {}
    pie = json.dumps(dict, default=myconverter)
    return pie

@app.route('/pie_charts')
def pie_charts():
    data=pie_chart().to_json(orient='records')
    print(data)
    return data

@app.route('/Bar_race')
def bar_race():
    race_data = data[['Year', 'District']]
    race_data = race_data.groupby(['Year', 'District']).size().reset_index(name='counts')
    print(race_data)
    mydict = {}
    for row in race_data.itertuples(index=True):
        if row.District not in mydict.keys():
            mydict[row.District] = row.counts
        else:
            mydict[row.District] = mydict[row.District] + row.counts
            race_data.at[row.Index, 'counts'] = mydict[row.District]
    race_dict = race_data.to_dict('records')
    return jsonify(race_dict)

@app.route('/Dumbellplot')
def dumbell_plot():
    data = dumb_data.groupby(['PrimaryType', 'Arrest']).size().reset_index(name='counts')
    dict = []
    list = {}
    for row in data.itertuples(index=False):

        if row[0] not in list.values():
            list['category'] = row[0]
            list['close'] = row[2]
        else:
            list['open'] = row[2]
            dict.append(list)
            list = {}
    dumbel_data=jsonify(dict)
    return dumbel_data

@app.route('/WordCloud')
def WordCloud():
    data_wc = data['PrimaryType'].value_counts().rename_axis('tag').reset_index(name='counts')
    WordCloud_data = data_wc.to_json(orient='records')
    return WordCloud_data

@app.route('/')
def main_page():
    return render_template('DIVA.html')

@app.route('/Stats')
def Stats():
    return render_template('StatisticsView1.html')


@app.route('/Judiciary')
def Judiciary():
    return render_template('Judiciary.html')

if __name__ == "__main__":
    app.debug = True
    app.run()

