import React, { Component } from 'react';
// import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { GET_LIST, withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

class NumberOfWatchedVideosChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.info('propsesh:', this.props.userid);
    // Themes begin
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("NumberOfWatchedVideosChart", am4charts.XYChart);
    fetch(process.env.REACT_APP_API_URL + `/users/numberofwatchedvideos?userId=${this.props.userid}`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        // Themes end
        chart.data = myJson;
        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
          if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
          }
          return dy;
        });

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.categoryX = "country";
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
      })
      .catch((e) => {

      });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="NumberOfWatchedVideosChart" style={{ width: "70%", height: "200px" }}></div>
    );
  }
}

NumberOfWatchedVideosChart.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(NumberOfWatchedVideosChart);
