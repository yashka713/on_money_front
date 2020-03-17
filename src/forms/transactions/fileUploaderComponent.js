import { Col, ControlLabel, FormGroup } from "react-bootstrap";
import React from "react";

export const FileUploaderComponent = ({ handleChangeFile }) => {
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Receipt:
      </Col>
      <Col sm={10}>
        <input type="file" onChange={handleChangeFile} />
      </Col>
    </FormGroup>
  );
};
