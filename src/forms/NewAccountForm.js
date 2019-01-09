import React, { Component } from "react";
import { connect } from "react-redux";
import addAccount from "../actions/account/addAccount";
import newAccountRequest from "../services/requests/newAccountRequest";
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Modal
} from "react-bootstrap";
import Api from "../api/Api";

class NewAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        name: "",
        balance: 0,
        note: "",
        currency: this.props.currencies[0].attributes.iso_code
      },
      currencies: props.currencies
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBalance = this.handleChangeBalance.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({
      item: {
        ...this.state.item,
        name: event.target.value
      }
    });
  }

  handleChangeBalance(event) {
    this.setState({
      item: {
        ...this.state.item,
        balance: event.target.value
      }
    });
  }

  handleChangeNote(event) {
    this.setState({
      item: {
        ...this.state.item,
        note: event.target.value
      }
    });
  }

  handleChangeCurrency(event) {
    this.setState({
      item: {
        ...this.state.item,
        currency: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    newAccountRequest(event.target.action, this.state.item).then(responce => {
      if (responce.status === 201) {
        this.props.addAccount(responce.data.data);
        this.props.callback();
      } else {
        console.log("error", responce);
      }
    });
    return false;
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newAccountForm"
            action={Api.accountsPath()}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <FormGroup controlId="newAccountName">
              <Col componentClass={ControlLabel} sm={2}>
                Name:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  required
                  placeholder="Enter Account name"
                  onChange={this.handleChangeName}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="newAccountBalance">
              <Col componentClass={ControlLabel} sm={2}>
                Balance:
              </Col>
              <Col sm={10}>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    type="number"
                    step="0.01"
                    required
                    placeholder="Enter Account balance"
                    onChange={this.handleChangeBalance}
                  />
                  <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="newAccountNote">
              <Col componentClass={ControlLabel} sm={2}>
                Note:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  placeholder="Enter Account note"
                  onChange={this.handleChangeNote}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="newAccountCurrency">
              <Col componentClass={ControlLabel} sm={2}>
                Currency:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  placeholder="Choose currency..."
                  onChange={this.handleChangeCurrency}
                >
                  {this.props.currencyList}
                </FormControl>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button type="submit" bsStyle="primary" form="newAccountForm">
            Create
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  addAccount: account => {
    dispatch(addAccount(account));
  }
}))(NewAccountForm);
