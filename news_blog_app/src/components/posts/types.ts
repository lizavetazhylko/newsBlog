import { Post } from "../../types";

interface IPost {
    postInfo: Post,
    isFull: boolean,
    orientation: Orientation
}

interface IPostText {
    text: string,
    date: string,
    title: string,
    isFull: boolean,
}

interface IPostImage {
    image: string
}

export enum Orientation {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}

export type { IPost, IPostText, IPostImage };