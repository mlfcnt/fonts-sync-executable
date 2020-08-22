import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { LocalFontsTable } from "./components/pages/LocalFontsTable";
import { OnlineFontsTable } from "./components/pages/OnlineFontsTable";
import { ThemeProvider } from "./components/context/ThemeProvider";
import "rsuite/dist/styles/rsuite-default.css";
import { UserProvider } from "./components/context/UserProvider";

export const App = () => {
  return (
    <Router>
      <UserProvider>
        <ThemeProvider>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/mes-polices-locales">
                <LocalFontsTable />
              </Route>
              <Route path="/mes-polices-en-ligne">
                <OnlineFontsTable />
              </Route>
            </Switch>
          </div>
        </ThemeProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
