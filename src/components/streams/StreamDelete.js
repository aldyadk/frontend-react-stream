import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId);
    // console.log(this.props);
  }

  handleConfirmationButtonClick = () => {
    this.props.deleteStream(this.props.match.params.streamId);
  };

  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={this.handleConfirmationButtonClick}
          className="ui button negative"
        >
          Delete
        </button>
        <Link className="ui button" to="/">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure?";
    } else {
      return `Are you sure to delete this: ${this.props.stream.titleField}`;
    }
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.streamId],
  }),
  { fetchStream, deleteStream }
)(StreamDelete);
