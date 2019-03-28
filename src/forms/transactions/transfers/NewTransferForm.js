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
import newTransaction from "../../../actions/transactions/newTransaction";
import updateAccount from "../../../actions/accounts/updateAccount";
import newTransactionRequest from "../../../services/requests/newTransactionRequest";
import Api from "../../../api/Api";

import DayPickerInput from "react-day-picker/DayPickerInput";
import CustomOverlay from "../DatePickerOverlay";

class NewTransferForm extends Component {
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
    return {
      validationState: {
        from: null,
        to: null,
        date: null,
        amount: null,
        disableSubmit: true
      },
      transfer: {
        from: null,
        to: null,
        date: new Date().toISOString().slice(0, 10),
        amount: null,
        note: ""
      },
      rate: {
        from: 0,
        to: 0
      },
      sameCurrency: true
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
    this.setState(
      {
        transfer: {
          ...this.state.transfer,
          date: day ? new Date(day).toISOString().slice(0, 10) : ""
        },
        validationState: {
          ...this.state.validationState,
          date: day ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  }

  handleChangeAmount(event) {
    const amount = event.target.value;
    this.setState(
      {
        transfer: {
          ...this.state.transfer,
          amount: amount
        },
        validationState: {
          ...this.state.validationState,
          amount: amount ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
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
    const rateFrom = event.target.value;
    const rateTo = this.state.rate.to;

    this.setState({
      transfer: {
        ...this.state.transfer,
        amount: rateFrom && rateTo && rateTo !== 0 ? rateFrom : null
      }
    });

    this.setState(
      {
        rate: {
          ...this.state.rate,
          from: rateFrom
        },
        validationState: {
          ...this.state.validationState,
          amount: rateFrom && rateFrom !== 0 ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  }

  handleChangeRateTo(event) {
    const rateTo = event.target.value;
    const rateFrom = this.state.rate.from;

    this.setState({
      transfer: {
        ...this.state.transfer,
        amount:
          rateFrom && rateTo && rateTo !== 0 && rateFrom !== 0 ? rateFrom : null
      }
    });

    this.setState(
      {
        rate: {
          ...this.state.rate,
          to: rateTo
        },
        validationState: {
          ...this.state.validationState,
          amount: rateTo && rateTo !== 0 ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
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
    const date = this.state.transfer.date;
    const amount = this.state.transfer.amount;
    const currencyFrom = this.getCurrency(from);
    const currencyTo = this.getCurrency(to);

    if (!from && !to && !date && !amount) {
      this.setState(
        {
          validationState: {
            ...this.state.validationState,
            to: "error",
            from: "error",
            date: "error",
            amount: "error"
          }
        },
        () => {
          this.disableSubmit();
        }
      );
    } else if ((!from && !to) || from === to) {
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
    } else if (!date) {
      this.setState(
        {
          validationState: {
            ...this.state.validationState,
            date: "error"
          }
        },
        () => {
          this.disableSubmit();
        }
      );
    } else if (!amount) {
      this.setState(
        {
          validationState: {
            ...this.state.validationState,
            amount: "error"
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

    return { transfer: transfer };
  }

  handleSubmit(event) {
    event.preventDefault();

    newTransactionRequest(event.target.action, this.transferAttributes()).then(
      responce => {
        if (responce.status === 201) {
          this.props.newTransfer(responce.data);
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
          <Modal.Title>New Transfer Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newTransferForm"
            action={Api.transfersPath()}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <FormGroup
              controlId="newTransferFrom"
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
              controlId="newTransferTo"
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
            <FormGroup
              controlId="newTransferDate"
              validationState={this.state.validationState.date}
            >
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
                  value={this.state.transfer.date}
                  overlayComponent={CustomOverlay}
                  keepFocus={false}
                  inputProps={{ required: true }}
                  onDayChange={this.handleDayChange}
                />
              </Col>
            </FormGroup>
            {this.state.sameCurrency ? (
              <FormGroup
                controlId="newTransferAmount"
                validationState={this.state.validationState.amount}
              >
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
                <FormGroup
                  controlId="newTransferFromAmount"
                  validationState={this.state.validationState.amount}
                >
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
                <FormGroup
                  controlId="newTransferToAmount"
                  validationState={this.state.validationState.amount}
                >
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
            <FormGroup controlId="newTransferNote">
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
          <Button onClick={this.props.callback}>Close</Button>
          <Button
            type="submit"
            bsStyle="primary"
            form="newTransferForm"
            disabled={this.state.validationState.disableSubmit}
          >
            Create
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts
  }),
  dispatch => ({
    newTransfer: transfer => {
      dispatch(newTransaction(transfer.data));
      dispatch(updateAccount(transfer.included.pop()));
      dispatch(updateAccount(transfer.included.pop()));
    }
  })
)(NewTransferForm);
