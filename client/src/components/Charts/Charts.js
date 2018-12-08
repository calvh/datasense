var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
	render() {		
		{/* update $.get to access co-ordinate values from mongodb database */}	
		$.get("https://canvasjs.com/services/data/datapoints.php?xstart=5&ystart=10&length=10&type=csv", function(data) {
			var chart = new CanvasJS.Chart("chartContainer", {
				title: {
					text: "Chart from CSV",
				},
				data: [{
					type: "line",
					dataPoints: getDataPointsFromCSV(data)
				}]
			});
			
			chart.render();
			
		});		
	}

	{/*render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Datapoints and dataset"
				//name from model/dataset.js
			},
			axisY: {
				title: "Y-axis data",
				includeZero: false,
				suffix: "%"
			},
			axisX: {
				title: "x-axis data",
				prefix: "W",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%",
				dataPoints: [

                    { x: 1, y: 15 },
					{ x: 2, y: 20 },
					{ x: 3, y: 25 },
					{ x: 4, y: 12 },
					{ x: 5, y: 6 }
				]
			}]
		}
		return (
		
		);
	}
} */}
module.exports = App;  