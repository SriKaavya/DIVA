// Themes end
function chart_data(fdata) {
    var data = [];
    for (var i = 0; i < fdata.length; i++) {
        data.push({
            category: fdata[i].category,
            open: fdata[i].open,
            close: fdata[i].close
        });
    }
    // Themes begin
    am4core.useTheme(am4themes_animated);
    //console.log(data);
    am4core.ready(function() {
        var chart = am4core.create("dumbell", am4charts.XYChart);

        var open = 100; // scale value for bottom
        var close = 20000; // scale value for top
        am4core.useTheme(am4themes_animated);

        chart.data = data;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.minGridDistance = 15;
        categoryAxis.renderer.grid.template.location = 0.5;
        categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
        categoryAxis.renderer.labels.template.rotation = -90;
        categoryAxis.renderer.labels.template.horizontalCenter = "left";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.inside = false;

        categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
            return -target.maxRight / 2;
        })

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.logarithmic =true;
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.renderer.axisFills.template.disabled = true;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "category";
        series.dataFields.openValueY = "open";
        series.dataFields.valueY = "close";
        series.tooltipText = "Arrest: {openValueY.value} Cases: {valueY.value}";
        series.sequencedInterpolation = true;
        series.fillOpacity = 0;
        series.strokeOpacity = 1;
        series.columns.template.width = 0.01;
        series.tooltip.pointerOrientation = "horizontal";

        var openBullet = series.bullets.create(am4charts.CircleBullet);
        openBullet.locationY = 1;

        var closeBullet = series.bullets.create(am4charts.CircleBullet);

        closeBullet.fill = chart.colors.getIndex(4);
        closeBullet.stroke = closeBullet.fill;

        chart.cursor = new am4charts.XYCursor();

        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();
    }); // end am4core.ready()
}

fetch('http://127.0.0.1:5000/Dumbellplot')
    .then(res => res.json())
    .then((out) => {
        chart_data(out);
    }).catch(err => console.error(err));