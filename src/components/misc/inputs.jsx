import React from "react";
import { useInputStore } from "../../config/stores";

export const emailRgex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRgex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


export const RequiredTextInput = ({ label, name, error, type }) => {
    const { inputs, setInput } = useInputStore();
    return (
        <div className=" flex flex-col gap-1">
            <label htmlFor={name}>{label} <b className="text-red-600">*</b></label>
            <input 
             id={name}
             name={name}
             onChange={(e)=>setInput(inputs, name, e.target.value)}
             value={inputs[name]} 
             type={type || "text"}
             className="focus:ring-0 text-sm bg-dark-3 px-3 focus:outline-0 h-10"/>
            {error && <span className="text-red-600 text-xs">{error}</span>}
        </div>
    );
}
export const customSelectInput = ({ label, name, options, }) => {
    
}