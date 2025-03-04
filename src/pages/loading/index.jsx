import React from "react";

export default function LoadingPage() {
    return (
        <div
            className="h-screen fixed top-0 left-0 w-screen overflow-hidden flex
            justify-center items-center bg-dark-primary opacity-80">
            <div className="w-[500px] h-[300px] rounded-lg flex bg-white"></div>
        </div>
    );
}
