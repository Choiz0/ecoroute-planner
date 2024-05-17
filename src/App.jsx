// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Mypage from "./pages/Mypage";
import Home from "./pages/Homepage";
import Error from "./pages/Errorpage";
import Direction from "./component/Direction";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { AuthProvider } from "./context/authContext";
import UserHome from "./pages/UserHome";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mypage" element={<Mypage />} />
            <Route
              path="searchResult/:origin/:destination"
              element={<Direction />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userhome" element={<UserHome />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
