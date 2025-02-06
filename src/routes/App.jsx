import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
import { useStore, useAuthStore } from "../config/stores";

import MainLayout from "../layouts/mobile/main-layout";
import LoadingPage from "../pages/loading";

const Home = React.lazy(() => import("../pages/home"));

const LoginPage = React.lazy(() => import("../pages/auth/login"));

function DynamicLayout({ children }) {
    const location = useLocation();
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    React.useEffect(() => {
        if (location.pathname.startsWith("/channel")) {
            if (!isAuthenticated) {
                window.location.href = "/login";
                return null;
            }
        }
    }, [location.pathname]);

    if (location.pathname.startsWith("/channel")) {
        let channelType = "private";
        if (location.pathname.startsWith("/group") && groupId) {
            channelType = "group";
        }
        return <MainLayout channelType={channelType}>{children}</MainLayout>;
    }
    return <>{children}</>;
}

const ResponsiveLayout = ({ children }) => {
    const { isMobile, setMobile } = useStore();

    React.useEffect(() => {
        if (window.innerWidth <= 600) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    });
    if (isMobile) {
        return;
    }
};

export default function App() {
    return (
        <Router>
            <DynamicLayout>
                <React.Suspense fallback={<LoadingPage />}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Route>
                        <Route path="/channel/:groupId" element={<Home />} />
                    </Routes>
                </React.Suspense>
            </DynamicLayout>
        </Router>
    );
}
