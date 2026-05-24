import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ApiProvider } from "./context/ApiContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import BackendBanner from "./components/common/BackendBanner.jsx";
import Loader from "./components/common/Loader.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Emergency from "./pages/Emergency.jsx";
import Schemes from "./pages/Schemes.jsx";
import Services from "./pages/Services.jsx";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <BackendBanner />
      <Navbar />
      <main className={isHome ? "flex-1" : "flex-1 bg-slate-50 dark:bg-slate-950"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <PrivateRoute>
                <Emergency />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ApiProvider>
          <AuthProvider>
            <AppShell />
          </AuthProvider>
        </ApiProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
