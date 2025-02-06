import React from "react";
import {useAuthStore} from "../../config/stores";

export default function Home() {
    const { isAuthenticated , token } = useAuthStore();
    return (
        <div className="text-white text-wrap">
            <h1>Home Page</h1>
            <p>Welcome to our website!</p>
            { isAuthenticated ? <p>You are authenticated</p> : <p>You are not authenticated</p>  }
            { localStorage.getItem('token') && <p>Your token is: {token}</p>  }
        </div>
    );
}
