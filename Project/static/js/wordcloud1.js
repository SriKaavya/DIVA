
function chart_data(fdata){
var data=[];
for( var i =0; i< fdata.length; i++)
{
    data.push({
			tag:fdata[i].tag,count:fdata[i].count
});
}
// Themes begin
am4core.useTheme(am4themes_animated);
//console.log(data);
am4core.ready(function(){
var chart = am4core.create("chart1", am4plugins_wordCloud.WordCloud);
var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
chart.fontFamily = "Courier New";
series.data = data;
series.colors = new am4core.ColorSet();
series.minCount = 100;
series.minWordLength = 5;
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
});// end am4core.ready()

}

fetch("http://127.0.0.1:5000/WordCloud")
    .then(res => res.json())
    .then((out) => {
		chart_data(out); 
    }).catch(err => console.error(err));
