import { connect } from "react-redux";
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPencilAlt from "@fortawesome/fontawesome-free-solid/faPencilAlt";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import TagList from "./tags/TagList";

class TransactionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: {},
      to: {}
    };

    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
  }

  setRelationships(props) {
    const relationships = props.transaction.relationships;

    const from = props.related.filter(item => {
      return (
        item.id === relationships.chargeable.data.id &&
        item.type === relationships.chargeable.data.type
      );
    })[0];

    const to = props.related.filter(item => {
      return (
        item.id === relationships.profitable.data.id &&
        item.type === relationships.profitable.data.type
      );
    })[0];

    this.setState({
      from: from,
      to: to
    });
  }

  componentDidMount() {
    this.setRelationships(this.props);
  }

  componentWillReceiveProps(props) {
    this.setRelationships(props);
  }

  handleDeleteTransaction() {
    this.props.deleteTransactionCallback(
      this.props.transaction.id,
      this.props.transaction.attributes.operation_type
    );
  }

  render() {
    const amount = transaction => {
      if (this.props.transaction.attributes.operation_type !== "transfer") {
        return (
          "" +
          transaction.attributes.from_amount +
          " " +
          transaction.attributes.from_symbol
        );
      } else {
        const from =
          transaction.attributes.from_amount +
          " " +
          transaction.attributes.from_symbol;
        const to =
          transaction.attributes.to_amount +
          " " +
          transaction.attributes.to_symbol;
        return from + " -> " + to;
      }
    };
    const operation = this.props.transaction.attributes.operation_type;
    return !this.state.from.attributes ? (
      ""
    ) : (
      <div key={this.props.transaction.id} className="col-md-12">
        <div className="col-md-6">
          <div
            className="col-md-5 col-md-offset-1 transaction-control control-edit cursor-pointer"
            onClick={() =>
              this.props.updateTransactionCallback(this.props.transaction)
            }
          >
            <FontAwesomeIcon icon={faPencilAlt} className="transaction-edit" />
          </div>
          <div
            className="col-md-5 transaction-control control-destroy cursor-pointer"
            onClick={this.handleDeleteTransaction}
          >
            <FontAwesomeIcon icon={faTimes} className="transaction-destroy" />
          </div>
          <div
            className={`col-md-12 ${operation}`}>
            <p className="timeline-date">
              {this.props.transaction.attributes.date}
            </p>
            <p>
              From <strong>{this.state.from.attributes.name}</strong>
            </p>
            <p>
              To <strong>{this.state.to.attributes.name}</strong>
            </p>
            <p>Amount: {amount(this.props.transaction)}</p>
            <p>Note: {this.props.transaction.attributes.note}</p>
          </div>
        </div>
        <div className="col-md-6">
          <p>Tags:</p>
          <TagList transaction={this.props.transaction} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    related: state.accounts.accounts
      .concat(state.categories.categories.charge)
      .concat(state.categories.categories.profit)
  }),
  null
)(TransactionItem);
