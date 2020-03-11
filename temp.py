# -*- coding: utf-8 -*-
import folium 
import folium.plugins 
import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px
from folium.plugins import HeatMapWithTime
from flask import Flask, render_template, request, g
import time

app = Flask(__name__)

@app.before_request
def before_request():
   g.request_start_time = time.time()
   g.request_time = lambda: "%.4fs" % (time.time() - g.request_start_time)

@app.route('/', methods = ['GET','POST'])
def home():
    return render_template("home_page.html")

@app.route('/Plots', methods = ['GET','POST'])
def Plots():
    df = pd.read_csv('/Users/srikaavya/Downloads/crimes-in-chicago/data.csv', error_bad_lines=False)
    df.Date = pd.to_datetime(df.Date, format='%m/%d/%Y %H:%M:%S %p')
    df['month'] = df.Date.apply(lambda x: x.month)
    df['week'] = df.Date.apply(lambda x: x.week)
    df['day'] = df.Date.apply(lambda x: x.day)
    df['hour'] = df.Date.apply(lambda x: x.hour)
    fig = px.line(df, x = 'Date', title= 'No of cases registered') 
    fig.show()
    a = df.Arrest
    y = df.Date
    x = df['Location Description']
    plt.scatter(x, y)
    plt.ylabel('Date')
    plt.show()
    plt.savefig("/Users/srikaavya/Downloads/crimes-in-chicago/figure1.png")
    return render_template("Plots.html")
    
"""

a = df.Arrest
y = df.Date

x = df['Location Description']

plt.hist(x,y)
plt.ylabel('Date')
plt.show()

plt.scatter(x, y)
plt.savefig("/Users/srikaavya/Downloads/crimes-in-chicago/figure.png")


df = pd.read_csv('/Users/srikaavya/Downloads/crimes-in-chicago/data.csv', error_bad_lines=False)
df.head()
df.Date = pd.to_datetime(df.Date, format='%m/%d/%Y %H:%M:%S %p')

fig = px.histogram(df, x="Date", y="Location Description")
fig.show()
fig.savefig("/Users/srikaavya/Downloads/crimes-in-chicago/figure1.png")

df.Date = pd.to_datetime(df.Date, format='%m/%d/%Y %H:%M:%S %p')
df['month'] = df.Date.apply(lambda x: x.month)
df['week'] = df.Date.apply(lambda x: x.week)
df['day'] = df.Date.apply(lambda x: x.day)
df['hour'] = df.Date.apply(lambda x: x.hour)


a = df.Arrest
y = df.Date

x = df['Location Description']

plt.hist(x,y)
plt.ylabel('Date')
plt.show()

plt.scatter(x, y)
plt.savefig("/Users/srikaavya/Downloads/crimes-in-chicago/figure.png")


plt.plot(x,y)
plt.gcf().autofmt_xdate()

plt.show()

def generateBaseMap(default_location=[41.8803, -87.6236], default_zoom_start=12):
    base_map = folium.Map(location=default_location, control_scale=True, zoom_start=default_zoom_start)
    return base_map

"""
if __name__ == '__main__':
    app.run(debug=True)