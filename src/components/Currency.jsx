import { useState } from "react";
import { IoIosSwap } from "react-icons/io";

const Currency = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = () => {
    if (!amount) return;
    const fetchCurrency = async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]);
    };
    if (fromCurrency === toCurrency) return setConvertedAmount(amount);
    fetchCurrency();
  };

  // useEffect(() => {
  //   const fetchCurrency = async () => {
  //     const res = await fetch(
  //       `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     setConvertedAmount(data.rates[toCurrency]);
  //   };
  //   if (fromCurrency === toCurrency) return setConvertedAmount(amount);
  //   fetchCurrency();
  // }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="lg:w-[30%] md:w-[60%] sm:w-[80%] w-[90%] shadow-md px-8 py-5 border-2  rounded-md bg-white">
      <h2 className="text-2xl font-semibold text-center text-slate-900">
        Currency Converter
      </h2>
      <div className="flex flex-col mt-6 pb-1">
        <label htmlFor="amount" className="font-medium text-slate-900">
          Enter amount
        </label>
        <input
          type="text"
          placeholder="Enter amount..."
          className="border-2 border-slate-300 p-2 rounded-md mt-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="py-3 flex">
        <div className="flex-1">
          <div className="flex flex-col">
            <label htmlFor="from" className="font-medium text-slate-900">
              From
            </label>
            <select
              className="border-slate-300 border-2 p-2 rounded-md mt-2"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
        <div className="flex w-[15%] p-2 items-center justify-center cursor-pointer">
          <IoIosSwap className="text-2xl mt-8" onClick={handleSwap} />
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <label htmlFor="from" className="font-medium text-slate-900">
              To
            </label>
            <select
              className="border-slate-300 border-2 p-2 rounded-md mt-2"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[14px] font-medium text-slate-900">
          {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
        </p>
      </div>
      <div className="my-7">
        <button
          className="px-10 py-3 bg-indigo-600 text-white rounded-md w-full transition-all duration-150 ease-in hover:bg-indigo-700"
          onClick={handleAmountChange}
        >
          Get Exchange Rate
        </button>
      </div>
    </div>
  );
};

export default Currency;
