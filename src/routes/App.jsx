import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from "react-router-dom";
import axios from "axios";

import MainLayout from "../layouts/mainLayout";
import LoadingPage from "../pages/loading";

const Home = React.lazy(() => import("../pages/home"));

const LoginPage = React.lazy(() => import("../pages/auth/login"));

function DynamicLayout({ children }) {
    const location = useLocation();

    if (location.pathname.startsWith("/channel")) {
        const { groupId } = useParams();
        let channelType = "private"; // Default channelType
        if (location.pathname.startsWith("/group") && groupId) {
            channelType = "group";
        }
        return <MainLayout channelType={channelType}>{children}</MainLayout>;
    }
    return <>{children}</>;
}
export default function App() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const authValidation = async () => {
        const token = localStorage.getItem("token");
        try {
            if (!token) {
                window.location.href = "/login";
            }
            const response = await axios.get("https://api.example.com/user/validate", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        } catch (error) {
            console.error(error);
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    };
    React.useEffect(() => {
        if (location.pathname.startsWith("/channel")) {
            authValidation();
        }
    }, [location]);
    return (
        <Router>
            <DynamicLayout>
                <React.Suspense fallback={<LoadingPage />}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Route>
                        <Route path="/channel">
                            <Route path="/:groupId" element={<Home />} />
                        </Route>
                    </Routes>
                </React.Suspense>
            </DynamicLayout>
        </Router>
    );
}
