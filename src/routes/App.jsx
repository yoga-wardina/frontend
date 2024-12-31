import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("../pages/home"));

export default function App() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </React.Suspense>
    );
}
