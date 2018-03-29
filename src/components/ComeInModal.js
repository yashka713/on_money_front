import React from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import "../styles/ComeInModal.css";

function LoginModal() {
  return (
    <div className="login-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Choose action:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Tab 1">
              Tab 1 content
            </Tab>
            <Tab eventKey={2} title="Tab 2">
              Tab 2 content
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default LoginModal;