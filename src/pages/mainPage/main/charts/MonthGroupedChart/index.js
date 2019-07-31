import React, { Component } from "react";
import Provider from "../../../../../services/Provider";
import MonthTotalQuery from "../../../../../services/queries/MonthTotalQuery";
import AccountsList from "./AccountsList";
import MonthSelect from "./MonthSelect";

export default class MonthGroupedChart extends Component {
  initialState = () => ({
    chosenMonth: "",
    chosenAccounts: []
  });

  state = this.initialState();

  chosenMonth = selectedMonth =>
    this.setState({
      chosenMonth: selectedMonth
    });

  chosenAccounts = accounts =>
    this.setState({
      chosenAccounts: accounts
    });

  render() {
    return (
      <div>
        <AccountsList chosenAccounts={this.chosenAccounts} />
        <MonthSelect chosenMonth={this.chosenMonth} />
        <Provider>
          <MonthTotalQuery
            month={this.state.chosenMonth}
            accountIds={this.state.chosenAccounts}
          />
        </Provider>
      </div>
    );
  }
}
