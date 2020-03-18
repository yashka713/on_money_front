import { connect } from "react-redux";
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPencilAlt from "@fortawesome/fontawesome-free-solid/faPencilAlt";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import TagList from "./tags/TagList";
import ReceiptImage from "./ReceiptImage";

class TransactionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
      to: null
    };

    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
    this.handleUpdateTransaction = this.handleUpdateTransaction.bind(this);
  }

  itemChargeable = (item, chargeable) =>
    item.id === chargeable.data.id && item.type === chargeable.data.type;

  itemProfitable = (item, profitable) =>
    item.id === profitable.data.id && item.type === profitable.data.type;

  setRelationships(props) {
    const { profitable, chargeable } = props.transaction.relationships;

    const result = props.related.filter(
      item =>
        this.itemChargeable(item, chargeable) ||
        this.itemProfitable(item, profitable)
    );

    const [from, to] = result;

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

  handleUpdateTransaction() {
    this.props.updateTransactionCallback(this.props.transaction);
  }

  transactionItem = (transaction, fromName, toName) => (
    <div key={transaction.id} className="col-md-12">
      <div className="col-md-offset-1 col-md-2">
        <ReceiptImage transaction={transaction} />
      </div>
      <div className="col-md-4">
        <div
          className="col-md-5 col-md-offset-1 transaction-control control-edit cursor-pointer"
          onClick={this.handleUpdateTransaction}
        >
          <FontAwesomeIcon icon={faPencilAlt} className="transaction-edit" />
        </div>
        <div
          className="col-md-5 transaction-control control-destroy cursor-pointer"
          onClick={this.handleDeleteTransaction}
        >
          <FontAwesomeIcon icon={faTimes} className="transaction-destroy" />
        </div>
        <div className={`col-md-12 ${transaction.attributes.operation_type}`}>
          <p className="timeline-date">{transaction.attributes.date}</p>
          <p>
            From <strong>{fromName}</strong>
          </p>
          <p>
            To <strong>{toName}</strong>
          </p>
          <p>Amount: {this.setAmount(transaction)}</p>
          <p>Note: {transaction.attributes.note}</p>
        </div>
      </div>
      <div className="col-md-4">
        <p>Tags:</p>
        <TagList transaction={transaction} />
      </div>
    </div>
  );

  setAmount = transaction => {
    if (transaction.attributes.operation_type !== "transfer") {
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

  render() {
    const transaction = this.props.transaction;
    const { from, to } = this.state;
    let transactionTemplate = "";

    if (from && to) {
      const fromName = from.attributes.name;
      const toName = to.attributes.name;

      transactionTemplate = this.transactionItem(transaction, fromName, toName);
    }

    return transactionTemplate;
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
