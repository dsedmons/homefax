import logo from "./logo.svg";
import "./App.css";
import { useEffect, useCallback, useState } from "react";

function App() {
  const [data, setData] = useState();

  const url =
    "https://fa-homefax-ea2-dev-001.azurewebsites.net/api/HomeInformationByName";
  const options = {
    method: "GET",
    headers: {},
  };
  const getData = async () => {
    return fetch(url, options)
      .then((response) => response.json())
      //.then((data) => console.log(data));
  };

  const fetchData = useCallback(async () => {
    getData().then((rawData) => {
      setData(rawData);
      //console.log(rawData)
    });
  }, [getData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Damon & Rob</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {data && <div>{data[0].address_1}</div>}
        {/* <div>{data && data[0].address_1}</div> */}
      </header>
    </div>
  );
}

export default App;
