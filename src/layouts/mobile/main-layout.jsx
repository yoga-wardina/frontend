import React from "react";

const ChatComponent = () => {};
const ChannelSelection = () => {};
const DetailConmponent = () => {};
export default function MainLayout({ children, select, channelType }) {
    const [swipeDirection, setSwipeDirection] = React.useState("");
    const handleTouchStart = (prop) => {
        setSwipeDirection(prop.touches[0].clientX - prop.changedTouches[0].clientX);
    };
    const handleTouchEnd = (prop) => {
        if (Math.abs(prop.changedTouches[0].clientX - swipeDirection) > 50) {
            if (prop.changedTouches[0].clientX - swipeDirection > 0) {
                select("channel");
            } else {
                select("detail");
            }
        }
        setSwipeDirection(0);
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={(prop) => {
                if (Math.abs(prop.changedTouches[0].clientX - swipeDirection) > 50) {
                    if (prop.changedTouches[0].clientX - swipeDirection > 0) {
                        select("channel");
                    } else {
                        select("detail");
                    }
                }
            }}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={(prop) => {
                setSwipeDirection(0);
            }}>
            <nav className=""></nav>
            <section className="bg-dark-primary w-full h-svh p-5">{children}</section>
        </div>
    );
}
