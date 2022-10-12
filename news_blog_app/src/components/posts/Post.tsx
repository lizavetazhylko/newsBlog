import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PostImage } from "./PostImage";
import { PostText } from "./PostText";
import { IPost, Orientation } from "./types";
import './Post.css';
import { NavLink } from "react-router-dom";

const Post = (props: IPost) => {
    const { postInfo, isFull, orientation } = props;
    const { date, title, text, image, id } = postInfo;
    const postText = <Col sm={8}>
                        <PostText date={date}
                               title={title}
                               text={text}
                               isFull={isFull}/>
                      </Col>
    const postImage = <Col sm={4}>
                        <PostImage image={image}/>
                      </Col>
    const isLeft = orientation === Orientation.LEFT
    const isHorisontal = isLeft || orientation === Orientation.RIGHT;
    const isTop = orientation === Orientation.TOP
    const arr = [postText, postImage];
    const resultOrder = isLeft || isTop ? arr : arr.reverse();
    return(
        <NavLink to={`/posts/${id}`} style={{ textDecoration: 'none' }}>
            <Container className="post-wrapper">
                <Row>
                    { isHorisontal ?
                        <>
                            {resultOrder}
                        </>
                    :
                    <Col>
                        {resultOrder}
                    </Col>  
                    }
                </Row>
            </Container>
        </NavLink>
    )
};
   
export default Post;