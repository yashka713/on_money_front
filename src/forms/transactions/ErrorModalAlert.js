import React from "react";
import { Alert } from "react-bootstrap";

export const ErrorModalAlert = ({
  shouldShown = false,
  errors,
  handleDismiss
}) => {
  return shouldShown ? (
    <Alert bsStyle="danger" onDismiss={() => handleDismiss()}>
      <h4>You got an error!</h4>
      {errors.pointers.map((item, index) => {
        return (
          <div key={index}>
            <p>
              <strong>{item}</strong> {errors.messages[index]}
            </p>
          </div>
        );
      })}
    </Alert>
  ) : (
    ""
  );
};
