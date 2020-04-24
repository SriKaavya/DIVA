function guagedata(){
    am4core.useTheme(am4themes_animated);

     name_d = GetSelectedText();
    //    data Processing

     key_value = guage_data[ name_d ];
//     console.log(data);
     generateChart(key_value)
}
function generateChart(key_value){    // create chart
    var guage_chart = am4core.create("guagechart", am4charts.GaugeChart);
    guage_chart.innerRadius = -15;
    guage_chart.width=am4core.percent(50);
    guage_chart.height=am4core.percent(80);

    var axis = guage_chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 10;
    axis.strictMinMax = true;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 5;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.fill = am4core.color("green");

    var range1 = axis.axisRanges.create();
    range1.value = 5;
    range1.endValue = 8;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("orange");

//    range1.axisFill.fill = colorSet.getIndex(2);

    var range2 = axis.axisRanges.create();
    range2.value = 8;
    range2.endValue = 10;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(4);
    range2.axisFill.fill = am4core.color("red");

    var hand = guage_chart.hands.push(new am4charts.ClockHand());
    hand.showValue(key_value, am4core.ease.cubicOut);

}


function GetSelectedText(){
    var e = document.getElementById("District");
    var name_d = e.options[e.selectedIndex].text;
    return name_d;
}

fetch('http://127.0.0.1:5000/Safety_Rating')
    .then(res => res.json())
    .then(data => { guage_data = data})
    .then((out) => {
        generateChart(guage_data.Central);
    }).catch(err => console.error(err));
