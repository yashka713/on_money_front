import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

export const NewTransactionBtnGroup = ({
  handleNewTransactionType,
  resetState
}) => {
  return (
    <div className="col-md-12 margin-top-15">
      <ButtonGroup justified>
        <Button
          href="#"
          bsClass="btn transfer"
          onClick={() => handleNewTransactionType("transfer")}
        >
          New Transfer
        </Button>
        <Button
          href="#"
          bsClass="btn profit"
          onClick={() => handleNewTransactionType("profit")}
        >
          New Profit
        </Button>
        <Button
          href="#"
          bsClass="btn charge"
          onClick={() => handleNewTransactionType("charge")}
        >
          New Charge
        </Button>
        <Button href="#" bsStyle="warning" onClick={resetState}>
          Update transactions
        </Button>
      </ButtonGroup>
    </div>
  );
};
