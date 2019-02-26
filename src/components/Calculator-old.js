import React from "react";

function Butt(props) {
  return (
    <div
      style={{ cursor: "pointer", border: "1px solid black" }}
      className="column"
      onClick={() => props.onClickHandler(props.value)}
    >
      {props.value}
    </div>
  );
}

const calculateOperands = {
  "+": (a, b) => {
    return a + b;
  },
  "-": (a, b) => {
    return a - b;
  },
  x: (a, b) => {
    return a * b;
  },
  "/": (a, b) => {
    return a / b;
  },
  "=": (a, b) => {
    return b;
  },
};

export default class Calculator extends React.Component {
  state = {
    displayValue: "0",
    firstOperand: null,
    isWaiting: false,
    operator: null,
  };

  onClickHandler = input => {
    const { firstOperand, displayValue, isWaiting, operator } = this.state;

    if (input === "C") {
      this.setState({
        displayValue: "0",
        firstOperand: null,
        isWaiting: false,
        operator: null,
      });
    }

    if (input === "." && !displayValue.includes(".") && !isWaiting) {
      this.setState({ displayValue: displayValue + input.toString() });
    }

    if (typeof input === "number") {
      if (isWaiting) {
        this.setState({ displayValue: String(input), isWaiting: false });
      } else if (displayValue === "0") {
        this.setState({ displayValue: String(input) });
      } else {
        this.setState({ displayValue: displayValue + String(input) });
      }
    }

    if (["+", "-", "x", "/", "="].indexOf(input) >= 0) {
      const parsedValue = Number(displayValue);

      if (isWaiting) {
        this.setState({
          operator: input,
        });
        return;
      }

      if (!firstOperand) {
        this.setState({
          isWaiting: true,
          operator: input,
          firstOperand: parsedValue,
        });
      } else if (operator) {
        const result = calculateOperands[operator](firstOperand, parsedValue);
        this.setState({
          displayValue: String(result),
          isWaiting: true,
          operator: input,
          firstOperand: result,
        });
      }
    }
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui segment">{this.state.displayValue}</div>
        <div className="ui segment">
          <div className="ui grid center aligned">
            <div className="row">
              <div className="column">
                <div className="ui four column grid">
                  <Butt value={"+"} onClickHandler={this.onClickHandler} />
                  <Butt value={"-"} onClickHandler={this.onClickHandler} />
                  <Butt value={"x"} onClickHandler={this.onClickHandler} />
                  <Butt value={"/"} onClickHandler={this.onClickHandler} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="ui three column grid">
                  <div className="row">
                    <Butt value={1} onClickHandler={this.onClickHandler} />
                    <Butt value={2} onClickHandler={this.onClickHandler} />
                    <Butt value={3} onClickHandler={this.onClickHandler} />
                  </div>
                  <div className="row">
                    <Butt value={4} onClickHandler={this.onClickHandler} />
                    <Butt value={5} onClickHandler={this.onClickHandler} />
                    <Butt value={6} onClickHandler={this.onClickHandler} />
                  </div>
                  <div className="row">
                    <Butt value={7} onClickHandler={this.onClickHandler} />
                    <Butt value={8} onClickHandler={this.onClickHandler} />
                    <Butt value={9} onClickHandler={this.onClickHandler} />
                  </div>
                  <div className="row">
                    <Butt value={"C"} onClickHandler={this.onClickHandler} />
                    <Butt value={0} onClickHandler={this.onClickHandler} />
                    <Butt value={"."} onClickHandler={this.onClickHandler} />
                  </div>
                </div>
              </div>
              <div className="four wide column">
                <Butt value={"="} onClickHandler={this.onClickHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
