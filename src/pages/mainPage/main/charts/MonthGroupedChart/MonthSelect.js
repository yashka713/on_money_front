import React, { Component } from "react";
import getRequest from "../../../../../services/requests/getRequest";
import Api from "../../../../../api/Api";
import Select from "react-select";

export default class MonthSelect extends Component {
  initialState = () => ({
    months: [],
    currentMonth: ""
  });

  state = this.initialState();

  componentWillMount() {
    getRequest(Api.transactionMonthsPath()).then(responce => {
      const mounths = responce.map(item => ({
        value: item.id,
        label: item.attributes.label
      }));

      this.setState({
        months: mounths,
        currentMonth: mounths[mounths.length - 1]
      });
    });
  }

  setMonth = selectedOption =>
    this.setState(
      {
        currentMonth: selectedOption
      },
      () => this.props.chosenMonth(selectedOption.value)
    );

  getOptionsForSelect = () =>
    this.state.months.map(item => ({
      value: item.value,
      label: item.label
    }));

  render() {
    return (
      <Select
        className="margin-top-15 col-lg-offset-3 col-lg-6"
        options={this.getOptionsForSelect()}
        onChange={this.setMonth}
        placeholder="Choose Month..."
        value={this.state.currentMonth}
      />
    );
  }
}
