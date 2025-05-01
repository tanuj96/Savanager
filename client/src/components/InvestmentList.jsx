import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvestmentAsync,
  fetchInvestments,
  fetchInvestmentTypes,
  removeInvestmentAsync,
} from "../store";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipLoader } from "react-spinners";

const InvestmentList = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [investmentType, setInvestmentType] = useState("");

  const dispatch = useDispatch();
  const investments = useSelector((state) => state.investments.investments);
  const investmentTypes = useSelector((state) => state.investmentTypes.types);
  const status = useSelector((state) => state.investments.status);
  const typesStatus = useSelector((state) => state.investmentTypes.status);
  const error = useSelector((state) => state.investments.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInvestments());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (typesStatus === "idle") {
      dispatch(fetchInvestmentTypes());
    }
  }, [typesStatus, dispatch]);

  const handleAddInvestment = () => {
    if (!name || !amount || !investmentType) {
      toast.error("Please fill all fields");
      return;
    }
    const newInvestment = { name, type: investmentType, amount: Number(amount) };
    dispatch(addInvestmentAsync(newInvestment));

    toast.success("Investment Added!");
    setName("");
    setAmount("");
    setInvestmentType("");
  };

  const handleRemoveInvestment = (id) => {
    dispatch(removeInvestmentAsync(id));
    toast.success("Investment Removed!");
  };

  if (status === "loading" || typesStatus === "loading") {
    return (
      <div className="flex items-center justify-center h-48">
        <ClipLoader size={40} color={"#3498db"} />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 bg-red-100 p-4 rounded-md text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">💸 Investment List</h2>

      <Input
        type="text"
        placeholder="Investment Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Investment Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Select
        value={investmentType}
        onValueChange={(value) => setInvestmentType(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Investment Type" />
        </SelectTrigger>
        <SelectContent>
          {investmentTypes.map((type) => (
            <SelectItem key={type.id} value={type.name}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={handleAddInvestment}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
        >
          Add Investment
        </Button>
      </motion.div>

      <ul className="space-y-4 mt-6">
        <AnimatePresence>
          {investments.map((investment) => (
            <motion.li
              key={investment.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-md"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div>
                <p className="font-bold">{investment.name}</p>
                <p>${investment.amount}</p>
                <p className="text-gray-500 text-sm">{investment.type}</p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={() => handleRemoveInvestment(investment.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg"
                >
                  Remove
                </Button>
              </motion.div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default InvestmentList;
