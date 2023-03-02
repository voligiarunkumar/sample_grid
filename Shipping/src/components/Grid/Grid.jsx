import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./grid.css";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
  IntlService,
} from "@progress/kendo-react-intl";
import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";
import numbers from "cldr-numbers-full/main/es/numbers.json";
import currencies from "cldr-numbers-full/main/es/currencies.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FloatingLabel } from "@progress/kendo-react-labels";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  currencies,
  caGregorian,
  dateFields,
  timeZoneNames
);

import { esMessages } from "./es.js";
loadMessages(esMessages, "es-ES");
import Axios from "axios";
import { process } from "@progress/kendo-data-query";
import { orders } from "./order.js";
import { treeToFlat } from "@progress/kendo-react-treelist";
const DATE_FORMAT = "yyyy-mm-dd hh:mm:ss.SSS";
const intl = new IntlService("en");
orders.forEach((o) => {
  o.orderDate = intl.parseDate(
    o.orderDate ? o.orderDate : "20/20/2020",
    DATE_FORMAT
  );
  o.shippedDate = o.shippedDate
    ? undefined
    : intl.parseDate(
        o.shippedDate ? o.orderDate.toString() : "20/20/2020",
        DATE_FORMAT
      );
});
const DetailComponent = (props) => {
  const dataItem = props.dataItem;
  return (
    <div
      style={{
        marginLeft: "500px",
      }}
    >
      <Grid style={{}} data={dataItem.details} />
    </div>
  );
};
const Grids = () => {
  const locales = [
    {
      language: "All DMV States",
      locale: "en",
    },
    {
      language: "AZ-MESA",
      locale: "es",
    },
  ];
  const [dataState, setDataState] = React.useState(null);
  const [currentLocale, setCurrentLocale] = React.useState(locales[0]);
  // const [dataResult, setDataResult] = React.useState(
  //   process(orders, dataState)
  // );
  const dataStateChange = (event) => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };
  const expandChange = (event) => {
    const isExpanded =
      event.dataItem.expanded === undefined
        ? event.dataItem.aggregates
        : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;
    setDataResult({
      ...dataResult,
    });
  };
  let _pdfExport;
  const exportExcel = () => {
    _export.save();
  };
  let _export;
  const exportPDF = () => {
    _pdfExport.save();
  };
  const getjoke = () => {
    Axios.get("https://fs-tnr-tps-dev-api.azurewebsites.net/").then(
      (response) => {
        console.log(response);
      }
    );
  };
  const defaultValue = new Date(2000, 2, 10, 13, 30, 0);
  const CustomerId = "Enter Customer";
  const userId = "EnterUserName";
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  const [value, setValue] = React.useState("All Selected(4)");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const DocumentTye = [
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "2X-Large",
  ];
  const [values, setValues] = React.useState("All Document Types");
  const SelectDocument = (event) => {
    setValues(event.target.value);
  };
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [ordersafter, setfilterdata] = React.useState(orders);
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    console.log(event.target.value);
  };
  const filterData = () => {
    const filteredData = filterBy(ordersafter, {
      logic: "and",
      filters: [
        {
          field: "ReceivedDate",
          operator: "gte",
          value: startDate,
        },
        {
          field: "ReceivedDate",
          operator: "lte",
          value: endDate,
        },
      ],
    });
    setfilterdata(filteredData);
    console.log(filteredData);
  };
  const [categoryFilter, setCategoryFilter] = useState("");
  const categories = ["HERTZ"];
  const handleFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };
  const filteredData1 =
    categoryFilter === ""
      ? orders
      : orders.filter((item) => item.Customer === categoryFilter);
  console.log(filteredData1);

  return (
    <LocalizationProvider language={currentLocale.language}>
      <div
        style={{
          marginLeft: "200px",
        }}
      >
        {/* grid is hereoadsjkblakdjbckha slkdhc kahsd laclhd czahl chdhk  */}
        <Grid
          style={{
            height: "800px",
          }}
          sortable={true}
          onExpandChange={expandChange}
          pageable={{
            buttonCount: 4,
            pageSizes: true,
          }}
          data={filteredData1}
          {...dataState}
          onDataStateChange={dataStateChange}
        >
          <GridToolbar>
            <h2 style={{ fontFamily: "serif" }}>
            <i class="fa fa-book" style={{fontSize:'24px'}}></i>
              View Shipments
            </h2>
          </GridToolbar>
          <GridToolbar style={{ marginBottom: "0px", marginTop: "0px" }}>
            {/* ----------------------------thjsdhabkldshblkjabldkbakshdblkbkasdblkbasdhbkahbsdkb */}
            <b>FromDate</b> : &nbsp;&nbsp;&nbsp;
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              format="YYYY-MM-DDTHH:mm:ss.sssssss
        "
            />
            <b>ToDate</b>: &nbsp;&nbsp;&nbsp;
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              format="YYYY-MM-DDTHH:mm:ss.sssssss
        "
            />
            <DropDownList
              style={{ width: "180px" }}
              value={currentLocale}
              textField="language"
              onChange={(e) => {
                setCurrentLocale(e.target.value);
              }}
              data={locales}
            />
            &nbsp;&nbsp;&nbsp;
            <DropDownList
              style={{ width: "180px" }}
              value={currentLocale}
              textField="language"
              onChange={(e) => {
                setCurrentLocale(e.target.value);
              }}
              data={locales}
            />
            &nbsp;&nbsp;&nbsp;
            <FloatingLabel label={" Customer"}>
              <Input
                id={CustomerId}
                style={{ width: "220px", marginBottom: "20px" }}
              />
            </FloatingLabel>
            <FloatingLabel label={"UserName"}>
              <Input
                id={userId}
                style={{
                  width: "220px",
                  marginBottom: "20px",
                  marginTop: "0px",
                }}
              />
            </FloatingLabel>
            <FloatingLabel label={"Enter Tracking Number"}>
              <Input
                id={userId}
                style={{
                  width: "220px",
                  marginBottom: "20px",
                  marginRight: "1000px",
                  marginTop: "0px",
                }}
              />
            </FloatingLabel>
            <button
              title="Export to Excel"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-success"
              onClick={filterData}
            >
              <i class="fa fa-search" />
              Search
            </button>
            &nbsp;
            <button
              style={{ width: "80px" }}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary"
              onClick={exportPDF}
            >
              X Clear
            </button>
          </GridToolbar>
          {/* <GridToolbar style={{marginBottom:'0px',marginTop:'0px'}} >
               
                      </GridToolbar> */}
          <GridToolbar style={{ marginBottom: "0px", marginTop: "0px" }}>
            
            <button
              style={{ width: "160px" }}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary"
              onClick={exportPDF}
            >
              <i class="fas fa-file-export" />
              Export
            </button>
       </GridToolbar>
          <GridColumn field="DataReceived" width="200px" />
          <GridColumn field="Location" width="200px" />
          <GridColumn field="User" width="200px" />
          <GridColumn field="Courier" width="200px" />
          <GridColumn field="Customer" width="250px" />
          <GridColumn field="TrackingNumber" width="200px" />
          <GridColumn field="Documents" width="200px" />
        </Grid>

        <GridPDFExport
          ref={(element) => {
            _pdfExport = element;
          }}
          margin="1cm"
        >
          {/* {<Grid data={process(orders, {
            skip: dataState.skip,
            take: dataState.take
          })}>
                    <GridColumn field="customerID" width="200px" />
                    <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" className='grid-column' />
                    <GridColumn field="shipName" width="280px" />
                    <GridColumn field="freight" filter="numeric" width="200px" />
                    <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="employeeID" filter="numeric" width="200px" />
                    <GridColumn locked={true} field="orderID" filterable={false} title="ID" width="90px" />
                  </Grid>} */}
        </GridPDFExport>
      </div>
    </LocalizationProvider>
  );
};
export default Grids;
