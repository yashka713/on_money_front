import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import getRequest from "../../../../../services/requests/getRequest";
import Api from "../../../../../api/Api";
import NewAccountForm from "../../../../../forms/accounts/NewAccountForm";
import UpdateAccountForm from "../../../../../forms/accounts/UpdateAccountForm";

export default class AccountModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      currencies: []
    };
    this.currencyList = this.currencyList.bind(this);
  }

  componentDidMount() {
    getRequest(Api.currenciesPath()).then(responce => {
      this.setState({
        currencies: responce
      });
    });
  }

  currencyList() {
    return this.state.currencies.map(currency => {
      return (
        <option value={currency.attributes.iso_code} key={currency.id}>
          {currency.attributes.name} | {currency.attributes.symbol}
        </option>
      );
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      showModal: props.showModal
    });
  }

  render() {
    const modalType = () => {
      if (this.props.modalType === "new") {
        return (
          <NewAccountForm
            currencies={this.state.currencies}
            currencyList={this.currencyList()}
            callback={this.props.callback}
          />
        );
      } else if (this.props.modalType === "update") {
        return (
          <UpdateAccountForm
            currencies={this.state.currencies}
            currencyList={this.currencyList()}
            callback={this.props.callback}
            item={this.props.item}
          />
        );
      }
    };
    return (
      <Modal show={this.state.showModal} onHide={this.props.callback}>
        {modalType()}
      </Modal>
    );
  }
}
