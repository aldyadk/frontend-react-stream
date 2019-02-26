import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import * as Str from "./streams";

import Header from "./Header";

export default function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Route path="/" exact component={Str.StreamList} />
          <Route path="/streams/new" exact component={Str.StreamCreate} />
          <Route path="/streams/edit" exact component={Str.StreamEdit} />
          <Route path="/streams/delete" exact component={Str.StreamDelete} />
          <Route path="/streams/show" exact component={Str.StreamShow} />
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}
