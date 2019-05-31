import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faInfo from "@fortawesome/fontawesome-free-solid/faInfo";

export const AccountHeader = () => {
  const popover = (
    <Popover id="popover">
      <p>
        For creating <strong>Transfer</strong> choose two{" "}
        <strong>Accounts</strong>.
      </p>
      <p>
        For creating <strong>Profit operation</strong> choose{" "}
        <strong>Account</strong> & <strong>Profit category</strong>.
      </p>
      <p>
        For creating <strong>Charge operation</strong> choose{" "}
        <strong>Account</strong> & <strong>Charge category</strong>.
      </p>
    </Popover>
  );

  return (
    <OverlayTrigger placement="bottom" overlay={popover}>
      <p className="text-center">
        Accounts Info{" "}
        <FontAwesomeIcon
          icon={faInfo}
          className="cursor-pointer informationPopover"
        />
        :
      </p>
    </OverlayTrigger>
  );
};
