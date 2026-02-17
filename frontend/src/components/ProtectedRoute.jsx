import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="app">
                <div className="auth">
                    <div className="auth__card" style={{ textAlign: "center" }}>
                        <p style={{ margin: 0, fontWeight: 700 }}>Loading…</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
