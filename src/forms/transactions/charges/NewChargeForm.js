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
import Select from "react-select";

import { ErrorModalAlert } from "../ErrorModalAlert";

import { connect } from "react-redux";
import Api from "../../../api/Api";
import newTransactionRequest from "../../../services/requests/newTransactionRequest";

import DayPickerInput from "react-day-picker/DayPickerInput";
import CustomOverlay from "../DatePickerOverlay";
import newTransaction from "../../../actions/transactions/newTransaction";
import updateAccount from "../../../actions/accounts/updateAccount";
import successAlert from "../../../actions/successAlert";

class NewChargeForm extends Component {
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
    this.handleShowingError = this.handleShowingError.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.getOptionsForTag = this.getOptionsForTag.bind(this);
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
      charge: {
        from: null,
        to: null,
        date: new Date().toISOString().slice(0, 10),
        amount: null,
        tag_ids: [],
        note: ""
      },
      showErrorAlert: false,
      errorMessages: {
        pointers: [],
        messages: []
      }
    };
  }

  getOptionsForTag() {
    return this.props.tags.map(tag => {
      return {
        value: tag.id,
        label: tag.attributes.name
      };
    });
  }

  handleChangeAccount(event) {
    const item = this.props.accounts.filter(item => {
      return item.id === event.target.value;
    })[0];
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
        tag_ids: this.state.charge.tag_ids.map(tag => Number(tag.value)),
        note: this.state.charge.note
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    newTransactionRequest(event.target.action, this.chargeAttributes()).then(
      responce => {
        if (responce.status === 201) {
          this.props.newCharge(responce.data);
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

  handleChangeTags(selectedOption) {
    this.setState({
      charge: {
        ...this.state.charge,
        tag_ids: selectedOption
      }
    });
  }

  render() {
    const currency = this.getCurrency(this.state.charge.from);
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>New Charge Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newChargeForm"
            action={Api.chargesPath()}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <ErrorModalAlert
              shouldShown={this.state.showErrorAlert}
              errors={this.state.errorMessages}
              handleDismiss={this.handleShowingError}
            />
            <FormGroup
              controlId="newChargeFrom"
              validationState={this.state.validationState.from}
            >
              <Col componentClass={ControlLabel} sm={2}>
                From:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required
                  onChange={e => this.handleChangeAccount(e)}
                  defaultValue={this.state.charge.to}
                >
                  <option key="0" value="0">
                    Choose account...
                  </option>
                  {this.accountsOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="newChargeTo"
              validationState={this.state.validationState.to}
            >
              <Col componentClass={ControlLabel} sm={2}>
                To:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  required
                  onChange={e => this.handleChangeCategory(e)}
                  defaultValue={this.state.charge.from}
                >
                  <option key="0" value="0">
                    Choose charge category...
                  </option>
                  {this.chargeOptionForSelect()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="newChargeDate"
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
              controlId="newChargeAmount"
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
                    placeholder="Enter Charge amount"
                    onChange={this.handleChangeAmount}
                  />
                  <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="newChargeNote">
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
            <FormGroup controlId="newProfitTags">
              <Col componentClass={ControlLabel} sm={2}>
                Tags:
              </Col>
              <Col sm={10}>
                <Select
                  name="newChargeTagIds"
                  options={this.getOptionsForTag()}
                  onChange={this.handleChangeTags}
                  isMulti
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
            form="newChargeForm"
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
    charges: state.categories.categories.charge,
    tags: state.tags.tags
  }),
  dispatch => ({
    newCharge: charge => {
      dispatch(newTransaction(charge.data));
      dispatch(updateAccount(charge.included.shift()));
      dispatch(successAlert(true, "New Charge Transaction was created"));
    }
  })
)(NewChargeForm);
