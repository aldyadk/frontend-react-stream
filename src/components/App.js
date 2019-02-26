import React from "react";

import { Router, Route, Switch } from "react-router-dom";

import * as Str from "./streams";

import Header from "./Header";
import history from "../history";

export default function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/" exact component={Str.StreamList} />
            <Route path="/streams/new" exact component={Str.StreamCreate} />
            <Route
              path="/streams/edit/:streamId"
              exact
              component={Str.StreamEdit}
            />
            <Route
              path="/streams/delete/:streamId"
              exact
              component={Str.StreamDelete}
            />
            <Route path="/streams/:streamId" exact component={Str.StreamShow} />
          </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
}
