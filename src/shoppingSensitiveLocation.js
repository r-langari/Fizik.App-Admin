import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import HighMaps from "highcharts/highmaps";
import irAll from "./irAll";

class shoppingSensitiveLocation extends Component {
  componentDidMount() {
    // load modules

    let data = [
      ['ir-5428', 0],
      ['ir-hg', 1],
      ['ir-bs', 2],
      ['ir-kb', 3],
      ['ir-fa', 4],
      ['ir-es', 100],
      ['ir-sm', 6],
      ['ir-go', 7],
      ['ir-mn', 8],
      ['ir-th', 9],
      ['ir-mk', 10],
      ['ir-ya', 11],
      ['ir-cm', 12],
      ['ir-kz', 13],
      ['ir-lo', 14],
      ['ir-il', 15],
      ['ir-ar', 16],
      ['ir-qm', 17],
      ['ir-hd', 18],
      ['ir-za', 19],
      ['ir-qz', 20],
      ['ir-wa', 21],
      ['ir-ea', 22],
      ['ir-bk', 23],
      ['ir-gi', 24],
      ['ir-kd', 25],
      ['ir-kj', 26],
      ['ir-kv', 27],
      ['ir-ks', 28],
      ['ir-sb', 29],
      ['ir-ke', 30],
      ['ir-al', 31]
    ];

    const options = {

      title: {
        text: ""
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#EEDD66"
            }
          }
        }
      },
      colorAxis: {
        min: 0,
        minColor: "#E6E7E8",
        maxColor: "#005645"
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },

      subtitle: {
        text: "IRAN",
        floating: true,
        align: "right",
        y: 40,
        style: {
          fontSize: "16px"
        }
      },
      series: [
        {
          mapData: irAll,
          data: data,
          name: "IRAN",
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          }
        }
      ],
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      }
    };


    this.chart = new HighMaps["Map"](findDOMNode(this), options);

  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div className="in-highchart" style={{ width: "50%", height: "500px", display:"inline-block" }} />;
  }
}

export default shoppingSensitiveLocation;
