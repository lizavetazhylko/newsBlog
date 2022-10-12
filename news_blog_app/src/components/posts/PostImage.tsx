import React from "react";
import { IPostImage } from "./types";

const PostImage = (props: IPostImage) => {
    const { image } = props;
    return (
        <div>
            <img src={image} style={{width: '100%'}}/>
        </div>
    );
}

export { PostImage };