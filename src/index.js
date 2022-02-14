import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache()
});

const GET_COUNTRIES = gql`
query SharedUSandFR {
  countrySharingUS: country(code: "US") {
    name
    continent {
      countries {
        name
        native
      }
    }
  }
}
`;

function GetCountries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countries, setCountries] = useState([]);
  useEffect(()=>{
      if(data) {
        console.log("data",data);
        console.log("data countrySharingUS continent countries",data.countrySharingUS.continent.countries );
        let tempCountries = data.countrySharingUS.continent.countries;
        setCountries(tempCountries);
      }
  },[data]);
  return (
    <div>
     <h2>React GraphQL Queries</h2>
     <h4>Countries Sharing continent with USA</h4>
     {<div>{countries.map((country)=>{return(<h1 key={country.name}>{country.name}</h1>)})}</div>}
  </div>
  );
}

function App() {
 
  return (
    <ApolloProvider client={client}>
      <GetCountries />
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
