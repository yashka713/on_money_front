import { connect } from "react-redux";
import React from "react";
import { Account } from "./Account";

class AccountsList extends React.Component {
  initialState = () => ({
    chosenAccounts: []
  });

  state = this.initialState();

  componentWillReceiveProps(props) {
    this.updateChosenAccounts(props.accounts.map(item => item.id));
  }

  updateChosenAccounts = accountIds =>
    this.setState(
      {
        chosenAccounts: accountIds
      },
      () => this.props.chosenAccounts(accountIds)
    );

  handleClick = event => {
    const clickedAccount = event.target.value;
    let new_array = this.state.chosenAccounts;
    if (this.accountHaveChosen(clickedAccount)) {
      new_array = new_array.filter(item => item !== clickedAccount);
    } else {
      new_array.push(clickedAccount);
    }
    this.updateChosenAccounts(new_array);
  };

  accountHaveChosen = accountId =>
    this.state.chosenAccounts.indexOf(accountId) > -1;

  accountsList = () =>
    this.props.accounts.map(account => (
      <Account
        account={account}
        key={account.id}
        handleClick={this.handleClick}
      />
    ));

  render() {
    return <ul className="flexContainer">{this.accountsList()}</ul>;
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts
  }),
  null
)(AccountsList);
