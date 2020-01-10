import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { randomColor } from "../../../../../services/utils/randomColor";

export default class MonthTotalCharges extends Component {
  static defaultProps = {
    data: {}
  };

  initialState = () => ({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  });

  state = this.initialState();

  componentWillMount() {
    const props = this.props.data.data;
    const categoryList = props.labels;

    const datasets = props.datasets.map((item, index) => {
      const data = new Array(index).fill(undefined);
      data.push(item.data);

      return {
        label: item.label,
        backgroundColor: randomColor(),
        borderWidth: 5,
        data: data
      };
    });

    this.setState({
      labels: categoryList,
      datasets: datasets
    });
  }

  render() {
    return (
      <div className="row">
        <div className="margin-top-15 col-lg-12">
          <p className="text-center">Charges for {this.props.data.month}</p>
          <Bar
            data={this.state}
            options={{
              legend: {
                display: false
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ],
                yAxes: [
                  {
                    categoryPercentage: 0.05,
                    barPercentage: 0.1,
                    barThickness: 6
                  }
                ]
              }
            }}
          />
        </div>
      </div>
    );
  }
}
