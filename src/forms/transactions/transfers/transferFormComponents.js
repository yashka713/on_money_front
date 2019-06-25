import React from "react";
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  InputGroup
} from "react-bootstrap";
import {
  accountsOptionForSelect,
  getCurrency,
  getOptionsForTag
} from "../transactionFormHelpers";
import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import CustomOverlay from "../DatePickerOverlay";

export const ToAccount = ({
  validationState,
  transfer = {},
  handleChangeAccount,
  props
}) => (
  <FormGroup validationState={validationState.to}>
    <Col componentClass={ControlLabel} sm={2}>
      From:
    </Col>
    <Col sm={10}>
      <FormControl
        componentClass="select"
        required
        onChange={e => handleChangeAccount(e, "to")}
        defaultValue={transfer.to && transfer.to.id}
      >
        <option key="0" value="0">
          Choose account...
        </option>
        {accountsOptionForSelect(props)}
      </FormControl>
    </Col>
  </FormGroup>
);

export const FromAccount = ({
  validationState,
  transfer = {},
  handleChangeAccount,
  props
}) => (
  <FormGroup validationState={validationState.from}>
    <Col componentClass={ControlLabel} sm={2}>
      From:
    </Col>
    <Col sm={10}>
      <FormControl
        componentClass="select"
        required
        onChange={e => handleChangeAccount(e, "from")}
        defaultValue={transfer.from && transfer.from.id}
      >
        <option key="0" value="0">
          Choose account...
        </option>
        {accountsOptionForSelect(props)}
      </FormControl>
    </Col>
  </FormGroup>
);

export const Amount = ({
  validationState,
  transfer = {},
  handleChangeAmount
}) => {
  const currency = getCurrency(transfer.to);

  return (
    <FormGroup validationState={validationState.amount}>
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
            defaultValue={transfer.amount}
            placeholder="Enter amount"
            onChange={handleChangeAmount}
          />
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>
      </Col>
    </FormGroup>
  );
};

export const DiffAmount = ({
  validationState,
  transfer = {},
  handleChangeRateFrom,
  handleChangeRateTo
}) => {
  const currencyFrom = getCurrency(transfer.from);
  const currencyTo = getCurrency(transfer.to);

  return (
    <FormGroup
      controlId="newTransferFromAmount"
      validationState={validationState.amount}
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
            placeholder="Enter amount"
            onChange={handleChangeRateFrom}
          />
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>
      </Col>
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
            placeholder="Enter amount"
            onChange={handleChangeRateTo}
          />
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>
      </Col>
    </FormGroup>
  );
};

export const Note = ({ transfer = {}, handleChangeNote }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} sm={2}>
      Note:
    </Col>
    <Col sm={10}>
      <FormControl
        type="text"
        defaultValue={transfer.note}
        placeholder="Enter Profit note"
        onChange={handleChangeNote}
      />
    </Col>
  </FormGroup>
);

export const Tags = ({ transfer = {}, handleChangeTags, props }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} sm={2}>
      Tags:
    </Col>
    <Col sm={10}>
      <Select
        name="updateChargeTagIds"
        value={transfer.tag_ids}
        options={getOptionsForTag(props)}
        onChange={handleChangeTags}
        isMulti
      />
    </Col>
  </FormGroup>
);

export const DayPicker = ({
  validationState,
  transfer = {},
  handleDayChange
}) => (
  <FormGroup validationState={validationState.date}>
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
        selectedDays={transfer.date}
        value={transfer.date}
        overlayComponent={CustomOverlay}
        keepFocus={false}
        inputProps={{ required: true }}
        onDayChange={handleDayChange}
      />
    </Col>
  </FormGroup>
);
