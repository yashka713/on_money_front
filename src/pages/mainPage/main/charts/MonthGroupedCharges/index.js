import React, { Component, Fragment } from "react";
import Provider from "../../../../../services/Provider";
import MonthTotalQuery from "../../../../../services/queries/MonthTotalChargesQuery";
import AccountsList from "./AccountsList";
import MonthSelect from "./MonthSelect";
import { connect } from "react-redux";

class MonthGroupedChart extends Component {
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

  activityTab = () => (
    <Fragment>
      <AccountsList chosenAccounts={this.chosenAccounts} />
      <MonthSelect chosenMonth={this.chosenMonth} />
      <Provider>
        <MonthTotalQuery
          month={this.state.chosenMonth}
          accountIds={this.state.chosenAccounts}
        />
      </Provider>
    </Fragment>
  );

  render() {
    return this.props.userPresent ? this.activityTab() : "";
  }
}

export default connect(
  state => ({
    userPresent: state.current_user.isAuthenticated
  }),
  null
)(MonthGroupedChart);
