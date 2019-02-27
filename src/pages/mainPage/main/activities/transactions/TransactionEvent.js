import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faHandHoldingUsd from "@fortawesome/fontawesome-free-solid/faHandHoldingUsd";
import faExchangeAlt from "@fortawesome/fontawesome-free-solid/faExchangeAlt";
import faShoppingCart from "@fortawesome/fontawesome-free-solid/faShoppingCart";
import { connect } from "react-redux";

class TransactionEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: {},
      to: {}
    };
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

  render() {
    let bacgrounds = {
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
      bacgrounds[this.props.transaction.attributes.operation_type];

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
      <div className={iconStyle.positionClass + " timeline-container"} key={this.props.transaction.id}>
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
    );
  }
}

export default connect(
  state => ({
    related: state.transactions.relatedFields
  }),
  null
)(TransactionEvent);
