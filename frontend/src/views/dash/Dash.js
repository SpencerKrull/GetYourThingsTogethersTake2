import React from "react";
import useRedirectLogout from "../../customhook/useRedirectLogout";

const Dash = () => {
    useRedirectLogout('/login')
    return (
        <div>
            <h2>Dash</h2>
        </div>
    )
}

export default Dash