import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/bucket"
          component={() => {
            window.location.replace(
              "https://docs.google.com/document/d/13rxHCHBCu7QsDuK08VOnPU5sm9MnOvTNv2sfII2zHgw/edit"
            );
            return null;
          }}
        />
      </Routes>
    </>
  );
}

export default App;
