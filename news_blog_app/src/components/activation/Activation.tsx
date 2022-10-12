import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { activation } from "../../redux/action_creators";

const Activation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const splittedPath = window.location.pathname.split('/');
        dispatch(activation({
           uid: splittedPath[2],
           token: splittedPath[3]
        }))
    }, [])
    return (
        <div>
            Loading 
        </div>
    )
}

export { Activation };