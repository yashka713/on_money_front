import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProfitFromYearStartChart from "../../pages/mainPage/main/charts/ProfitFromYearStart/ProfitFromYearStartChart";

const ProfitFromYearStartQuery = gql`
  query ProfitFromYearStart($year: String!) {
    profitFromYearStart(year: $year) {
      year
      data
    }
  }
`;

export default ({ year }) => (
  <Query query={ProfitFromYearStartQuery} variables={{ year }}>
    {({ data }) => {
      if (data && data.profitFromYearStart) {
        return (
          <ProfitFromYearStartChart chartData={data.profitFromYearStart} />
        );
      } else {
        return "Loading...";
      }
    }}
  </Query>
);
