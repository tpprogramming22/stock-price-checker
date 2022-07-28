import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Fetcher = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [currentTyped, setCurrentTyped] = useState("");
  const [retrievedData, setRetrievedData] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (selectedStock) {
      const options = {
        method: "GET",
        url: `https://latest-stock-price1.p.rapidapi.com/stock/${selectedStock}`,
        headers: {
          "X-RapidAPI-Key":
            `${process.env.REACT_APP_RAPID_API_KEY}`,
          "X-RapidAPI-Host": "latest-stock-price1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          if (response.data != "Stock not found.") {
            setRetrievedData(`$${response.data}`);
            setLoading(false);
          } else {
            setRetrievedData(response.data);
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.error(error);
          setRetrievedData("");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [selectedStock, refresh]);

  return (
    <div className=" bg-gray-50 m-auto p-10 shadow-2xl">
      <div className="flex items-center justify-center p-10 rounded-lg">
        <label>
          <input
            type="text"
            name="name"
            placeholder="Enter ticker symbol here"
            onChange={(e) => setCurrentTyped(e.target.value)}
            className="bg-gray-200 p-3 rounded-md"
          />
        </label>
      </div>

      <div className="flex bg-gray-400 w-[200px] justify-center m-auto shadow-lg cursor-pointer rounded-lg">
        <button
          onClick={() => {
            setSelectedStock(currentTyped);
            setLoading(true);
            setRefresh(refresh + 1);
          }}
          className="rounded-lg text-white"
        >
          Submit
        </button>
      </div>

      <div className="flex justify-center m-10">
        <h1>Live Price:</h1>
      </div>
      {retrievedData && (
        <div className="flex justify-center m-10">
          <span className="text-2xl">{retrievedData}</span>
        </div>
      )}
      <div className="flex justify-center">
        {loading && <AiOutlineLoading className="animate-spin text-3xl" />}
      </div>

      <div className="flex justify-center m-auto bg-gray-400 w-[200px] rounded-lg cursor-pointer">
        {!loading && (
          <button
            onClick={() => {
              setRefresh(refresh + 1);
              setLoading(true);
            }}
            className="text-white"
          >
            Refresh!
          </button>
        )}
      </div>
    </div>
  );
};

export default Fetcher;
