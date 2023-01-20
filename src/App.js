import React from "react";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route
          path="/bucket"
          component={() => {
            window.location.replace(
              "https://docs.google.com/document/d/13rxHCHBCu7QsDuK08VOnPU5sm9MnOvTNv2sfII2zHgw/edit"
            );
            return null;
          }}
        />
      </Switch>
    </>
  );
}

export default App;
