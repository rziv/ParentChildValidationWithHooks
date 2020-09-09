import React from "react";
import "./App.css";
import { Item } from "./Item"
import { Person } from "./Person";

function App() {
  const validatorsSubjects = {
    person: "Person",
    item: "Item",
  };
  const validators = {};
  const registerValidation = (subject, validator) => {
    console.log("register: " + subject);
    validators[subject] = validator;
  };

  const submit = function () {
    alert("All valid! Submiting...");
  };

  const handleSubmit = function () {
    if (validators[validatorsSubjects.person]()) {      
      if (validators[validatorsSubjects.item]()) {
        submit();
      }
    }
  };

  return (
    <div className="app">
      <Person registerValidation={registerValidation} />
      <Item registerValidation={registerValidation} />
      <div>
        <h5>Parent</h5>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
export default App;
