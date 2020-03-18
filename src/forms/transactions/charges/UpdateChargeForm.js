import React, {Component, Fragment} from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  chargeAttributes,
  getOptionsForTag,
  findItem,
  errorPointersAndDetails
} from "../transactionFormHelpers";
import {
  FromAccount,
  ToCategory,
  Amount,
  Note,
  Tags,
  DayPicker
} from "./chargeFormComponents";

import { connect } from "react-redux";
import Api from "../../../api/Api";

import updateAccount from "../../../actions/accounts/updateAccount";
import patchTransactionRequest from "../../../services/requests/patchTransactionRequest";
import updateTransaction from "../../../actions/transactions/updateTransaction";
import successAlert from "../../../actions/successAlert";
import { ErrorModalAlert } from "../ErrorModalAlert";
import { chargeValidator } from "./chargeValidator";
import { FileUploaderComponent } from "../fileUploaderComponent";

class UpdateChargeForm extends Component {
  static defaultProps = {
    charges: [],
    tags: [],
    accounts: [],
    transaction: {}
  };

  initialState = () => {
    const { accounts, transaction, charges } = this.props;
    const { relationships } = transaction;
    const from = findItem(accounts, relationships.chargeable.data.id);
    const to = charges.filter(item => {
      return item.id === relationships.profitable.data.id;
    })[0];

    const transactionTags = relationships.tags.data.map(tag => tag.id);
    const tagOptions = getOptionsForTag(this.props).filter(tag =>
      transactionTags.includes(tag["value"])
    );

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
        date: new Date(transaction.attributes.date).toISOString().slice(0, 10),
        amount: transaction.attributes.from_amount,
        tag_ids: tagOptions,
        note: transaction.attributes.note,
        file: null,
        uploadedFile: transaction.attributes.receipt
      }
    };
  };

  state = this.initialState();

  handleChangeAccount = event => {
    const item = findItem(this.props.accounts, event.target.value);
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
  };

  handleChangeCategory = event => {
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
  };

  handleDayChange = day =>
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

  handleChangeAmount = event => {
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
  };

  handleChangeNote = event =>
    this.setState({
      charge: {
        ...this.state.charge,
        note: event.target.value
      }
    });

  handleChangeFile = event =>
    this.setState({
      charge: {
        ...this.state.charge,
        file: event.target.files[0]
      }
    });

  formValidation = () =>
    this.setState(
      chargeValidator(this.state.charge, this.state.validationState)
    );

  handleSubmit = event => {
    event.preventDefault();

    patchTransactionRequest(
      event.target.action,
      chargeAttributes(this.state)
    ).then(responce => {
      if (responce.status === 200) {
        this.props.updateCharge(responce.data);
        this.props.callback();
      } else {
        this.handleShowingError(responce.body);
        console.log("error", responce);
      }
    });
    return false;
  };

  handleShowingError = (messages = "") => {
    const { pointers, details } = errorPointersAndDetails(messages);
    this.setState({
      showErrorAlert: !this.state.showErrorAlert,
      errorMessages: {
        pointers: [...new Set(pointers)],
        messages: [...new Set(details)]
      }
    });
  };

  handleChangeTags = selectedOption =>
    this.setState({
      charge: {
        ...this.state.charge,
        tag_ids: selectedOption
      }
    });

  render() {
    const {
      charge,
      validationState,
      showErrorAlert,
      errorMessages
    } = this.state;

    return (
      <Fragment>
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
              shouldShown={showErrorAlert}
              errors={errorMessages}
              handleDismiss={this.handleShowingError}
            />
            <FromAccount
              validationState={validationState}
              handleChangeAccount={this.handleChangeAccount}
              props={this.props}
              charge={charge}
            />
            <ToCategory
              validationState={validationState}
              handleChangeCategory={this.handleChangeCategory}
              props={this.props}
              charge={charge}
            />
            <DayPicker
              validationState={validationState}
              handleDayChange={this.handleDayChange}
              charge={charge}
            />
            <Amount
              validationState={validationState}
              handleChangeAmount={this.handleChangeAmount}
              charge={charge}
            />
            <Note handleChangeNote={this.handleChangeNote} charge={charge} />
            <Tags
              handleChangeTags={this.handleChangeTags}
              props={this.props}
              charge={charge}
            />
            <FileUploaderComponent
              handleChangeFile={this.handleChangeFile}
              file={charge.file}
              uploadedFile={charge.uploadedFile}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button
            type="submit"
            bsStyle="warning"
            form="updateChargeForm"
            disabled={validationState.disableSubmit}
          >
            Update
          </Button>
        </Modal.Footer>
      </Fragment>
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
