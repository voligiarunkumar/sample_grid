import React from "react";
import "./App.scss";
import './App.css';
import './index.css';
import '@progress/kendo-theme-default/dist/all.css';
import ShippingDataPage from "./components/Pages/ShippingDataPage";

const App = () => {
  return (
    <div className="App">
      <ShippingDataPage/>
    </div>
  );
};

export default App;
