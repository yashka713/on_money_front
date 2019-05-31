import React, { Component } from "react";
import { connect } from "react-redux";
import checkTag from "../../../../../actions/tags/checkTag";
import updateTag from "../../../../../actions/tags/updateTag";
import postRequest from "../../../../../services/requests/postRequest";
import updateRequest from "../../../../../services/requests/updateRequest";
import Api from "../../../../../api/Api";
import { FormGroup, InputGroup, FormControl, Button } from "react-bootstrap";

class TagInput extends Component {
  initialState = () => ({
    tag: {
      id: 0,
      name: ""
    },
    validationState: {
      tagInput: null
    },
    showErrorAlert: false,
    pointers: [],
    messages: [],
    buttonDisabled: true
  });

  state = this.initialState();

  componentWillReceiveProps = props =>
    this.setState({
      tag: {
        id: props.id,
        name: props.name
      },
      buttonDisabled: false
    });

  resetState = () => this.setState(this.initialState());

  handleTagChange = event =>
    this.setState(
      {
        tag: {
          ...this.state.tag,
          name: event.target.value
        }
      },
      () => {
        if (this.state.tag.name.length > 2) {
          this.setState({ buttonDisabled: false });
        } else {
          this.setState({ buttonDisabled: true });
        }
      }
    );

  incorrectInput(messages = "") {
    let pointers = [];
    let details = [];
    if (messages !== "") {
      pointers = messages.map(item => {
        return item.pointer
          .split("/")
          .pop()
          .split("_")
          .pop();
      });
      details = messages.map(item => {
        return item.detail;
      });
    }
    this.setState({
      pointers: [...new Set(pointers)],
      messages: [...new Set(details)],
      validationState: { tagInput: "error" }
    });
  }

  sendData = () => ({ tag: { name: this.state.tag.name } });

  findOrCreateTag = () =>
    postRequest(Api.tagsPath(), this.sendData()).then(responce => {
      if (responce.status === 200) {
        this.props.checkTag(responce.data);
        this.resetState();
      } else {
        this.incorrectInput(responce.body);
        console.log("error", responce);
      }
    });

  updateTag = () =>
    updateRequest(Api.tagPath(this.state.tag.id), this.sendData()).then(
      responce => {
        if (responce.status === 200) {
          this.props.updateTag(responce.data);
          this.resetState();
        } else {
          this.incorrectInput(responce.body);
          console.log("error", responce);
        }
      }
    );

  handleTagClick = () => {
    if (this.state.tag.id > 0) {
      this.updateTag();
    } else {
      this.findOrCreateTag();
    }
    return false;
  };

  render() {
    return (
      <FormGroup validationState={this.state.validationState.tagInput}>
        {this.state.pointers.map((item, index) => {
          return (
            <p className="tag-error" onClick={this.resetState} key={index}>
              <strong>{item}</strong> {this.state.messages[index]}
            </p>
          );
        })}
        <InputGroup>
          <FormControl
            type="text"
            value={this.state.tag.name}
            onChange={this.handleTagChange}
            placeholder="Maximum is 25 symbols"
          />
          <InputGroup.Button>
            <Button href="#" bsStyle="warning" onClick={this.resetState}>
              Clear selection
            </Button>
            <Button
              href="#"
              bsStyle="primary"
              onClick={this.handleTagClick}
              disabled={this.state.buttonDisabled}
            >
              {this.state.tag.id > 0 ? "Update tag" : "Add Tag"}
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    checkTag: tag => {
      dispatch(checkTag(tag));
    },
    updateTag: tag => {
      dispatch(updateTag(tag));
    }
  })
)(TagInput);
