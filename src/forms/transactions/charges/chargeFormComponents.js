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

export const FromAccount = ({
  validationState,
  charge = {},
  handleChangeAccount,
  props
}) => {
  return (
    <FormGroup validationState={validationState.from}>
      <Col componentClass={ControlLabel} sm={2}>
        From:
      </Col>
      <Col sm={10}>
        <FormControl
          componentClass="select"
          required
          onChange={e => handleChangeAccount(e)}
          defaultValue={charge.from && charge.from.id}
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

export const ToCategory = ({
  validationState,
  charge = {},
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
          defaultValue={charge.to && charge.to.id}
        >
          <option key="0" value="0">
            Choose charge category...
          </option>
          {categoryOptionForSelect(props.charges)}
        </FormControl>
      </Col>
    </FormGroup>
  );
};

export const Amount = ({
  validationState,
  charge = {},
  handleChangeAmount
}) => {
  const currency = getCurrency(charge.from);

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
            defaultValue={charge.amount}
            placeholder="Enter Charge amount"
            onChange={handleChangeAmount}
          />
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>
      </Col>
    </FormGroup>
  );
};

export const Note = ({ charge = {}, handleChangeNote }) => {
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Note:
      </Col>
      <Col sm={10}>
        <FormControl
          type="text"
          defaultValue={charge.note}
          placeholder="Enter Charge note"
          onChange={handleChangeNote}
        />
      </Col>
    </FormGroup>
  );
};

export const Tags = ({ charge = {}, handleChangeTags, props }) => {
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Tags:
      </Col>
      <Col sm={10}>
        <Select
          name="updateChargeTagIds"
          value={charge.tag_ids}
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
  charge = {},
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
          selectedDays={charge.date}
          value={charge.date}
          overlayComponent={CustomOverlay}
          keepFocus={false}
          inputProps={{ required: true }}
          onDayChange={handleDayChange}
        />
      </Col>
    </FormGroup>
  );
};
