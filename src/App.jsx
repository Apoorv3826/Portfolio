import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedAdmin from "./components/admin/ProtectedAdmin";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedAdmin>
                            <AdminDashboard />
                        </ProtectedAdmin>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
