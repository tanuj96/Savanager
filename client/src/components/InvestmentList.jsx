import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInvestment, removeInvestment } from "../store";

const InvestmentList = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const investments = useSelector((state) => state.investments.investments);
  const dispatch = useDispatch();

  const handleAddInvestment = () => {
    if (!name || !amount) {
      alert("Please enter both name and input");
      return;
    }

    const newInvestment = { name, amount: Number(amount) };
    dispatch(addInvestment(newInvestment));

    setName("");
    setAmount("");
  };

  const handleRemoveInvestment = (index) => {
    dispatch(removeInvestment(index));
  };

  return (
    <div>
      <h2>Investment List</h2>

      <input
        type="text"
        placeholder="Investment Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Investment Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleAddInvestment}>Add Investment</button>
      <ul>
        {investments.map((investment, index) => (
          <li key={index}>
            {investment.name} - ${investment.amount}
            <button onClick={() => handleRemoveInvestment(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestmentList;
