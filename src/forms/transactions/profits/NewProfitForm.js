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
import newTransactionRequest from "../../../services/requests/newTransactionRequest";

import DayPickerInput from "react-day-picker/DayPickerInput";
import CustomOverlay from "../DatePickerOverlay";
import newTransaction from "../../../actions/transactions/newTransaction";
import updateAccount from "../../../actions/accounts/updateAccount";
import successAlert from "../../../actions/successAlert";
import { ErrorModalAlert } from "../ErrorModalAlert";

class NewProfitForm extends Component {
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
    this.profitsOptionForSelect = this.profitsOptionForSelect.bind(this);
    this.profitAttributes = this.profitAttributes.bind(this);
    this.handleShowingError = this.handleShowingError.bind(this);
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
      profit: {
        from: null,
        to: null,
        date: new Date().toISOString().slice(0, 10),
        amount: null,
        note: ""
      },
      showErrorAlert: false,
      errorMessages: {
        pointers: [],
        messages: []
      }
    };
  }

  handleChangeAccount(event) {
    const item = this.props.accounts.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        profit: {
          ...this.state.profit,
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

  handleChangeCategory(event) {
    const item = this.props.profits.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        profit: {
          ...this.state.profit,
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

  handleDayChange(day) {
    this.setState(
      {
        profit: {
          ...this.state.profit,
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
        profit: {
          ...this.state.profit,
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
      profit: {
        ...this.state.profit,
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

  profitsOptionForSelect() {
    return this.props.profits.map(category => {
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
    const from = this.state.profit.from;
    const to = this.state.profit.to;
    const date = this.state.profit.date;
    const amount = this.state.profit.amount;

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

  profitAttributes() {
    return {
      profit: {
        from: this.state.profit.from.id,
        to: this.state.profit.to.id,
        amount: this.state.profit.amount,
        date: this.state.profit.date,
        note: this.state.profit.note
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    newTransactionRequest(event.target.action, this.profitAttributes()).then(
      responce => {
        if (responce.status === 201) {
          this.props.newProfit(responce.data);
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
    const currency = this.getCurrency(this.state.profit.to);
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>New Profit Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newProfitForm"
            action={Api.profitsPath()}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <ErrorModalAlert
              shouldShown={this.state.showErrorAlert}
              errors={this.state.errorMessages}
              handleDismiss={this.handleShowingError}
            />
            <FormGroup
              controlId="newProfitFrom"
              validationState={this.state.validationState.from}
            >
              <Col componentClass={ControlLabel} sm={2}>
                From:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required="true"
                  onChange={e => this.handleChangeCategory(e)}
                  defaultValue={this.state.profit.from}
                >
                  <option key="0" value="0">
                    Choose profit category...
                  </option>
                  {this.profitsOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="newProfitTo"
              validationState={this.state.validationState.to}
            >
              <Col componentClass={ControlLabel} sm={2}>
                To:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required="true"
                  onChange={e => this.handleChangeAccount(e)}
                  defaultValue={this.state.profit.to}
                >
                  <option key="0" value="0">
                    Choose account...
                  </option>
                  {this.accountsOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="newProfitDate"
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
                  selectedDays={this.state.profit.date}
                  value={this.state.profit.date}
                  overlayComponent={CustomOverlay}
                  keepFocus={false}
                  inputProps={{ required: true }}
                  onDayChange={this.handleDayChange}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="newProfitAmount"
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
                    min="0.01"
                    required
                    placeholder="Enter Profit amount"
                    onChange={this.handleChangeAmount}
                  />
                  <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="newProfitNote">
              <Col componentClass={ControlLabel} sm={2}>
                Note:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  defaultValue={this.state.profit.note}
                  placeholder="Enter Profit note"
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
            form="newProfitForm"
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
    accounts: state.accounts.accounts,
    profits: state.categories.categories.profit
  }),
  dispatch => ({
    newProfit: profit => {
      dispatch(newTransaction(profit.data));
      dispatch(updateAccount(profit.included.pop()));
      dispatch(successAlert(true, "New Profit Transaction was created"));
    }
  })
)(NewProfitForm);
