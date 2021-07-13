import React, { Component } from 'react';
// import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { GET_LIST, withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

am4core.useTheme(am4themes_animated);

class UsersAbundance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const { dataProvider } = this.props;
    dataProvider(GET_LIST, 'users/usersvelocity', {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'DESC' }
    })
    .then((res) => {
      console.info('res:', res.data);
      chart.data = res.data;
    })
    .catch((e) => {
        console.info('Error: comment not approved', 'warning')
    });

    var chart = am4core.create("UsersAbundance", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.radiusValue = "value";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;
    series.hiddenState.properties.endAngle = -90;
    chart.legend = new am4charts.Legend();

  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="UsersAbundance" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

UsersAbundance.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(UsersAbundance);
