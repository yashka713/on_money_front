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
import Api from "../../../api/Api";

import DayPickerInput from "react-day-picker/DayPickerInput";
import CustomOverlay from "../DatePickerOverlay";
import updateAccount from "../../../actions/accounts/updateAccount";
import patchTransactionRequest from "../../../services/requests/patchTransactionRequest";
import updateTransaction from "../../../actions/transactions/updateTransaction";
import successAlert from "../../../actions/successAlert";
import { ErrorModalAlert } from "../ErrorModalAlert";

class UpdateChargeForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.formValidation = this.formValidation.bind(this);
    this.handleChangeAccount = this.handleChangeAccount.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.accountsOptionForSelect = this.accountsOptionForSelect.bind(this);
    this.chargeOptionForSelect = this.chargeOptionForSelect.bind(this);
    this.chargeAttributes = this.chargeAttributes.bind(this);
    this.findItem = this.findItem.bind(this);
    this.handleShowingError = this.handleShowingError.bind(this);
  }

  findItem(account) {
    return this.props.accounts.filter(item => {
      return item.id === account;
    })[0];
  }

  getInitialState() {
    const from = this.findItem(
      this.props.transaction.relationships.chargeable.data.id
    );
    const to = this.props.charges.filter(item => {
      return (
        item.id === this.props.transaction.relationships.profitable.data.id
      );
    })[0];

    return {
      validationState: {
        from: null,
        to: null,
        date: null,
        amount: null,
        disableSubmit: false
      },
      charge: {
        from: from,
        to: to,
        date: new Date(this.props.transaction.attributes.date)
          .toISOString()
          .slice(0, 10),
        amount: this.props.transaction.attributes.from_amount,
        note: this.props.transaction.attributes.note
      }
    };
  }

  handleChangeAccount(event) {
    const item = this.findItem(event.target.value);
    this.setState(
      {
        charge: {
          ...this.state.charge,
          from: item
        },
        validationState: {
          ...this.state.validationState,
          from: item ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  }

  handleChangeCategory(event) {
    const item = this.props.charges.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        charge: {
          ...this.state.charge,
          to: item
        },
        validationState: {
          ...this.state.validationState,
          to: item ? null : "error"
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
        charge: {
          ...this.state.charge,
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
        charge: {
          ...this.state.charge,
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
      charge: {
        ...this.state.charge,
        note: event.target.value
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

  chargeOptionForSelect() {
    return this.props.charges.map(category => {
      return (
        <option key={category.id} value={category.id}>
          {category.attributes.name}
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
    const from = this.state.charge.from;
    const to = this.state.charge.to;
    const date = this.state.charge.date;
    const amount = this.state.charge.amount;

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
    } else if (!amount || amount <= 0) {
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
            to: null,
            date: null,
            amount: null
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
  }

  chargeAttributes() {
    return {
      charge: {
        from: this.state.charge.from.id,
        to: this.state.charge.to.id,
        amount: this.state.charge.amount,
        date: this.state.charge.date,
        note: this.state.charge.note
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    patchTransactionRequest(event.target.action, this.chargeAttributes()).then(
      responce => {
        if (responce.status === 200) {
          this.props.updateCharge(responce.data);
          this.props.callback();
        } else {
          this.handleShowingError(responce.body);
          console.log("error", responce);
        }
      }
    );
    return false;
  }

  handleShowingError(messages = "") {
    let pointers = [];
    let details = [];
    if (messages !== "") {
      pointers = messages.map(item => {
        return item.pointer
          .split("/")
          .pop()
          .split("_")
          .pop();
      });
      details = messages.map(item => {
        return item.detail;
      });
    }
    this.setState({
      showErrorAlert: !this.state.showErrorAlert,
      errorMessages: {
        pointers: [...new Set(pointers)],
        messages: [...new Set(details)]
      }
    });
  }

  render() {
    const currency = this.getCurrency(this.state.charge.from);
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Update Charge Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="updateChargeForm"
            action={Api.transactionPath(
              this.props.transaction.id,
              this.props.transaction.attributes.operation_type
            )}
            method="patch"
            onSubmit={this.handleSubmit}
          >
            <ErrorModalAlert
              shouldShown={this.state.showErrorAlert}
              errors={this.state.errorMessages}
              handleDismiss={this.handleShowingError}
            />
            <FormGroup
              controlId="updateChargeFrom"
              validationState={this.state.validationState.from}
            >
              <Col componentClass={ControlLabel} sm={2}>
                From:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required="true"
                  onChange={e => this.handleChangeAccount(e)}
                  defaultValue={this.state.charge.from.id}
                >
                  <option key="0" value="0">
                    Choose account...
                  </option>
                  {this.accountsOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="updateChargeTo"
              validationState={this.state.validationState.to}
            >
              <Col componentClass={ControlLabel} sm={2}>
                To:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required="true"
                  onChange={e => this.handleChangeCategory(e)}
                  defaultValue={this.state.charge.to.id}
                >
                  <option key="0" value="0">
                    Choose charge category...
                  </option>
                  {this.chargeOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="updateChargeDate"
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
                  selectedDays={this.state.charge.date}
                  value={this.state.charge.date}
                  overlayComponent={CustomOverlay}
                  keepFocus={false}
                  inputProps={{ required: true }}
                  onDayChange={this.handleDayChange}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="updateChargeAmount"
              validationState={this.state.validationState.amount}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Amount:
              </Col>
              <Col sm={10}>
                <InputGroup>
                  <InputGroup.Addon>{currency || "$"}</InputGroup.Addon>
                  <FormControl
                    type="number"
                    step="0.01"
                    required
                    defaultValue={this.state.charge.amount}
                    placeholder="Enter Charge amount"
                    onChange={this.handleChangeAmount}
                  />
                  <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="updateChargeNote">
              <Col componentClass={ControlLabel} sm={2}>
                Note:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  defaultValue={this.state.charge.note}
                  placeholder="Enter Charge note"
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
            bsStyle="warning"
            form="updateChargeForm"
            disabled={this.state.validationState.disableSubmit}
          >
            Update
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts,
    charges: state.categories.categories.charge
  }),
  dispatch => ({
    updateCharge: charge => {
      dispatch(updateTransaction(charge.data));
      charge.included.forEach(item => {
        if (item.type === "accounts") dispatch(updateAccount(item));
      });
      dispatch(
        successAlert(true, "Charge Transaction was successfully changed")
      );
    }
  })
)(UpdateChargeForm);
