import React from "react";
import { Link } from "react-router-dom";

export default function SystemChannelSelection({ name, selected, channelLink, Icon }) {
    return (
        <Link href={`/${channelLink}`}>
            <button
                className={`rounded-sm flex ml-2 p-2 my-0.5 w-full items-center hover:bg-grey-hover gap-3 ${
                    selected ? "bg-grey-hover text-grey-secondary " : "text-gray-400 "
                }`}>
                <div className="aspect-square h-8 rounded-full">{Icon}</div>
                <span>{name}</span>
            </button>
        </Link>
    );
}
