// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Mypage from "./pages/Mypage";
import Home from "./pages/Homepage";
import Error from "./pages/Errorpage";
import Direction from "./component/Direction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mypage" element={<Mypage />} />
          <Route
            path="searchResult/:origin/:destination"
            element={<Direction />}
          />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
