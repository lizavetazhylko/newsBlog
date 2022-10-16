import React, { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { activation } from "../../redux/action_creators";
import "./Activation.css";

const Activation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const splittedPath = window.location.pathname.split('/');
        console.log('tokens', splittedPath[2], splittedPath[3]);
        dispatch(activation({
            uid: splittedPath[2],
            token: splittedPath[3]
        }));
    }, []);
    return (
        <div className="activate-loading">
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>

    );
};

export { Activation };