import React from "react";
import Activities from "./activities";
import Charts from "./charts";
import { Tabs, Tab } from "react-bootstrap";

export function Body() {
  return (
    <div className="container">
      <Tabs defaultActiveKey={1} id="mainPageTab">
        <Tab eventKey={1} title="Activities">
          <Activities />
        </Tab>
        <Tab eventKey={2} title="Charts">
          <Charts />
        </Tab>
      </Tabs>
    </div>
  );
}
