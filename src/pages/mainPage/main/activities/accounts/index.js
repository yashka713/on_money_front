import React from "react";
import { AccountHeader } from "./AccountHeader";
import AccountsList from "./AccountsList";

export default function Accounts() {
  return (
    <div className="col-md-12">
      <AccountHeader />
      <AccountsList />
    </div>
  );
}
