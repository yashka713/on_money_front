import { getCurrency } from "../transactionFormHelpers";

export const transferValidator = (
  { from, to, date, amount },
  validationState
) => {
  const currencyFrom = getCurrency(from);
  const currencyTo = getCurrency(to);

  let newState = {};

  if (!from && !to && !date && !amount) {
    newState = {
      validationState: {
        ...validationState,
        to: "error",
        from: "error",
        date: "error",
        amount: "error",
        disableSubmit: true
      }
    };
  } else if ((!from && !to) || from === to) {
    newState = {
      validationState: {
        ...validationState,
        from: "error",
        to: "error",
        disableSubmit: true
      }
    };
  } else if (!from) {
    newState = {
      validationState: {
        ...validationState,
        from: "error",
        disableSubmit: true
      }
    };
  } else if (!to) {
    newState = {
      validationState: {
        ...validationState,
        to: "error",
        disableSubmit: true
      }
    };
  } else if (!date) {
    newState = {
      validationState: {
        ...validationState,
        date: "error",
        disableSubmit: true
      }
    };
  } else if (!amount || amount <= 0) {
    newState = {
      validationState: {
        ...validationState,
        amount: "error",
        disableSubmit: true
      }
    };
  } else {
    newState = {
      validationState: {
        ...validationState,
        from: null,
        to: null,
        date: null,
        amount: null,
        disableSubmit: false
      }
    };
  }

  if (currencyFrom && currencyTo && currencyFrom === currencyTo) {
    newState["sameCurrency"] = true;
  } else {
    newState["sameCurrency"] = false;
  }

  return newState;
};
