import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../types";
import { IPostText } from "./types";

const PostText = (props: IPostText) => {
    const { date, title, text, isFull } = props;
    const ResultH = isFull ? 'h3' : 'h5';
    const theme = useSelector((state: StoreState) => state.theme.theme)
    return(
        <div className={theme+'-post-text'}>
            <span>{date}</span>
            <ResultH>{title}</ResultH>
            {isFull && <p>{text}</p>}
        </div>
    )
}

export { PostText };