var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Datatapoints and dataset"
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
                    /*get the datapoints from uploadmodal*/
                    /*axios
                    .get("SOME_URL", {
                    headers: { Authorization: `JWT ${this.state.accessString}` },
                    })
                    .then(response => {
                    this.setState({
                    SOME_DATA
                    });
                    })
                    .catch(err => {
                    console.log(err.data);
                    });*/

                    { x: 1, y: 15 },
					{ x: 2, y: 20 },
					{ x: 3, y: 25 },
					{ x: 4, y: 12 },
					{ x: 5, y: 6 }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
module.exports = App;  