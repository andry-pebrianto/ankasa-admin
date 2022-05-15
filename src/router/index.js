import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import NotFound from "../pages/NotFound";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  }
  return <Navigate to="/" />;
}

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Products />} />
        </Route>
        <Route path="/add-product">
          <Route
            index
            element={
              <PublicRoute>
                <AddProduct />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="/edit-product/:id">
          <Route
            index
            element={
              <PublicRoute>
                <EditProduct />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
