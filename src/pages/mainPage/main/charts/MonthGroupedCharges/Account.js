import React from "react";

export const Account = ({ account, handleClick }) => {
  const {
    id,
    attributes: { name, balance, currency }
  } = account;
  return (
    <li className="accountBox text-center">
      <label htmlFor={`account_${id}`} className="display-block cursor-pointer">
        <input
          type="checkbox"
          id={`account_${id}`}
          value={id}
          defaultChecked={true}
          className="display-block cursor-pointer"
          onClick={handleClick}
        />
        <p>{name}</p>
        <p>{balance}</p>
        <p>{currency}</p>
      </label>
    </li>
  );
};
