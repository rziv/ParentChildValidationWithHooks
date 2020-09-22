import React from "react";
import "./App.css";
import { Item } from "./Item";
import { Person } from "./Person";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { subjects } from "./subjects";
import { stateReaderServices  } from "./stateReaderServices";

const myAppStateReaderServices = new stateReaderServices();

function App() {
  const registerValidation = (subject, validator) => {
    myAppStateReaderServices.addValidation(subject, validator);
  };

  const registerData = (subject, dataFetcher) => {
    myAppStateReaderServices.addDataFetcher(subject, dataFetcher);
  };

  const submit = function () {
    alert("All valid! Submiting...");
  };

  const handleSubmit = async function () {
    if (
      myAppStateReaderServices.isRegisteredSubject(subjects.person) &&
      myAppStateReaderServices.isRegisteredSubject(subjects.item)
    ) {
      if (await myAppStateReaderServices.validate(subjects.person)) {
        if (await myAppStateReaderServices.validate(subjects.item)) {
          submit();
        }
      }
    }
  };

  const getData = function (subject) {
    return myAppStateReaderServices.getData(subject);
  };

  return (
    <Router>
      <div>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Person</Link>
            </li>
            <li>
              <Link to="/dashboard">Item</Link>
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <h5>Parent</h5>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/about">
            <Person
              dataFetcher={getData.bind(null, "person")}
              registerValidation={registerValidation}
              registerData={registerData}
            />
          </Route>
          <Route path="/dashboard">
            <Item
              dataFetcher={getData.bind(null, "item")}
              registerValidation={registerValidation}
              registerData={registerData}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
