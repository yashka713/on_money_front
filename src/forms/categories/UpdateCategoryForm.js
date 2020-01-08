import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import updateCategory from "../../actions/categories/updateCategory";
import updateCategoryRequest from "../../services/requests/updateCategoryRequest";
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal
} from "react-bootstrap";
import Api from "../../api/Api";
import capitalize from "lodash/capitalize";

class UpdateCategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        name: this.props.item.attributes.name,
        type_of: this.props.type,
        note: this.props.item.attributes.note || ""
      }
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({
      item: {
        ...this.state.item,
        name: event.target.value
      }
    });
  }

  handleChangeNote(event) {
    this.setState({
      item: {
        ...this.state.item,
        note: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    updateCategoryRequest(event.target.action, this.state.item).then(
      responce => {
        if (responce.status === 200) {
          this.props.updateCategory(responce.data.data, this.props.type);
          this.props.callback();
        } else {
          console.log("error", responce);
        }
      }
    );
    return false;
  }

  render() {
    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>
            Update <strong>{capitalize(this.props.type)}</strong> Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="updateCategoryForm"
            action={Api.categoryPath(this.props.item.id)}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <FormGroup controlId="updateCategoryName">
              <Col componentClass={ControlLabel} sm={2}>
                Name:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  required
                  defaultValue={this.state.item.name}
                  placeholder="Enter Category name"
                  onChange={this.handleChangeName}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="updateCategoryType">
              <Col componentClass={ControlLabel} sm={2}>
                Type:
              </Col>
              <Col sm={10}>
                <FormControl type="text" value={this.props.type} disabled />
              </Col>
            </FormGroup>
            <FormGroup controlId="updateCategoryNote">
              <Col componentClass={ControlLabel} sm={2}>
                Note:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  defaultValue={this.state.item.note}
                  placeholder="Enter Category note"
                  onChange={this.handleChangeNote}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button type="submit" bsStyle="primary" form="updateCategoryForm">
            Update
          </Button>
        </Modal.Footer>
      </Fragment>
    );
  }
}

export default connect(null, dispatch => ({
  updateCategory: (category, type) => {
    dispatch(updateCategory(category, type));
  }
}))(UpdateCategoryForm);
