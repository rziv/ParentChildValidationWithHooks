import React, { useState } from "react";
import "./App.css";
import { Item } from "./Item";
import { Person } from "./Person";
const validators = {};

function App() {
  const validatorsSubjects = {
    person: "Person",
    item: "Item",
  };
  const [showItem, setShowItem] = useState(true);  
  const registerValidation = (subject, validator) => {    
    
    validators[subject] = validator;  
   
  };

  const submit = function () {
    alert("All valid! Submiting...");
  };

  const handleSubmit = async function () {
    if (await validators[validatorsSubjects.person]()) {
      if (await validators[validatorsSubjects.item]()) {
        submit();
      }
    }
  };

  return (
    <div className="app">
      <div>
        <label htmlFor="showItem">Show Item</label>
        <input
          id="showItem"
          type="checkbox"
          checked={showItem}
          onChange={(event) => setShowItem(event.target.checked)}
        />
      </div>

      <Person registerValidation={registerValidation} />
      {showItem && <Item registerValidation={registerValidation} />}
      <div>
        <h5>Parent</h5>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
export default App;
