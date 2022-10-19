import React from "react";
import {imgNotFoundurl} from "../ConstsandHelpers"
import Style from "./Notfound.module.css";


const NotFound = () => {
    return(
        <div className={Style.Notfound}>
            <h2 className={Style.titulo}>Oops, nothing match with your request</h2>
            <h3 className={Style.titulo}>Try clearing filters and search other thing</h3>
            <img className={Style.img} src={imgNotFoundurl} alt ="IMG"/>
        </div>
    )
};

export default NotFound;