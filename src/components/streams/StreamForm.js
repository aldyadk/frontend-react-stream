import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

const validateForm = formValues => {
  const errors = {};
  if (!formValues.titleField) {
    errors.titleField = "Title is required";
  }
  if (!formValues.descriptionField) {
    errors.descriptionField = "Description is required";
  }
  return errors;
};

class StreamForm extends Component {
  renderInput = ({ input, label, placeholder, meta }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onSubmit = formValues => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="titleField"
          component={this.renderInput}
          label="Title"
          placeholder="enter title here..."
        />
        <Field
          name="descriptionField"
          component={this.renderInput}
          label="Description"
          placeholder="enter description here..."
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "streamForm",
  validate: validateForm,
})(StreamForm);
