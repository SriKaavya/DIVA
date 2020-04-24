#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 17 16:52:57 2020

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
data = pd.read_csv('/Users/srikaavya/Downloads/Crimes_-_2001_to_present.csv', iterator=True, chunksize=100000)
data = pd.concat(data, ignore_index=True)
dist_dict={1:"Central", 2:"Wentworth", 3:"Grand Crossing", 4:"South Chicago", 5:"Calumet", 6:"Gresham", 7:"Eaglewood", 8:"Chicago Lawn", 9:"Deering", 10:"Ogden", 11:"Harrison", 12:"Near West", 14:"Shakespeare", 15:"Austin", 16:"Jefferson Park", 17:"Albany Park", 18:"Near North", 19:"Town Hall", 20:"Lincoln", 22:"Morgan Park", 24:"Rogers Park", 25:"Grand Central"}
rm_dist = {1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,22,24,25}
data = data[data.District.isin(rm_dist)]
 
   # d["District"] = dist_dict[d["District"]]

print(data.head())
