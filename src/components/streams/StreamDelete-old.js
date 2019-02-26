import React from "react";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId);
    console.log(this.props);
  }
  handleConfirmationButtonClick = () => {
    this.props.deleteStream(this.props.match.params.streamId);
  };
  renderContent() {
    if (!this.props.stream) {
      return <div>DELETE</div>;
    }
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">Modal Pop-up</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Activity</h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">{this.props.stream.titleField}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          <button
            onClick={this.handleConfirmationButtonClick}
            className="ui red button"
          >
            Confirm Deletion
          </button>
        </div>
      </div>
    );
  }
  render() {
    return this.renderContent();
  }
}

export default connect(
  (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.streamId],
  }),
  { fetchStream, deleteStream }
)(StreamDelete);
