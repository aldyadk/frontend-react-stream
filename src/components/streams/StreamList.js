import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdminButtons(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>
            Edit
          </Link>
          <Link
            className="ui button negative"
            to={`/streams/delete/${stream.id}`}
          >
            Delete
          </Link>
        </div>
      );
    }
  }
  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }
  renderStreams() {
    if (this.props.streams.length > 0) {
      return this.props.streams.map(stream => {
        return (
          <div className="item" key={stream.id}>
            {this.renderAdminButtons(stream)}
            <i className="large middle aligned icon camera" />
            <div className="content">
              <Link to={`/streams/${stream.id}`} className="header">
                {stream.titleField}
              </Link>
              <div className="description">{stream.descriptionField}</div>
            </div>
          </div>
        );
      });
    } else {
      return <div>"StreamList"</div>;
    }
  }
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
