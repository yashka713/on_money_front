import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import updateAccount from "../../actions/accounts/updateAccount";
import updateAccountRequest from "../../services/requests/updateAccountRequest";
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
import Api from "../../api/Api";

class UpdateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        name: this.props.item.attributes.name,
        balance: this.props.item.attributes.balance,
        note: this.props.item.attributes.note || "",
        currency: this.props.item.attributes.currency
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
    updateAccountRequest(event.target.action, this.state.item).then(
      responce => {
        if (responce.status === 200) {
          this.props.updateAccount(responce.data.data);
          this.props.callback();
        } else {
          console.log("error", responce);
        }
      }
    );
    return false;
  }

  render() {
    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Update Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="updateAccountForm"
            action={Api.accountPath(this.props.item.id)}
            method="patch"
            onSubmit={this.handleSubmit}
          >
            <FormGroup controlId="updateAccountName">
              <Col componentClass={ControlLabel} sm={2}>
                Name:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  required
                  defaultValue={this.state.item.name}
                  placeholder="Enter Account name"
                  onChange={this.handleChangeName}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="updateAccountBalance">
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
                    defaultValue={this.state.item.balance}
                    placeholder="Enter Account balance"
                    onChange={this.handleChangeBalance}
                  />
                  <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="updateAccountNote">
              <Col componentClass={ControlLabel} sm={2}>
                Note:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  defaultValue={this.state.item.note}
                  placeholder="Enter Account note"
                  onChange={this.handleChangeNote}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="updateAccountCurrency">
              <Col componentClass={ControlLabel} sm={2}>
                Currency:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  placeholder="Choose currency..."
                  defaultValue={this.state.item.currency}
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
          <Button type="submit" bsStyle="primary" form="updateAccountForm">
            Update
          </Button>
        </Modal.Footer>
      </Fragment>
    );
  }
}

export default connect(null, dispatch => ({
  updateAccount: account => {
    dispatch(updateAccount(account));
  }
}))(UpdateAccountForm);
