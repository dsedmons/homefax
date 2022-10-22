import logo from "./logo.svg";
import "./App.css";
import { useEffect, useCallback, useState } from "react";
import { getHomeInformationUrl } from "./constants";

function App() {
  //React components has a built-in state object - which is why we're calling useState on line 10
  //The state object is where you store property values that belongs to the component.
  //When the state object changes, the component re-renders.
  const [data, setData] = useState();

  // getHomeFaxData is the method that contains our API call to getHomeInformation endpoint
  // we wrap it in a useCallBack, so that when the component rerenders (for instance, if someone refreshed the page)
  // the returned value won't change
  // check out this document if you want to learn more about that: https://reactjs.org/docs/hooks-reference.html#usecallback
  const getHomeInformation = useCallback(async () => {
    return fetch(getHomeInformationUrl)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // anything inside of a useEffect function body (after the curly braces), runs when the component renders
  // so since our entire website is contained within App.js
  // everytime that the website renders, getHomeInformation() is called
  // because it is inside of a useEffect
  useEffect(() => {
    getHomeInformation();
  }, [getHomeInformation]);

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
      </header>
    </div>
  );
}

export default App;
