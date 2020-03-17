import { Col, ControlLabel, FormGroup, Thumbnail } from "react-bootstrap";
import React from "react";

export const FileUploaderComponent = ({
  handleChangeFile,
  file,
  uploadedFile
}) => {
  let img = null;

  if (file && file instanceof File) {
    const filePreview = URL.createObjectURL(file);
    img = <Thumbnail href="#" src={filePreview} alt="Receipt preview" />;
  } else if (uploadedFile && typeof uploadedFile === "object") {
    const filePreview = uploadedFile.thumbnail;
    img = <Thumbnail href="#" src={filePreview} alt="Receipt preview" />;
  }

  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Receipt:
      </Col>
      <Col sm={10}>
        <div className="col-md-6">
          <input type="file" onChange={handleChangeFile} />
        </div>
        <div className="col-md-6">{img}</div>
      </Col>
    </FormGroup>
  );
};
