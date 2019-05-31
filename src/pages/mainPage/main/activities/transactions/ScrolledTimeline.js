import {connect} from "react-redux";
import React, {Component} from "react";
import HorizontalTimelineContent from "./HorizontalTimelineContent";
import TransactionItem from "./TransactionItem";
import DestroyTransactionModal from "./DestroyTransactionModal";

class ScrolledTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDestroyModal: false,
      showUpdateModal: false,
      transaction: {
        id: null,
        type: ""
      }
    };
    this.deleteTransactionModal = this.deleteTransactionModal.bind(this);
  }

  componentWillMount() {
    this.updateProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateProps(props);
  }

  deleteTransactionModal(id, type) {
    let showModal = !this.state.showDestroyModal;
    this.setState({
      showDestroyModal: showModal,
      transaction: {
        id: id,
        type: type
      }
    });
  }

  updateProps(props) {
    this.data = props.transactions.map(transaction => {
      return {
        date: new Date(transaction.attributes.date),
        component: (
          <TransactionItem
            transaction={transaction}
            deleteTransactionCallback={this.deleteTransactionModal}
            updateTransactionCallback={this.props.updateHandler}
          />
        )
      };
    });
  }

  render() {
    return this.data.length > 0 ? (
      <HorizontalTimelineContent content={this.data}>
        <DestroyTransactionModal
          show={this.state.showDestroyModal}
          closeDeleteModal={this.deleteTransactionModal}
          item={this.state.transaction}
        />
      </HorizontalTimelineContent>
    ) : (
      <div className="text-center col-md-12 margin-top-15 empty-timeline">
        <strong>Nothing to show</strong>
      </div>
    );
  }
}

export default connect(
  state => ({
    transactions: state.transactions.transactions
  }),
  null
)(ScrolledTimeline);
