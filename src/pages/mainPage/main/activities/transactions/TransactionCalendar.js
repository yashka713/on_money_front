import React, { Component } from "react";
import DayPicker from "react-day-picker/DayPicker";
import { Button } from "react-bootstrap";
import "react-day-picker/lib/style.css";

export default class TransactionCalendar extends Component {
  render() {
    const from = this.props.fromDay;
    const to = this.props.toDay;
    const enteredTo = this.props.enteredTo;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.props.fromDay };
    const selectedDays = [from, { from, to: enteredTo }];

    const message = () => {
      if (!from && !to) {
        return <p>Please, select the first day.</p>;
      } else if (from && !to) {
        return <p>Please, select the last day.</p>;
      } else {
        return (
          <div className="btn-block">
            <p>Selected:</p>
            <p>
              <strong>from:</strong> {from.toLocaleDateString()}
            </p>
            <p>
              <strong>to:</strong> {to.toLocaleDateString()}
            </p>
            <Button bsStyle="warning" onClick={this.props.handleResetClick}>
              Reset
            </Button>
          </div>
        );
      }
    };

    const startMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    return (
      <div className="datepicker-box">
        <div className="datepicker-item-selected">{message()}</div>
        <div className="datepicker-item-selector">
          <DayPicker
            className="Range"
            numberOfMonths={2}
            month={startMonth}
            selectedDays={selectedDays}
            disabledDays={disabledDays}
            modifiers={modifiers}
            onDayClick={this.props.handleDayClick}
            onDayMouseEnter={this.props.handleDayMouseEnter}
          />
        </div>
      </div>
    );
  }
}
