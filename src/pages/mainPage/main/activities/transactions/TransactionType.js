import React from "react";
import isEmpty from "lodash/isEmpty";
import NewTransferForm from "../../../../../forms/transactions/transfers/NewTransferForm";
import UpdateTransferForm from "../../../../../forms/transactions/transfers/UpdateTransferForm";
import NewProfitForm from "../../../../../forms/transactions/profits/NewProfitForm";
import UpdateProfitForm from "../../../../../forms/transactions/profits/UpdateProfitForm";
import NewChargeForm from "../../../../../forms/transactions/charges/NewChargeForm";
import UpdateChargeForm from "../../../../../forms/transactions/charges/UpdateChargeForm";

export const TransactionType = ({ operationType, transaction, handleShowModal }) => {
  switch (operationType) {
    case "transfer":
      if (isEmpty(transaction)) {
        return <NewTransferForm callback={handleShowModal} />;
      } else {
        return (
          <UpdateTransferForm
            callback={handleShowModal}
            transaction={transaction}
          />
        );
      }
    case "profit":
      if (isEmpty(transaction)) {
        return <NewProfitForm callback={handleShowModal} />;
      } else {
        return (
          <UpdateProfitForm
            callback={handleShowModal}
            transaction={transaction}
          />
        );
      }
    case "charge":
      if (isEmpty(transaction)) {
        return <NewChargeForm callback={handleShowModal} />;
      } else {
        return (
          <UpdateChargeForm
            callback={handleShowModal}
            transaction={transaction}
          />
        );
      }
    default:
      return "";
  }
};
