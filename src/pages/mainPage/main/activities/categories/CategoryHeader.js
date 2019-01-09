import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import capitalize from "lodash/capitalize";
import faInfo from "@fortawesome/fontawesome-free-solid/faInfo";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

export const CategoryHeader = ({ categoryType }) => {
  const operation = capitalize(categoryType);
  const popover = (
    <Popover id="popover">
      <p>
        For creating <strong>{operation} operation</strong> choose{" "}
        <strong>Category</strong> & <strong>Account</strong>.
      </p>
    </Popover>
  );

  return (
    <OverlayTrigger placement="bottom" overlay={popover}>
      <p className="text-center">
        {operation} categories{" "}
        <FontAwesomeIcon
          icon={faInfo}
          className="cursor-pointer informationPopover"
        />
        :
      </p>
    </OverlayTrigger>
  );
};
