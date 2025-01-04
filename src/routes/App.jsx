import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, createCookieSessionStorage } from "react-router-dom";

import MainLayout from "../layouts/mainLayout";

const Home = React.lazy(() => import("../pages/home"));
const LoginPage = React.lazy(() => import("../pages/auth/login"));

function DynamicLayout({ children }) {
    const location = useLocation();
    const { groupId } = useParams();

    if (location.pathname.startsWith("/login") || location.pathname.startsWith("/register")) {
        return <>{children}</>;
    }
    // Determine channelType based on the route
    let channelType = "private"; // Default channelType
    if (location.pathname.startsWith("/group") && groupId) {
        channelType = "group";
    }

    return <MainLayout channelType={channelType}>{children}</MainLayout>;
}
function PrivateRouter() {}
export default function App() {
    return (
        <Router>
            <DynamicLayout>
                <React.Suspense allback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Route>
                    </Routes>
                </React.Suspense>
            </DynamicLayout>
        </Router>
    );
}
