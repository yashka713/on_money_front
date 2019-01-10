import React, { Component } from "react";
import { connect } from "react-redux";
import addCategory from "../../actions/categories/addCategory";
import newCategoryRequest from "../../services/requests/newCategoryRequest";
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

class NewCategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        name: "",
        type_of: this.props.type,
        note: ""
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
    newCategoryRequest(event.target.action, this.state.item).then(responce => {
      if (responce.status === 201) {
        this.props.addCategory(responce.data.data, this.props.type);
        this.props.callback();
      } else {
        console.log("error", responce);
      }
    });
    return false;
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>
            New <strong>{capitalize(this.props.type)}</strong> Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newCategoryForm"
            action={Api.categoriesPath()}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <FormGroup controlId="newCategoryName">
              <Col componentClass={ControlLabel} sm={2}>
                Name:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  required
                  placeholder="Enter Category name"
                  onChange={this.handleChangeName}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="newCategoryType">
              <Col componentClass={ControlLabel} sm={2}>
                Type:
              </Col>
              <Col sm={10}>
                <FormControl type="text" value={this.props.type} disabled />
              </Col>
            </FormGroup>
            <FormGroup controlId="newCategoryNote">
              <Col componentClass={ControlLabel} sm={2}>
                Note:
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  placeholder="Enter Category note"
                  onChange={this.handleChangeNote}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button type="submit" bsStyle="primary" form="newCategoryForm">
            Create
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  addCategory: (account, type) => {
    dispatch(addCategory(account, type));
  }
}))(NewCategoryForm);
