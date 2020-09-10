import React, { useState, useEffect } from "react";

export const Person = function ({ registerValidation }) {
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");

  const validate = async function () {
    console.log("validating person...");
    console.log("firstName: " + firstName);
    console.log("age: " + age);
    let valid = true;
    if (!!firstName && firstName.length < 5) {
      valid = false;
      console.log("firstName should be longer!");
    }
    if (!!age && (age < 0 || age > 120)) {
      valid = false;
      console.log("invalid age!");
    }
    return valid;
  };

  const registerCurrentValidation = registerValidation.bind(
    null,
    "Person",
    validate
  );

  useEffect(() => {
    registerCurrentValidation();
  }, [registerCurrentValidation]);

  return (
    <div>
      <div>
        <h5>Person (child 1)</h5>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          className="input"
          value={firstName}
          placeholder="longer than 5 letters"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>        
        <label htmlFor="age">Age</label>
        <input
          id="age"
          placeholder="0-120"
          type="text"
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
    </div>
  );
};
