function raceChartData(racedata) {
    // Data processing
    var list_main = {};
    var data_array = [];
    for (var i = 0; i < racedata.length; i++) {
        var list_temp = {};
        if (Object.getOwnPropertyNames(list_main).length === 0) {
            list_main[racedata[i].Year] = {};
        }
        if (list_main.hasOwnProperty(racedata[i].Year)) {
            list_temp.District = racedata[i].District;
            list_temp.counts = racedata[i].counts;
            //         list_temp.push({ District : racedata[i].District,
            //            counts: racedata[i].counts});
            data_array.push(list_temp);
            if (i === (racedata.length - 1)) {
                list_main[racedata[i].Year] = data_array;
            }
        } else {
            var year_num = racedata[i].Year - 1;
            list_main[year_num] = data_array;
            //Clearing the data array
            data_array = [];

            list_main[racedata[i].Year] = {};
            list_temp.District = racedata[i].District;
            list_temp.counts = racedata[i].counts;
            data_array.push(list_temp);
//            console.log(data_array);
        }
    }
console.log(list_main);

     am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.width = am4core.percent(100);
	chart.height = am4core.percent(100);
	chart.layout = "horizontal";

        chart.numberFormatter.bigNumberPrefixes = [{
                "number": 1e+3,
                "suffix": "K"
            },
            {
                "number": 1e+6,
                "suffix": "M"
            },
            {
                "number": 1e+9,
                "suffix": "B"
            }
        ];

        var label = chart.plotContainer.createChild(am4core.Label);
        label.x = am4core.percent(97);
        label.y = am4core.percent(95);
        label.horizontalCenter = "right";
        label.verticalCenter = "middle";
        label.dx = -15;
        label.fontSize = 50;

        var playButton = chart.plotContainer.createChild(am4core.PlayButton);
        playButton.x = am4core.percent(97);
        playButton.y = am4core.percent(95);
        playButton.dy = -2;
        playButton.verticalCenter = "middle";
        playButton.events.on("toggled", function(event) {
            if (event.target.isActive) {
                play();
            } else {
                stop();
            }
        })

        var stepDuration = 10000;

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "District";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.rangeChangeEasing = am4core.ease.linear;
        valueAxis.rangeChangeDuration = stepDuration;
        valueAxis.extraMax = 0.1;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "District";
        series.dataFields.valueX = "counts";
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;
        series.interpolationDuration = stepDuration;
        series.interpolationEasing = am4core.ease.linear;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "right";
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.label.textAlign = "end";
        labelBullet.label.dx = -10;

        chart.zoomOutButton.disabled = true;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        var year = 2001;
        label.text = year.toString();

        var interval;

        function play() {
            interval = setInterval(function() {
                nextYear();
            }, stepDuration)
            nextYear();
        }

        function stop() {
            if (interval) {
                clearInterval(interval);
            }
        }

        function nextYear() {
            year++

            if (year > 2016) {
                year = 2001;
            }

            var newData = list_main[year];
            var itemsWithNonZero = 0;
            for (var i = 0; i < chart.data.length; i++) {
                chart.data[i].counts = newData[i].counts;
                if (chart.data[i].counts > 0) {
                    itemsWithNonZero++;
                }
            }

            if (year == 2001) {
                series.interpolationDuration = stepDuration / 4;
                valueAxis.rangeChangeDuration = stepDuration / 4;
            } else {
                series.interpolationDuration = stepDuration;
                valueAxis.rangeChangeDuration = stepDuration;
            }

            chart.invalidateRawData();
            label.text = year.toString();

            categoryAxis.zoom({
                start: 0,
                end: itemsWithNonZero / categoryAxis.dataItems.length
            });
        }


        categoryAxis.sortBySeries = series;

//        var allData[year] = list_main[year];
        chart.data = JSON.parse(JSON.stringify(list_main[year]));
        categoryAxis.zoom({
            start: 0,
            end: 1 / chart.data.length
        });

        series.events.on("inited", function() {
            setTimeout(function() {
                playButton.isActive = true; // this starts interval
            }, 4000)
        })

    }); // end am4core.ready()



}

fetch('http://127.0.0.1:5000/Bar_race')
    .then(res => res.json())
    .then((out) => {
        raceChartData(out);
    }).catch(err => console.error(err));
