import React, { Component } from 'react';
// import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { GET_LIST, withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

class NumberOfInvitationsChart extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let chart = am4core.create("NumberOfInvitationsChart", am4charts.XYChart);

    chart.paddingRight = 20;
    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), value: visits });
    }
    
    const { dataProvider } = this.props;
    dataProvider(GET_LIST, 'users/userinvitationprocess', {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'DESC' }
    })
    .then((res) => {
      console.info('res:', res.data);
      chart.data = res.data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    })
    .catch((e) => {
        console.info('Error: comment not approved', 'warning')
    });

  }

  componentWillUnmount() {
    if (this.chart) {
        this.chart.dispose();
      }
  }

  render() {
    return (
      <div id="NumberOfInvitationsChart" style={{ width: "70%", height: "500px" }}>milad</div>
    );
  }
}
NumberOfInvitationsChart.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(NumberOfInvitationsChart);
