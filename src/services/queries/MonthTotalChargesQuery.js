import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MonthTotalCharges from "../../pages/mainPage/main/charts/MonthGroupedChart/MonthTotalCharges";

const MonthTotalChargesQuery = gql`
  query MonthTotalCharges($month: String!, $accountIds: [String!]) {
    monthTotalCharges(date: $month, accountIds: $accountIds) {
      month
      data
    }
  }
`;

export default ({ month, accountIds }) => (
  <Query query={MonthTotalChargesQuery} variables={{ month, accountIds }}>
    {({ data }) => {
      if (data && data.monthTotalCharges) {
        return <MonthTotalCharges data={data.monthTotalCharges} />;
      } else {
        return "Loading...";
      }
    }}
  </Query>
);
