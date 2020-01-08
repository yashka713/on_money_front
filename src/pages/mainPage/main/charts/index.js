import React, { Component, Fragment } from "react";
import MonthGroupedChart from "./MonthGroupedCharges";
import ProfitFromYearStart from "./ProfitFromYearStart";

export default class Charts extends Component {
  render() {
    return (
      <Fragment>
        <MonthGroupedChart />
        <ProfitFromYearStart />
      </Fragment>
    );
  }
}
