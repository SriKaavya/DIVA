<!-- Styles -->
<style>
#chartdiv {
  width: 100%;
  height: 500px;
}

</style>

<!-- Resources -->
<script src="https://www.amcharts.com/lib/4/core.js"></script>
<script src="https://www.amcharts.com/lib/4/charts.js"></script>
<script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>

<!-- Chart code -->
<script>
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var container = am4core.create("chartdiv", am4core.Container);
container.width = am4core.percent(100);
container.height = am4core.percent(100);
container.layout = "horizontal";


var chart = container.createChild(am4charts.PieChart);

// Add data
chart.data = [{'Crime': 'ASSAULT', 'Count': 102847, 'subData': [{'District': 1.0, 'value': 1327}, {'District': 2.0, 'value': 4687}, {'District': 3.0, 'value': 7318}, {'District': 4.0, 'value': 6318}, {'District': 5.0, 'value': 7080}, {'District': 6.0, 'value': 8131}, {'District': 7.0, 'value': 9106}, {'District': 8.0, 'value': 7137}, {'District': 9.0, 'value': 4308}, {'District': 10.0, 'value': 4709}, {'District': 11.0, 'value': 7353}, {'District': 12.0, 'value': 3808}, {'District': 14.0, 'value': 3373}, {'District': 15.0, 'value': 5636}, {'District': 16.0, 'value': 2990}, {'District': 17.0, 'value': 2377}, {'District': 18.0, 'value': 1147}, {'District': 19.0, 'value': 1543}, {'District': 20.0, 'value': 907}, {'District': 22.0, 'value': 4494}, {'District': 24.0, 'value': 2025}, {'District': 25.0, 'value': 7073}]}, {'Crime': 'BATTERY', 'Count': 607497, 'subData': [{'District': 1.0, 'value': 6364}, {'District': 2.0, 'value': 25421}, {'District': 3.0, 'value': 48074}, {'District': 4.0, 'value': 34867}, {'District': 5.0, 'value': 36356}, {'District': 6.0, 'value': 44989}, {'District': 7.0, 'value': 56496}, {'District': 8.0, 'value': 40460}, {'District': 9.0, 'value': 28202}, {'District': 10.0, 'value': 30576}, {'District': 11.0, 'value': 45097}, {'District': 12.0, 'value': 21371}, {'District': 14.0, 'value': 18910}, {'District': 15.0, 'value': 35871}, {'District': 16.0, 'value': 17535}, {'District': 17.0, 'value': 16447}, {'District': 18.0, 'value': 7574}, {'District': 19.0, 'value': 10997}, {'District': 20.0, 'value': 5760}, {'District': 21.0, 'value': 1}, {'District': 22.0, 'value': 21080}, {'District': 24.0, 'value': 14307}, {'District': 25.0, 'value': 40740}]}, {'Crime': 'BURGLARY', 'Count': 3049, 'subData': [{'District': 1.0, 'value': 8}, {'District': 2.0, 'value': 163}, {'District': 3.0, 'value': 272}, {'District': 4.0, 'value': 180}, {'District': 5.0, 'value': 163}, {'District': 6.0, 'value': 261}, {'District': 7.0, 'value': 358}, {'District': 8.0, 'value': 257}, {'District': 9.0, 'value': 156}, {'District': 10.0, 'value': 144}, {'District': 11.0, 'value': 200}, {'District': 12.0, 'value': 96}, {'District': 14.0, 'value': 98}, {'District': 15.0, 'value': 161}, {'District': 16.0, 'value': 74}, {'District': 17.0, 'value': 62}, {'District': 18.0, 'value': 22}, {'District': 19.0, 'value': 29}, {'District': 20.0, 'value': 14}, {'District': 22.0, 'value': 104}, {'District': 24.0, 'value': 22}, {'District': 25.0, 'value': 205}]}, {'Crime': 'CRIM SEXUAL ASSAULT', 'Count': 3921, 'subData': [{'District': 1.0, 'value': 31}, {'District': 2.0, 'value': 150}, {'District': 3.0, 'value': 281}, {'District': 4.0, 'value': 246}, {'District': 5.0, 'value': 155}, {'District': 6.0, 'value': 230}, {'District': 7.0, 'value': 294}, {'District': 8.0, 'value': 350}, {'District': 9.0, 'value': 256}, {'District': 10.0, 'value': 226}, {'District': 11.0, 'value': 188}, {'District': 12.0, 'value': 124}, {'District': 14.0, 'value': 133}, {'District': 15.0, 'value': 207}, {'District': 16.0, 'value': 115}, {'District': 17.0, 'value': 151}, {'District': 18.0, 'value': 57}, {'District': 19.0, 'value': 110}, {'District': 20.0, 'value': 45}, {'District': 22.0, 'value': 144}, {'District': 24.0, 'value': 85}, {'District': 25.0, 'value': 343}]}, {'Crime': 'CRIMINAL TRESPASS', 'Count': 7169, 'subData': [{'District': 1.0, 'value': 35}, {'District': 2.0, 'value': 301}, {'District': 3.0, 'value': 467}, {'District': 4.0, 'value': 297}, {'District': 5.0, 'value': 575}, {'District': 6.0, 'value': 691}, {'District': 7.0, 'value': 530}, {'District': 8.0, 'value': 530}, {'District': 9.0, 'value': 252}, {'District': 10.0, 'value': 256}, {'District': 11.0, 'value': 382}, {'District': 12.0, 'value': 214}, {'District': 14.0, 'value': 313}, {'District': 15.0, 'value': 372}, {'District': 16.0, 'value': 331}, {'District': 17.0, 'value': 230}, {'District': 18.0, 'value': 73}, {'District': 19.0, 'value': 154}, {'District': 20.0, 'value': 60}, {'District': 22.0, 'value': 485}, {'District': 24.0, 'value': 124}, {'District': 25.0, 'value': 497}]}, {'Crime': 'OFFENSE INVOLVING CHILDREN', 'Count': 27335, 'subData': [{'District': 1.0, 'value': 209}, {'District': 2.0, 'value': 1023}, {'District': 3.0, 'value': 2060}, {'District': 4.0, 'value': 2375}, {'District': 5.0, 'value': 1867}, {'District': 6.0, 'value': 2168}, {'District': 7.0, 'value': 1568}, {'District': 8.0, 'value': 2302}, {'District': 9.0, 'value': 1315}, {'District': 10.0, 'value': 1157}, {'District': 11.0, 'value': 1305}, {'District': 12.0, 'value': 844}, {'District': 14.0, 'value': 905}, {'District': 15.0, 'value': 1242}, {'District': 16.0, 'value': 1055}, {'District': 17.0, 'value': 828}, {'District': 18.0, 'value': 253}, {'District': 19.0, 'value': 436}, {'District': 20.0, 'value': 201}, {'District': 22.0, 'value': 1600}, {'District': 24.0, 'value': 550}, {'District': 25.0, 'value': 2072}]}, {'Crime': 'ROBBERY', 'Count': 4865, 'subData': [{'District': 1.0, 'value': 43}, {'District': 2.0, 'value': 314}, {'District': 3.0, 'value': 665}, {'District': 4.0, 'value': 347}, {'District': 5.0, 'value': 403}, {'District': 6.0, 'value': 721}, {'District': 7.0, 'value': 472}, {'District': 8.0, 'value': 194}, {'District': 9.0, 'value': 113}, {'District': 10.0, 'value': 174}, {'District': 11.0, 'value': 409}, {'District': 12.0, 'value': 142}, {'District': 14.0, 'value': 65}, {'District': 15.0, 'value': 255}, {'District': 16.0, 'value': 31}, {'District': 17.0, 'value': 31}, {'District': 18.0, 'value': 36}, {'District': 19.0, 'value': 51}, {'District': 20.0, 'value': 16}, {'District': 22.0, 'value': 187}, {'District': 24.0, 'value': 37}, {'District': 25.0, 'value': 159}]}, {'Crime': 'THEFT', 'Count': 36340, 'subData': [{'District': 1.0, 'value': 406}, {'District': 2.0, 'value': 2277}, {'District': 3.0, 'value': 3157}, {'District': 4.0, 'value': 2099}, {'District': 5.0, 'value': 2395}, {'District': 6.0, 'value': 3270}, {'District': 7.0, 'value': 3572}, {'District': 8.0, 'value': 2375}, {'District': 9.0, 'value': 1393}, {'District': 10.0, 'value': 1775}, {'District': 11.0, 'value': 2657}, {'District': 12.0, 'value': 1221}, {'District': 14.0, 'value': 872}, {'District': 15.0, 'value': 2117}, {'District': 16.0, 'value': 760}, {'District': 17.0, 'value': 628}, {'District': 18.0, 'value': 438}, {'District': 19.0, 'value': 574}, {'District': 20.0, 'value': 285}, {'District': 22.0, 'value': 1591}, {'District': 24.0, 'value': 666}, {'District': 25.0, 'value': 1812}]}];

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";
pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
//pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

pieSeries.slices.template.events.on("hit", function(event) {
  selectSlice(event.target.dataItem);
})

var chart2 = container.createChild(am4charts.PieChart);
chart2.width = am4core.percent(30);
chart2.radius = am4core.percent(80);

// Add and configure Series
var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
pieSeries2.dataFields.value = "value";
pieSeries2.dataFields.category = "name";
pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
//pieSeries2.labels.template.radius = am4core.percent(50);
//pieSeries2.labels.template.inside = true;
//pieSeries2.labels.template.fill = am4core.color("#ffffff");
pieSeries2.labels.template.disabled = true;
pieSeries2.ticks.template.disabled = true;
pieSeries2.alignLabels = false;
pieSeries2.events.on("positionchanged", updateLines);

var interfaceColors = new am4core.InterfaceColorSet();

var line1 = container.createChild(am4core.Line);
line1.strokeDasharray = "2,2";
line1.strokeOpacity = 0.5;
line1.stroke = interfaceColors.getFor("alternativeBackground");
line1.isMeasured = false;

var line2 = container.createChild(am4core.Line);
line2.strokeDasharray = "2,2";
line2.strokeOpacity = 0.5;
line2.stroke = interfaceColors.getFor("alternativeBackground");
line2.isMeasured = false;

var selectedSlice;

function selectSlice(dataItem) {

  selectedSlice = dataItem.slice;

  var fill = selectedSlice.fill;

  var count = dataItem.dataContext.subData.length;
  pieSeries2.colors.list = [];
  for (var i = 0; i < count; i++) {
    pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
  }

  chart2.data = dataItem.dataContext.subData;
  pieSeries2.appear();

  var middleAngle = selectedSlice.middleAngle;
  var firstAngle = pieSeries.slices.getIndex(0).startAngle;
  var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
  animation.events.on("animationprogress", updateLines);

  selectedSlice.events.on("transformed", updateLines);

//  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
//  animation.events.on("animationprogress", updateLines)
}


function updateLines() {
  if (selectedSlice) {
    var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
    var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

    p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
    p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

    var p21 = { x: 0, y: -pieSeries2.pixelRadius };
    var p22 = { x: 0, y: pieSeries2.pixelRadius };

    p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
    p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

    line1.x1 = p11.x;
    line1.x2 = p21.x;
    line1.y1 = p11.y;
    line1.y2 = p21.y;

    line2.x1 = p12.x;
    line2.x2 = p22.x;
    line2.y1 = p12.y;
    line2.y2 = p22.y;
  }
}

chart.events.on("datavalidated", function() {
  setTimeout(function() {
    selectSlice(pieSeries.dataItems.getIndex(0));
  }, 1000);
});


}); // end am4core.ready()
</script>

<!-- HTML -->
<div id="chartdiv"></div>
