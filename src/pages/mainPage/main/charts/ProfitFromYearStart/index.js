import React, { Component, Fragment } from "react";
import Provider from "../../../../../services/Provider";
import ProfitFromYearStartQuery from "../../../../../services/queries/ProfitFromYearStartQuery";

export default class ProfitFromYearStart extends Component {
  render() {
    return (
      <Fragment>
        <Provider>
          <ProfitFromYearStartQuery year={"2019"} />
        </Provider>
      </Fragment>
    );
  }
}
