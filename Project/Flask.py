import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px
from folium.plugins import HeatMapWithTime
from flask import Flask, render_template, request, g
import time
import pymysql.cursors
import time

app = Flask(__name__)
mysql = pymysql.connect(host = 'dbdsproject.cvbsujihjjhj.us-east-1.rds.amazonaws.com',
                                    user = 'SriKaavya',
                                    password = 'Radha0909',
                                    db = 'DBDSDATABASE',
                                    charset = 'utf8mb4',
                                    cursorclass = pymysql.cursors.DictCursor,
                                    autocommit = True)
 
cur = mysql.cursor()

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

@app.route('/mysql', methods = ['GET','POST'])
def MySQL():
  if request.method == 'POST':
   try:
    text = request.form['MySQL']
    query = text.upper()
    cur.execute(query)
    response = cur.fetchall()
    cols = []
    for x in response[0] :
        cols.append(x)
    return render_template("output_MySQL.html", data = response, columns = cols)
   except Exception as e:
    return (str(e)+'Please click back')
  else:
    query = "select table_name,column_name,column_type from information_schema.columns where table_schema = 'DBDSDatabase' order by table_name,ordinal_position"
    query = query.upper()
    cur.execute(query)
    catalog = cur.fetchall()
    cols = []
    for x in catalog[0] :
        cols.append(x)
    return render_template("home.html", catalog = catalog, columns = cols)

if __name__ == '__main__':
    app.run(debug=True)(base)
