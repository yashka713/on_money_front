import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import faAngleDoubleLeft from "@fortawesome/fontawesome-free-solid/faAngleDoubleLeft";
import faAngleDoubleRight from "@fortawesome/fontawesome-free-solid/faAngleDoubleRight";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

export const Pagers = ({ handlePreviousPage, handleNextPage }) => {
  return (
    <div className="col-md-offset-3 col-md-6 margin-top-15">
      <ButtonGroup justified>
        <Button href="#" bsStyle="success" onClick={handlePreviousPage}>
          <FontAwesomeIcon
            icon={faAngleDoubleLeft}
            className="transaction-edit"
          />{" "}
          Previous Page
        </Button>
        <Button href="#" bsStyle="success" onClick={handleNextPage}>
          Next Page{" "}
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            className="transaction-edit"
          />
        </Button>
      </ButtonGroup>
    </div>
  );
};
