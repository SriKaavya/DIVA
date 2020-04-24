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
import datetime
from pandas import DataFrame

from flask import Flask, render_template, jsonify, request, flash, redirect, url_for


app = Flask(__name__)
data = pd.read_csv('/Users/srikaavya/Downloads/CrimeData.csv', iterator=True, chunksize=100000)
data = pd.concat(data, ignore_index=True)
dist_dict={1:"Central", 2:"Wentworth", 3:"Grand Crossing", 4:"South Chicago", 5:"Calumet", 6:"Gresham", 7:"Eaglewood", 8:"Chicago Lawn", 9:"Deering", 10:"Ogden", 11:"Harrison", 12:"Near West", 14:"Shakespeare", 15:"Austin", 16:"Jefferson Park", 17:"Albany Park", 18:"Near North", 19:"Town Hall", 20:"Lincoln", 22:"Morgan Park", 24:"Rogers Park", 25:"Grand Central"}
rm_dist = {1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,22,24,25}
data = data[data.District.isin(rm_dist)]
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
        elif isinstance(obj,datetime.datetime):
            return obj.__str__()

# pie_chart_data process
def pie_chart():
    pie_chart_data = data['PrimaryType'].value_counts().rename_axis('Crime').reset_index(name='counts')
    return pie_chart_data

@app.route('/pie-of-pie_charts')
def pie_of_pie():
    slice_pie_data = domestic[['PrimaryType', 'District']]
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
                    sub_list["District"] = dist_dict[row[1]]
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
    mydict = {}
    print(race_data)
    for row in race_data.itertuples(index=True):
        if row.District not in mydict.keys():
            mydict[row.District] = row.counts
        else:
            mydict[row.District] = mydict[row.District] + row.counts
            race_data.at[row.Index, 'counts'] = mydict[row.District]
    race_dict = race_data.to_dict('records')
    for dist in race_dict:
        dist["District"] = dist_dict[dist["District"]]
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

def safety_rating(data):
    risk_categories = {'High': {'01A', '02', '04A', '04B'}, 'Moderate': {'01B', '03', '05', '06', '07', '09', '17'},
                       'Low': {'08B', '08A', '10', '11', '12', '13', '15', '16', '18', '19', '20', '22', '24', '26'}}
    rating_data = data[['District', 'PrimaryType', 'FBICode','Year']]
    rating_data = rating_data[rating_data.Year == 2016]

    rating_data = rating_data.groupby([ 'District', 'FBICode']).size().reset_index(name='counts')
    rating_data[rating_data['FBICode'].astype(str).str.isdigit()]

    dict2={}

    for data in rating_data.itertuples():
        if data.District not in dict2:
            risk_points = 0
            dict2[data.District] = risk_points

        if data[2] in risk_categories['High']:
            risk_points = risk_points + data[3]*2
        if data[2] in risk_categories['Moderate']:
            risk_points = risk_points + data[3]*1.5
        else:
            risk_points = risk_points + data[3]*1
        dict2[data.District]= int(risk_points/200)

    final_dict= { dist_dict[k]:v for k,v in dict2.items()}
    # print(final_dict)
    return final_dict

@ app.route('/Safety_Rating')
def gauge_safety():
    return jsonify(safety_rating(data))

@app.route('/WordCloud')
def WordCloud():
    data_wc = data['PrimaryType'].value_counts().rename_axis('tag').reset_index(name='counts')
    WordCloud_data = data_wc.to_json(orient='records')
    return WordCloud_data
"""
@app.route('/ChicagoMap')
def Chicago_district():
    data_map = data['District'].value_counts().reset_index(name='counts')

@app.route('/ChicagoDistrictMap')
def Chicago_district_map():


@app.route('/ChicagoCAMap')
def Chicago_district_map():
    """

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

