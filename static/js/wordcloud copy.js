<title>Dashboard</title>
            <br>  <br>  <br> 
            <center>
<body onload="wordcloud_func('success')"style="font-family:Montserrat;color:#aaaaaa;">
                <!-- <div class="graph-content"> -->
                    <div id="successful-words" style="width: 100%; height: 250px;">
                        <div id="successful-words-cloud"></div>
                        <!-- <br> -->
                    </div>
                <!-- </div> -->
        <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
        <script src="https://www.amcharts.com/lib/4/core.js"></script>
        <!-- <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script> -->
        <script src="https://www.amcharts.com/lib/4/charts.js"></script>
        <script src="https://www.amcharts.com/lib/4/plugins/wordCloud.js"></script>
        <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.10.3/babel.min.js'></script>
        <script src="{{ url_for('static', filename='js/line_chart_slide.js') }}"></script>
        <!-- <script src="{{ url_for('static', filename='js/wordcloud.js') }}"></script> -->
        <script>
            // Themes begin
            data_wc = [{'tag':'ARSON', 'count': 13097}, {'tag':'ASSAULT', 'count': 481661}, {'tag':'BATTERY', 'count': 1442716}, {'tag':'BURGLARY', 'count': 470958}, {'tag':'CONCEALED CARRY LICENSE VIOLATION', 'count': 90}, {'tag':'CRIM SEXUAL ASSAULT', 'count': 29868}, {'tag':'CRIMINAL DAMAGE', 'count': 922999}, {'tag':'CRIMINAL TRESPASS', 'count': 229367}, {'tag':'DECEPTIVE PRACTICE', 'count': 280931}, {'tag':'DOMESTIC VIOLENCE', 'count': 2}, {'tag':'GAMBLING', 'count': 18806}, {'tag':'HOMICIDE', 'count': 9051}, {'tag':'HUMAN TRAFFICKING', 'count': 28}, {'tag':'INTERFERENCE WITH PUBLIC OFFICER', 'count': 15710}, {'tag':'INTIMIDATION', 'count': 4636}, {'tag':'KIDNAPPING', 'count': 7756}, {'tag':'LIQUOR LAW VIOLATION', 'count': 17513}, {'tag':'MOTOR VEHICLE THEFT', 'count': 370548}, {'tag':'NARCOTICS', 'count': 885431}, {'tag':'NON - CRIMINAL', 'count': 38}, {'tag':'NON-CRIMINAL', 'count': 97}, {'tag':'NON-CRIMINAL (SUBJECT SPECIFIED)', 'count': 4}, {'tag':'OBSCENITY', 'count': 496}, {'tag':'OFFENSE INVOLVING CHILDREN', 'count': 91621}, {'tag':'OTHER NARCOTIC VIOLATION', 'count': 144}, {'tag':'OTHER OFFENSE', 'count': 491923}, {'tag':'PROSTITUTION', 'count': 86401}, {'tag':'PUBLIC INDECENCY', 'count': 163}, {'tag':'PUBLIC PEACE VIOLATION', 'count': 58548}, {'tag':'RITUALISM', 'count': 31}, {'tag':'ROBBERY', 'count': 300453}, {'tag':'SEX OFFENSE', 'count': 28707}, {'tag':'STALKING', 'count': 3734}, {'tag':'THEFT', 'count': 1640506}, {'tag':'WEAPONS VIOLATION', 'count': 77429}];
                series.colors = new am4core.ColorSet();
            function wordcloud_func(tid){
                if (tid == "success"){
                    var text_cloud = data_wc;
                }
                else {
                    var text_cloud = data_wc;
                }
                am4core.useTheme(am4themes_animated);
                var chart = am4core.create("successful-words-cloud", am4plugins_wordCloud.WordCloud);
                chart.fontFamily = "Courier New";
                var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
                series.randomness = 0.1;
                series.rotationThreshold = 0.5;
                series.minCount = 100;
                series.minWordLength = 5;
                series.data = text_cloud;
                series.dataFields.word = "tag";
                series.dataFields.value = "count";
                series.heatRules.push({
                    "target": series.labels.template,
                    "property": "fill",
                    "min": am4core.color("#0000CC"),
                    "max": am4core.color("#CC00CC"),
                    "dataField": "value"
                });
                series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";
            }
        </script>
</body>               