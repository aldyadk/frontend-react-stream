import React from "react";

class ButtOne extends React.Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
  }
  render() {
    return (
      <div className="column">
        <button
          ref={this.Ref}
          className="fluid ui massive primary button"
          onClick={() => this.props.onClickHandler(this.props.value)}
        >
          {this.props.value}
        </button>
      </div>
    );
  }
}
class ButtTwo extends React.Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
  }
  render() {
    return (
      <div className="column">
        <button
          ref={this.Ref}
          className="fluid ui massive yellow button"
          onClick={() => this.props.onClickHandler(this.props.value)}
        >
          {this.props.value}
        </button>
      </div>
    );
  }
}
class ButtThree extends React.Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
  }
  render() {
    return (
      <div className="column">
        <button
          ref={this.Ref}
          className="fluid ui massive olive button"
          onClick={() => this.props.onClickHandler(this.props.value)}
        >
          {this.props.value}
        </button>
      </div>
    );
  }
}
class ButtFour extends React.Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
  }
  render() {
    return (
      <div
        ref={this.Ref}
        className="column"
        onClick={() => this.props.onClickHandler(this.props.value)}
      >
        <div
          style={{margin:'auto',height:'100%', backgroundColor:'teal', borderRadius:'0.28571429rem', color:'white', display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}
        >
          <b style={{fontSize:'3rem'}}>{this.props.value}</b>
        </div>
      </div>
    );
  }
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
      <div className="ui container" style={{marginTop:'10vh'}}>
        <div className="ui two column centered grid">
          <div className="column">
            <div className="ui segment" style={{backgroundColor:'grey'}}>
              <div className="ui segment">
                <b style={{fontSize:'3rem'}}>{this.state.displayValue}</b>
              </div>
              <div className="ui grid center aligned">
                <div className="row">
                  <div className="column">
                    <div className="ui four column grid">
                      <ButtTwo value={"+"} onClickHandler={this.onClickHandler} />
                      <ButtTwo value={"-"} onClickHandler={this.onClickHandler} />
                      <ButtTwo value={"x"} onClickHandler={this.onClickHandler} />
                      <ButtTwo value={"/"} onClickHandler={this.onClickHandler} />
                    </div>
                  </div>
                </div>
                <div className="stretched row">
                  <div className="twelve wide column">
                    <div className="ui three column grid">
                      <ButtOne value={1} onClickHandler={this.onClickHandler} />
                      <ButtOne value={2} onClickHandler={this.onClickHandler} />
                      <ButtOne value={3} onClickHandler={this.onClickHandler} />
                      <ButtOne value={4} onClickHandler={this.onClickHandler} />
                      <ButtOne value={5} onClickHandler={this.onClickHandler} />
                      <ButtOne value={6} onClickHandler={this.onClickHandler} />
                      <ButtOne value={7} onClickHandler={this.onClickHandler} />
                      <ButtOne value={8} onClickHandler={this.onClickHandler} />
                      <ButtOne value={9} onClickHandler={this.onClickHandler} />
                      <ButtThree value={"C"} onClickHandler={this.onClickHandler} />
                      <ButtOne value={0} onClickHandler={this.onClickHandler} />
                      <ButtThree value={"."} onClickHandler={this.onClickHandler} />
                    </div>
                  </div>
                  <div className="four wide column">
                    <div className="ui one column grid">
                      <ButtFour value={"="} onClickHandler={this.onClickHandler} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
