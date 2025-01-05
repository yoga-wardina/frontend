import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from "react-router-dom";

import MainLayout from "../layouts/mainLayout";

const Home = React.lazy(() => import("../pages/home"));
const LoadingPage = React.lazy(() => import("../pages/loading"));
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
                <Routes>
                    <Route path="/">
                        <React.Suspense fallback={<div>Loading . . . </div>}>
                            <Route index element={<Home />} />
                        </React.Suspense>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </DynamicLayout>
        </Router>
    );
}
