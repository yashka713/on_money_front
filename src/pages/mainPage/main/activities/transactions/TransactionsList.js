import React from "react";
import TransactionEvent from "./TransactionEvent";

export const TransactionsList = ({
  transactions,
  deleteTransactionCallback,
  updateTransactionCallback
}) => {
  return transactions.map(item => {
    return (
      <TransactionEvent
        transaction={item}
        key={item.id}
        deleteTransactionCallback={deleteTransactionCallback}
        updateTransactionCallback={updateTransactionCallback}
      />
    );
  });
};
