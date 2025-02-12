import React, { useState } from "react";
import { useStore } from "../../config/stores";

export const ChatComponent = () => {};
export const ChannelSelection = ({ children, trigger }) => {
    return (
        <section className={`w-full h-screen overflow-x-hidden bg-dark-3`}>
            <div className="relative h-screen w-full">
                <menu className="flex py-3 items-center absolute top-0 left-0 flex-col gap-2 bg-dark-3 w-20 h-[calc(100vh-72px)]">
                    <li>
                        <button className="w-[60px] aspect-square rounded-full bg-dark-primary"></button>
                    </li>
                </menu>
                <section className="w-[calc(100%-80px)] absolute left-20 top-[10px] h-[calc(100vh-82px)] bg-dark-2 rounded-tl-[2rem]"></section>
                <nav className="flex absolute bottom-0 left-0 w-full h-[72px] bg-dark-primary"></nav>
            </div>
        </section>
    );
};
export const DetailConmponent = () => {};

export default function MainLayout({ children, channelType }) {
    const [startX, setStartX] = useState(0);
    const [isSwiped, setIsSwiped] = useState(false);
    const { selectedView, setSelectedView } = useStore();

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiped(false);
    };
    const transitions = {
        chat: { left: "detail", right: "channel" },
        channel: { left: "chat" },
        detail: { right: "chat" },
    };

    const select = (direction) => {
        if (transitions[selectedView] && transitions[selectedView][direction]) {
            setSelectedView(transitions[selectedView][direction]);
        }
    };
    React.useEffect(() => {
        console.log(selectedView);
    }, [selectedView]);
    React.useEffect(() => {
        setSelectedView("channel");
    }, []);

    const handleTouchMove = (e) => {
        if (isSwiped) return;

        const currentX = e.touches[0].clientX;
        const difference = currentX - startX;

        const threshold = 50;

        if (Math.abs(difference) > threshold) {
            if (difference > 0) {
                select("right");
            } else {
                select("left");
            }
            setIsSwiped(true);
        }
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => {
                setIsSwiped(false);
                setStartX(0);
            }}
            className="w-screen h-screen">
            <nav className=""></nav>
            <ChannelSelection trigger={selectedView} />
            <section
                className={`bg-dark-primary w-full h-svh overflow-y-auto overflow-x-hidden p-6 ${
                    selectedView === "chat" ? "block" : "hidden"
                }`}>
                {children}
            </section>
        </div>
    );
}
