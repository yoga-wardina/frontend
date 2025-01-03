import React, { useState, useMemo, useEffect } from "react";
import { UsersIcon, SmileIcon, CogIcon } from "lucide-react";
import { HOST, headers } from "../config/config";
import axios from "axios";

import ChannelSelection from "../components/channel-selection";
import SystemChannelSelection from "../components/system-channel-selection";
export default function MainLayout({ children, select, channelType }) {
    const [channels, setChannels] = useState({});
    const [showInfo, setShowInfo] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState("");

    const tempIconsLocation = "/assets/temp/";
    const labelStyle = "h-7 aspect-square rounded-full object-contain";

    const fetchChannels = async () => {
        try {
            const response = await axios.get(HOST);
            if (response["status"] === 200) {
                console.log(response["data"]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (channelType === "private") {
            fetchChannels();
        }
        if (select !== null) {
            setSelectedChannel(select);
        }
    }, [select, channelType]);

    const menu = useMemo(
        () => [
            {
                Label: "Friends",
                Icon: <UsersIcon className={labelStyle} />,
                Link: "friends",
            },
            {
                Label: "Emotes",
                Icon: <SmileIcon className={labelStyle} />,
                Link: "emotes",
            },
            {
                Label: "Settings",
                Icon: <CogIcon className={labelStyle} />,
                Link: "settings",
            },
        ],
        [labelStyle]
    );

    return (
        <div>
            <div className="group-selector"></div>
            <div className="channel-selector px-2">
                <div className="w-full flex items-center h-12 border-b border-gray-800">
                    <input
                        className="w-full focu:outlie-one border-transparent focus:ring-0 
                        focus:border-transparent focus:border-b-blue-500
                        text-slate-300
                        bg-dark-primary p-1 rounded text-sm"
                        type="text"
                        placeholder="Search Conversations"
                    />
                </div>
                d
                {channelType === "private" && (
                    <>
                        {menu.map((item, index) => (
                            <SystemChannelSelection
                                key={index}
                                name={item.Label}
                                selected={item.Label === select ? true : false}
                                channelLink={item.Link}
                                Icon={item.Icon}
                            />
                        ))}
                        <div className="uppercase text-xs text-gray-400 flex mt-4">
                            <p>direct messages</p>
                        </div>
                        {channels.length > 0 &&
                            channels.map((item, index) => (
                                <ChannelSelection
                                    key={index}
                                    name={item.users[0].name}
                                    selected={item.users[0].name === select ? true : false}
                                    channelLink={`chat/` + item.id}
                                    Icon={<img src={tempIconsLocation + item.users[0].img} alt="logo" />}
                                />
                            ))}
                    </>
                )}
            </div>
            <div className="channel-header flex items-center px-4 justify-between border-b border-gray-800">
                <p>{selectedChannel}</p>
                <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Hide" : "Show"}</button>
            </div>
            {showInfo && <div className="channel-info">cock</div>}
            <div className={`content p-1 px-4 ${showInfo ? "colapse" : ""}`}>{children}</div>
        </div>
    );
}
