import React from "react";
import jsonToFormData from "../../services/utils/jsonToFormData";

export const chargeAttributes = ({
  charge: { from, to, amount, date, tag_ids, note, file }
}) => {
  const charge = {
    charge: {
      from: from.id,
      to: to.id,
      amount: amount,
      date: date,
      tag_ids: setTags(tag_ids),
      note: note,
      receipt_attributes: setReceipt(file)
    }
  };

  return jsonToFormData(charge);
};

export const profitAttributes = ({
  profit: { from, to, amount, date, tag_ids, note, file }
}) => {
  const profit = {
    profit: {
      from: from.id,
      to: to.id,
      amount: amount,
      date: date,
      tag_ids: setTags(tag_ids),
      note: note,
      receipt_attributes: setReceipt(file)
    }
  };

  return jsonToFormData(profit);
};

export const transferAttributes = ({
  transfer: { from, to, amount, date, tag_ids, note, file },
  sameCurrency,
  rate
}) => {
  const transfer = {
    from: from.id,
    to: to.id,
    amount: amount,
    rate: 1,
    date: date,
    tag_ids: setTags(tag_ids),
    note: note,
    receipt_attributes: setReceipt(file)
  };

  if (!sameCurrency) {
    transfer["amount"] = rate.from;
    transfer["rate"] = rate.to / rate.from;
  }

  return jsonToFormData({ transfer: transfer });
};

export const getOptionsForTag = ({ tags }) =>
  tags.map(tag => {
    return {
      value: tag.id,
      label: tag.attributes.name
    };
  });

export const findItem = (accounts, account) =>
  accounts.filter(item => item.id === account)[0];

export const accountsOptionForSelect = ({ accounts }) =>
  accounts.map(account => {
    return (
      <option key={account.id} value={account.id}>
        {account.attributes.name} --- {account.attributes.balance}
        {account.attributes.currency}
      </option>
    );
  });

export const categoryOptionForSelect = categories =>
  categories.map(category => {
    return (
      <option key={category.id} value={category.id}>
        {category.attributes.name}
      </option>
    );
  });

export const getCurrency = account =>
  account && account.attributes.currency ? account.attributes.currency : null;

export const errorPointersAndDetails = messages => {
  let pointers = [];
  let details = [];
  if (messages !== "") {
    pointers = messages.map(item => {
      return item.pointer
        .split("/")
        .pop()
        .split("_")
        .pop();
    });
    details = messages.map(item => {
      return item.detail;
    });
  }
  return {
    pointers: pointers,
    details: details
  };
};

const setTags = tag_ids =>
  tag_ids ? tag_ids.map(tag => Number(tag.value)) : [];

const setReceipt = file => (file ? { receipt: file } : null);
