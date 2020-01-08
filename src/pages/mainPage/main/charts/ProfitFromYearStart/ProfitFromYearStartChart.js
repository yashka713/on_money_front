import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

function getRandomColorList() {
  var randomColorsList = [];
  for (let i = 0; i < 12; i++) {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    randomColorsList.push(color);
  }
  return randomColorsList;
}

export default class ProfitFromYearStartChart extends Component {
  static defaultProps = {
    data: {}
  };

  initialState = () => ({
    datasets: []
  });

  state = this.initialState();

  componentWillMount() {
    const data = this.props.chartData.data;

    var datasets = [];

    for (let currency in data) {
      let dataset = {
        currency: currency,
        labels: data[currency].map(item => item["month"]),
        datasets: [
          {
            data: data[currency].map(item => item["amount"]),
            backgroundColor: getRandomColorList()
          }
        ]
      };

      datasets.push(dataset);
    }

    this.setState({
      datasets: datasets
    });
  }

  profitPies = () => {
    return this.state.datasets.map((item, index) => (
      <div key={index} className="flex-chart__month-profit-pie">
        <p>
          Profit by {this.props.chartData.year} for {item.currency}:
        </p>
        <Pie
          data={item}
          options={{
            maintainAspectRatio: false,
            aspectRatio: 1
          }}
        />
      </div>
    ));
  };

  render() {
    return (
      <div className="row">
        <div className="margin-top-15 col-lg-12">
          <h3 className="text-center">Profit for each currency:</h3>
          <div className="flex-chart">{this.profitPies()}</div>
        </div>
      </div>
    );
  }
}