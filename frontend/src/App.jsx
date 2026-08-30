import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";


/* =========================================================
   CHECK AUTHENTICATION
========================================================= */

const isLoggedIn = () => {
  const token = localStorage.getItem("access_token");

  return Boolean(token);
};


/* =========================================================
   PROTECTED ROUTE
   Dashboard / Analytics / Settings require login
========================================================= */

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


/* =========================================================
   APP
========================================================= */

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            START PAGE

            Always start from Login when opening:
            http://localhost:5173/
        ================================================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />


        {/* =================================================
            LOGIN

            IMPORTANT:
            We intentionally DO NOT use PublicRoute here.

            This means an existing token will NOT prevent
            the Login page from being displayed.
        ================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =================================================
            DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ANALYTICS
        ================================================== */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            SETTINGS
        ================================================== */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ANY UNKNOWN URL
        ================================================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}