import React from "react";
import Account from "./Account";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import AccountModal from "./AccountModal";
import getRequest from "../../../../../services/requests/getRequest";
import Api from "../../../../../api/Api";
import { connect } from "react-redux";
import downloadAccounts from "../../../../../actions/account/downloadAccounts";

class AccountsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalType: "",
      item: {}
    };
    this.accountList = this.accountList.bind(this);
    this.newAccountModal = this.newAccountModal.bind(this);
    this.updateAccountModal = this.updateAccountModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  componentWillMount() {
    getRequest(Api.accountsPath()).then(responce => {
      this.props.downloadAccounts(responce);
    });
  }

  handleShowModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  newAccountModal() {
    this.setState({
      modalType: "new"
    });
    this.handleShowModal();
  }

  updateAccountModal(account) {
    this.setState({
      modalType: "update",
      item: account
    });
    this.handleShowModal();
  }

  accountList() {
    return this.props.accounts.map(account => {
      return (
        <Account
          account={account}
          key={account.id}
          updateCallback={() => {
            this.updateAccountModal(account);
          }}
        />
      );
    });
  }

  render() {
    return (
      <ul className="flexContainer">
        {this.accountList()}
        <li className="accountBox centralize" onClick={this.newAccountModal}>
          <span>
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer addAccount"
            />
          </span>
        </li>
        <AccountModal
          callback={this.handleShowModal}
          showModal={this.state.showModal}
          modalType={this.state.modalType}
          item={this.state.item}
        />
      </ul>
    );
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts
  }),
  dispatch => ({
    downloadAccounts: accounts => {
      dispatch(downloadAccounts(accounts));
    }
  })
)(AccountsList);
