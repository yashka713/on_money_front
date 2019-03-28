import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faHandHoldingUsd from "@fortawesome/fontawesome-free-solid/faHandHoldingUsd";
import faExchangeAlt from "@fortawesome/fontawesome-free-solid/faExchangeAlt";
import faShoppingCart from "@fortawesome/fontawesome-free-solid/faShoppingCart";
import faPencilAlt from "@fortawesome/fontawesome-free-solid/faPencilAlt";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import { connect } from "react-redux";

class TransactionEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: {},
      to: {}
    };

    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
    this.handleUpdateTransaction = this.handleUpdateTransaction.bind(this);
  }

  componentDidMount() {
    const relationships = this.props.transaction.relationships;

    const from = this.props.related.filter(item => {
      return (
        item.id === relationships.chargeable.data.id &&
        item.type === relationships.chargeable.data.type
      );
    })[0];

    const to = this.props.related.filter(item => {
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

  handleDeleteTransaction() {
    this.props.deleteTransactionCallback();
    this.props.setTransaction(
      this.props.transaction.id,
      this.props.transaction.attributes.operation_type
    );
  }

  handleUpdateTransaction() {
    this.props.updateTransactionCallback();
    this.props.setTransaction(
      this.props.transaction.id,
      this.props.transaction.attributes.operation_type
    );
  }

  render() {
    let backgrounds = {
      profit: {
        iconColor: "#6ef309",
        icon: <FontAwesomeIcon icon={faHandHoldingUsd} className="" />,
        positionClass: "timeline-right"
      },
      transfer: {
        iconColor: "#1678d9",
        icon: <FontAwesomeIcon icon={faExchangeAlt} className="" />,
        positionClass: "timeline-middle"
      },
      charge: {
        iconColor: "#f99b9b",
        icon: <FontAwesomeIcon icon={faShoppingCart} className="" />,
        positionClass: "timeline-left"
      }
    };
    let iconStyle =
      backgrounds[this.props.transaction.attributes.operation_type];

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
    return !this.state.from.attributes ? (
      ""
    ) : (
      <div
        className={iconStyle.positionClass + " timeline-container show-edit"}
        key={this.props.transaction.id}
      >
        <div className="timeline-controls">
          <div className="hide-controls control-edit">
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="cursor-pointer transaction-edit"
              onClick={this.handleUpdateTransaction}
            />
          </div>
          <div className="hide-controls control-destroy">
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer transaction-destroy"
              onClick={this.handleDeleteTransaction}
            />
          </div>
          <div className="timeline-content">
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
)(TransactionEvent);
