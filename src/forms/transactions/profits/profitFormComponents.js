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
  categoryOptionForSelect,
  getCurrency,
  getOptionsForTag
} from "../transactionFormHelpers";
import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import CustomOverlay from "../DatePickerOverlay";

export const ToAccount = ({
  validationState,
  profit = {},
  handleChangeAccount,
  props
}) => {
  return (
    <FormGroup validationState={validationState.to}>
      <Col componentClass={ControlLabel} sm={2}>
        From:
      </Col>
      <Col sm={10}>
        <FormControl
          componentClass="select"
          required
          onChange={e => handleChangeAccount(e)}
          defaultValue={profit.to && profit.to.id}
        >
          <option key="0" value="0">
            Choose account...
          </option>
          {accountsOptionForSelect(props)}
        </FormControl>
      </Col>
    </FormGroup>
  );
};

export const FromCategory = ({
  validationState,
  profit = {},
  handleChangeCategory,
  props
}) => {
  return (
    <FormGroup validationState={validationState.to}>
      <Col componentClass={ControlLabel} sm={2}>
        To:
      </Col>
      <Col sm={10}>
        <FormControl
          componentClass="select"
          required
          onChange={e => handleChangeCategory(e)}
          defaultValue={profit.from && profit.from.id}
        >
          <option key="0" value="0">
            Choose Profit category...
          </option>
          {categoryOptionForSelect(props.profits)}
        </FormControl>
      </Col>
    </FormGroup>
  );
};

export const Amount = ({
  validationState,
  profit = {},
  handleChangeAmount
}) => {
  const currency = getCurrency(profit.to);

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
            defaultValue={profit.amount}
            placeholder="Enter Profit amount"
            onChange={handleChangeAmount}
          />
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>
      </Col>
    </FormGroup>
  );
};

export const Note = ({ profit = {}, handleChangeNote }) => {
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Note:
      </Col>
      <Col sm={10}>
        <FormControl
          type="text"
          defaultValue={profit.note}
          placeholder="Enter Profit note"
          onChange={handleChangeNote}
        />
      </Col>
    </FormGroup>
  );
};

export const Tags = ({ profit = {}, handleChangeTags, props }) => {
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Tags:
      </Col>
      <Col sm={10}>
        <Select
          name="updateChargeTagIds"
          value={profit.tag_ids}
          options={getOptionsForTag(props)}
          onChange={handleChangeTags}
          isMulti
        />
      </Col>
    </FormGroup>
  );
};

export const DayPicker = ({
  validationState,
  profit = {},
  handleDayChange
}) => {
  return (
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
          selectedDays={profit.date}
          value={profit.date}
          overlayComponent={CustomOverlay}
          keepFocus={false}
          inputProps={{ required: true }}
          onDayChange={handleDayChange}
        />
      </Col>
    </FormGroup>
  );
};
