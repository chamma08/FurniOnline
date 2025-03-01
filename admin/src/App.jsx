import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import List from "./pages/List";

const App = () => {
  return (
    <main>
      <ToastContainer />
      <div className="bg-primary">
        <div className="mx-auto max-w-[1200px] flex flex-col sm:flex-row">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default App;
