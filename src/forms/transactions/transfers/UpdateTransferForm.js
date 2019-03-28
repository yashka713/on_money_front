import React, { Component } from "react";
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

import { connect } from "react-redux";

import DayPickerInput from "react-day-picker/DayPickerInput";
import CustomOverlay from "../DatePickerOverlay";

class UpdateTransferForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.formValidation = this.formValidation.bind(this);
    this.handleChangeAccount = this.handleChangeAccount.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeRateFrom = this.handleChangeRateFrom.bind(this);
    this.handleChangeRateTo = this.handleChangeRateTo.bind(this);
    this.accountsOptionForSelect = this.accountsOptionForSelect.bind(this);
  }

  getInitialState() {
    let transaction = this.props.transactions.filter(item => {
      return item.id === this.props.item.id;
    })[0];

    let from = this.props.accounts.filter(item => {
      return item.id === transaction.relationships.chargeable.data.id;
    })[0];

    let to = this.props.accounts.filter(item => {
      return item.id === transaction.relationships.profitable.data.id;
    })[0];

    return {
      validationState: {
        from: null,
        to: null,
        disableSubmit: true
      },
      transfer: {
        from: from,
        to: to,
        date: new Date(transaction.attributes.date).toISOString().slice(0, 10),
        amount: transaction.attributes.from_amount,
        note: transaction.attributes.note || ""
      },
      rate: {
        from: transaction.attributes.from_amount,
        to: transaction.attributes.to_amount
      },
      sameCurrency: from.attributes.currency === to.attributes.currency
    };
  }

  handleChangeAccount(event, account) {
    const item = this.props.accounts.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        transfer: {
          ...this.state.transfer,
          [account]: item
        },
        validationState: {
          ...this.state.validationState,
          [account]: item ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  }

  handleDayChange(day) {
    this.setState({
      transfer: {
        ...this.state.transfer,
        date: new Date(day).toISOString().slice(0, 10)
      }
    });
  }

  handleChangeAmount(event) {
    this.setState({
      transfer: {
        ...this.state.transfer,
        amount: event.target.value
      }
    });
  }

  handleChangeNote(event) {
    this.setState({
      transfer: {
        ...this.state.transfer,
        note: event.target.value
      }
    });
  }

  handleChangeRateFrom(event) {
    this.setState({
      rate: {
        ...this.state.rate,
        from: event.target.value
      }
    });
  }

  handleChangeRateTo(event) {
    this.setState({
      rate: {
        ...this.state.rate,
        to: event.target.value
      }
    });
  }

  accountsOptionForSelect() {
    return this.props.accounts.map(account => {
      return (
        <option key={account.id} value={account.id}>
          {account.attributes.name} --- {account.attributes.balance}
          {account.attributes.currency}
        </option>
      );
    });
  }

  disableSubmit() {
    this.setState({
      validationState: {
        ...this.state.validationState,
        disableSubmit: true
      }
    });
  }

  getCurrency(account) {
    return account && account.attributes.currency
      ? account.attributes.currency
      : null;
  }

  formValidation() {
    const from = this.state.transfer.from;
    const to = this.state.transfer.to;
    const currencyFrom = this.getCurrency(from);
    const currencyTo = this.getCurrency(to);
    if ((!from && !to) || from === to) {
      this.setState(
        {
          validationState: {
            ...this.state.validationState,
            to: "error",
            from: "error"
          }
        },
        () => {
          this.disableSubmit();
        }
      );
    } else if (!from) {
      this.setState(
        {
          validationState: {
            ...this.state.validationState,
            from: "error"
          }
        },
        () => {
          this.disableSubmit();
        }
      );
    } else if (!to) {
      this.setState(
        {
          validationState: {
            ...this.state.validationState,
            to: "error"
          }
        },
        () => {
          this.disableSubmit();
        }
      );
    } else {
      this.setState(
        {
          validationState: {
            ...this.state.validationState,
            from: null,
            to: null
          }
        },
        () => {
          this.setState({
            validationState: {
              ...this.state.validationState,
              disableSubmit: false
            }
          });
        }
      );
    }
    if (currencyFrom && currencyTo && currencyFrom !== currencyTo) {
      this.setState({
        sameCurrency: false
      });
    } else {
      this.setState({
        sameCurrency: true
      });
    }
  }

  transferAttributes() {
    const transfer = {
      from: this.state.transfer.from.id,
      to: this.state.transfer.to.id,
      amount: this.state.transfer.amount,
      rate: 1,
      date: this.state.transfer.date,
      note: this.state.transfer.note
    };

    if (!this.state.sameCurrency) {
      transfer["amount"] = this.state.rate.from;
      transfer["rate"] = this.state.rate.to / this.state.rate.from;
    }

    return transfer;
  }

  handleSubmit(event) {
    event.preventDefault();

    newTransactionRequest(event.target.action, this.transferAttributes()).then(
      responce => {
        if (responce.status === 201) {
          this.props.newProfit(responce.data);
          this.props.callback();
        } else {
          console.log("error", responce);
        }
      }
    );
    return false;
  }

  render() {
    const currencyFrom = this.getCurrency(this.state.transfer.from);
    const currencyTo = this.getCurrency(this.state.transfer.to);
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">
            Change Transfer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="UpdateTransferForm"
            action=""
            method="patch"
            onSubmit={this.handleSubmit}
          >
            <FormGroup
              controlId="UpdateTransferFrom"
              validationState={this.state.validationState.from}
            >
              <Col componentClass={ControlLabel} sm={2}>
                From:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required="true"
                  onChange={e => this.handleChangeAccount(e, "from")}
                  defaultValue={this.state.transfer.from}
                >
                  <option key="0" value="0">
                    Choose account...
                  </option>
                  {this.accountsOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="UpdateTransferTo"
              validationState={this.state.validationState.to}
            >
              <Col componentClass={ControlLabel} sm={2}>
                To:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required="true"
                  onChange={e => this.handleChangeAccount(e, "to")}
                  defaultValue={this.state.transfer.to}
                >
                  <option key="0" value="0">
                    Choose account...
                  </option>
                  {this.accountsOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="UpdateTransferDate">
              <Col componentClass={ControlLabel} sm={2}>
                Date:
              </Col>
              <Col sm={10}>
                <DayPickerInput
                  classNames={{
                    container: "day-picker-modal",
                    overlay: "day-picker-modal-overlay"
                  }}
                  dayPickerProps={{
                    todayButton: "Today"
                  }}
                  value={new Date(this.state.transfer.date)}
                  overlayComponent={CustomOverlay}
                  keepFocus={false}
                  inputProps={{ required: true }}
                  onDayChange={this.handleDayChange}
                />
              </Col>
            </FormGroup>
            {this.state.sameCurrency ? (
              <FormGroup controlId="UpdateTransferAmount">
                <Col componentClass={ControlLabel} sm={2}>
                  Amount:
                </Col>
                <Col sm={10}>
                  <InputGroup>
                    <InputGroup.Addon>{currencyFrom || "$"}</InputGroup.Addon>
                    <FormControl
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter transfer amount"
                      onChange={this.handleChangeAmount}
                    />
                    <InputGroup.Addon>.00</InputGroup.Addon>
                  </InputGroup>
                </Col>
              </FormGroup>
            ) : (
              <div>
                <FormGroup controlId="UpdateTransferFromAmount">
                  <Col componentClass={ControlLabel} sm={3}>
                    From Amount:
                  </Col>
                  <Col sm={9}>
                    <InputGroup>
                      <InputGroup.Addon>{currencyFrom || "$"}</InputGroup.Addon>
                      <FormControl
                        type="number"
                        step="0.01"
                        required
                        placeholder="Enter transfer amount"
                        onChange={this.handleChangeRateFrom}
                      />
                      <InputGroup.Addon>.00</InputGroup.Addon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                <FormGroup controlId="UpdateTransferToAmount">
                  <Col componentClass={ControlLabel} sm={3}>
                    To Amount:
                  </Col>
                  <Col sm={9}>
                    <InputGroup>
                      <InputGroup.Addon>{currencyTo || "$"}</InputGroup.Addon>
                      <FormControl
                        type="number"
                        step="0.01"
                        required
                        placeholder="Enter transfer amount"
                        onChange={this.handleChangeRateTo}
                      />
                      <InputGroup.Addon>.00</InputGroup.Addon>
                    </InputGroup>
                  </Col>
                </FormGroup>
              </div>
            )}
            <FormGroup controlId="UpdateTransferNote">
              <Col componentClass={ControlLabel} sm={2}>
                Note:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  defaultValue={this.state.transfer.note}
                  placeholder="Enter Transfer note"
                  onChange={this.handleChangeNote}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="warning">Update</Button>
          <Button onClick={this.props.callback}>Close</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default connect(
  state => ({
    transactions: state.transactions.transactions,
    accounts: state.accounts.accounts
  }),
  dispatch => ({
    newTransfer: transfer => {
      // dispatch(newProfit(transfer.data));
      // dispatch(updateAccount(transfer.included.pop()));
      // dispatch(updateAccount(transfer.included.pop()));
    }
  })
)(UpdateTransferForm);
