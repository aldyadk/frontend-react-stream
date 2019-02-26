import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId);
  }

  handleSubmission = formValues => {
    // console.log(formValues);
    this.props.editStream(this.props.match.params.streamId, formValues);
  };

  renderStream() {
    if (this.props.stream) {
      return (
        <div>
          <h3>Edit a stream</h3>
          <StreamForm
            onSubmit={this.handleSubmission}
            initialValues={_.pick(
              this.props.stream,
              "titleField",
              "descriptionField"
            )}
          />
        </div>
      );
    }
    return <div>StreamEdit</div>;
  }
  render() {
    return this.renderStream();
  }
}

function mapStateToProps(state, ownProps) {
  return { stream: state.streams[ownProps.match.params.streamId] };
}

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
