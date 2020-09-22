import React, { useState, useEffect } from "react";
import { subjects } from "./subjects";

export const Item = function ({
  registerValidation,
  registerData,
  dataFetcher,
}) {
  const registeredData = dataFetcher();

  const [description, setDescription] = useState(
    registeredData.description || ""
  );
  const [price, setPrice] = useState(registeredData.price || "");

  const validate = async function () {
    console.log("validating item...");
    console.log("description: " + description);
    console.log("price: " + price);
    let valid = true;
    if (!!description && !/^[a-zA-Z]+$/.test("description")) {
      valid = false;
      console.log("description should contain english letters only!");
    }
    if (!Number.isInteger(Number(price)) || Number(price) <= 0) {
      valid = false;
      console.log("price must be a positive number");
    }
    return valid;
  };

  const getData = () => ({ description, price });

  const registerCurrentValidation = registerValidation.bind(
    null,
    subjects.item,
    validate
  );

  const registerCurrentData = registerData.bind(null, subjects.item, getData);

  useEffect(() => {
    registerCurrentData();
    registerCurrentValidation();
  }, [registerCurrentData, registerCurrentValidation]);

  return (
    <div>
      <h5>Item (Child 2)</h5>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          className="input"
          placeholder="English only"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          className="input"
          placeholder="positive number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </div>
  );
};
