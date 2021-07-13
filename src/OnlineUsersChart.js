import React, { Component } from 'react';
// import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { GET_LIST, withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

am4core.useTheme(am4themes_animated);

class OnlineUsersChart extends React.Component {
  
  constructor(props) {
    super(props);
    console.info('constructore happened');
    
  }

  componentDidMount() {
    let chart = am4core.create("onlineUsersChart", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    /**
     * Normal axis
     */
    
    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "%";
    })
    
    /**
     * Axis for ranges
     */
    
    let colorSet = new am4core.ColorSet();
    
    let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    axis2.max = 100;
    axis2.renderer.innerRadius = 10
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;
    
    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    
    let range1 = axis2.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);
    
    /**
     * Label
     */
    
    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 45;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "50%";
    
    
    /**
     * Hand
     */
    
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(20);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = 50;
    
    hand.events.on("propertychanged", function(ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      axis2.invalidate();
    });
    
    setInterval(() => {
      let token = window.localStorage.getItem('token');
      fetch(process.env.REACT_APP_API_URL+`/users/listofonlinesinpercent`, {
        method: 'GET', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        })
        .then(response => response.json())
        .then(result => {
          let value = result.data;
          label.text = value + "%";
          let animation = new am4core.Animation(hand, {
            property: "value",
            to: value
          }, 1000, am4core.ease.cubicOut).start();
        });
    }, 5000);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="onlineUsersChart" style={{ width: "40%", height: "300px", display:"inline-block" }}></div>
    );
  }
}

OnlineUsersChart.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(OnlineUsersChart);
