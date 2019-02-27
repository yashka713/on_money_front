import { connect } from "react-redux";
import React, { Component } from "react";
import TransactionEvent from "./TransactionEvent";
import { Pager } from "react-bootstrap";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  timelineEvents() {
    return this.props.transactions.map(item => {
      return <TransactionEvent transaction={item} key={item.id} />;
    });
  }

  handlePreviousPage() {
    this.props.handlePreviousPage();
  }

  handleNextPage() {
    this.props.handleNextPage();
  }

  render() {
    let disPrevPage = this.props.currentPage <= 1;
    let disNextPage = this.props.currentPage === this.props.lastPage;

    return this.props.transactions.length > 0 ? (
      <div className="timeline">
        <Pager>
          <Pager.Item
            href="#"
            previous
            disabled={disPrevPage}
            onClick={this.handlePreviousPage}
          >
            &larr; Previous
          </Pager.Item>
          <Pager.Item
            href="#"
            next
            disabled={disNextPage}
            onClick={this.handleNextPage}
          >
            Next &rarr;
          </Pager.Item>
        </Pager>
        {this.timelineEvents()}
      </div>
    ) : (
      <div className="text-center">
        <strong>Nothing to show</strong>
      </div>
    );
  }
}

export default connect(
  state => ({
    transactions: state.transactions.transactions,
    related: state.transactions.relatedFields
  }),
  null
)(Timeline);
