import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MonthTotal from "../../pages/mainPage/main/charts/MonthGroupedChart/MonthTotal";

const MonthTotalQuery = gql`
  query MonthTotal($month: String!, $accountIds: [String!]) {
    monthTotal(date: $month, accountIds: $accountIds) {
      month
      data
    }
  }
`;

export default ({ month, accountIds }) => (
  <Query query={MonthTotalQuery} variables={{ month, accountIds }}>
    {({ data }) => {
      if (data && data.monthTotal) {
        return <MonthTotal data={data.monthTotal} />;
      } else {
        return "Loading...";
      }
    }}
  </Query>
);
