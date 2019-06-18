export const chargeValidator = (
  { from, to, date, amount },
  validationState
) => {
  if (!from && !to && !date && !amount) {
    return {
      validationState: {
        ...validationState,
        to: "error",
        from: "error",
        date: "error",
        amount: "error",
        disableSubmit: true
      }
    };
  } else if (!from) {
    return {
      validationState: {
        ...validationState,
        from: "error",
        disableSubmit: true
      }
    };
  } else if (!to) {
    return {
      validationState: {
        ...validationState,
        to: "error",
        disableSubmit: true
      }
    };
  } else if (!date) {
    return {
      validationState: {
        ...validationState,
        date: "error",
        disableSubmit: true
      }
    };
  } else if (!amount || amount <= 0) {
    return {
      validationState: {
        ...validationState,
        amount: "error",
        disableSubmit: true
      }
    };
  } else {
    return {
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
};
