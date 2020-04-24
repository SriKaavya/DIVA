import csv
import pandas as pd
from pandas import *
import numpy as np
import json
from flask import jsonify

def myconverter(obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, datetime.datetime):
            return obj.__str__()

data = pd.read_csv('/Users/srikaavya/Downloads/Crimes_-_2001_to_present.csv', iterator=True, chunksize=100000)

data = pd.concat(data, ignore_index=True)
domestic_count = data[data['Domestic'] == True]['PrimaryType'].count()
Arrests = data[data['Arrest'] == True]['PrimaryType'].count()
homicides = data[data['PrimaryType'] == 'HOMICIDE']['PrimaryType'].count()
total = data['PrimaryType'].count()
print(total)
print(domestic_count)
print(Arrests)
print(homicides)

domestic = data[data['Domestic'] == True]
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
    max_limit = filtered.counts.nlargest(8).iloc[-1]
    print(max_limit)
    for row in filtered.itertuples(index=False):
        if  row[2] > max_limit:
            sub_list["District"] = row[1]
            sub_list["value"] = row[2]
            list['subData'].append(sub_list)
            sub_list = {}
    dict.append(list)
    list = {}
fdata = json.dumps(dict, default=myconverter)
print(fdata)
