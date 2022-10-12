import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, setSearchPosts } from "../../redux/action_creators/post_action_creators";
import { Post as PostType, StoreState } from "../../types";
import { Pagination } from "./Pagination";
import Post from "./Post";
import { Orientation } from "./types";

const getConvertedPosts = (posts: PostType[]) => {
    const resultPosts = [];
    for (let i=0; i<posts.length;) {
        const threePosts = [posts[i], posts[i + 1], posts[i + 2]]
        if (i === 0){
            i = i + 3
        } else {
            threePosts.push(posts[i + 3]);
            i = i + 4
        }
        resultPosts.push(threePosts.filter((el) => !!el));
    }
    return resultPosts;
}

const PostsRow = (props: { posts: any[]}) => {
    const { posts } = props;
    if (posts.length === 1) {
        return(
            <Row>
                <Col sm={6}>
                    <Post postInfo={posts[0]} isFull={true} orientation={Orientation.LEFT}/>
                </Col>
            </Row>
        )

    }
    if (posts.length === 2) {
        return (
            <Row>
                <Col sm={6}>
                    <Post postInfo={posts[0]} isFull={true} orientation={Orientation.LEFT}/>
                </Col>
                <Col sm={6}>
                    <Post postInfo={posts[1]} isFull={true} orientation={Orientation.LEFT}/>
                </Col>
            </Row>
        )
    }
    if (posts.length === 3) {
        return (
            <Row>
                <Col sm={8}>
                    <Post postInfo={posts[0]} isFull={true} orientation={Orientation.LEFT}/>
                </Col>
                <Col sm={4}>
                    <Row>
                        <Post postInfo={posts[1]} isFull={false} orientation={Orientation.LEFT}/> 
                    </Row>
                    <Row>
                        <Post postInfo={posts[2]} isFull={false} orientation={Orientation.RIGHT}/> 
                    </Row>
                </Col>
            </Row>
        )
    }
    if (posts.length === 4) {
        return (
            <Row>
            <Col sm={8}>
                <Row>
                    <Col>
                        <Post postInfo={posts[0]} isFull={false} orientation={Orientation.BOTTOM}/>
                    </Col>
                    <Col>
                        <Post postInfo={posts[1]} isFull={false} orientation={Orientation.BOTTOM}/>
                    </Col>
                </Row>
            </Col>
            <Col sm={4}>
                <Row>
                    <Post postInfo={posts[2]} isFull={false} orientation={Orientation.LEFT}/> 
                </Row>
                <Row>
                    <Post postInfo={posts[3]} isFull={false} orientation={Orientation.RIGHT}/> 
                </Row>
            </Col>
        </Row>
        )
    }
    return null
}

const Posts = (props: { isAuthorized: boolean}) => {
    const posts = useSelector((state: StoreState) => state.post.posts)
    const search = useSelector((state: StoreState) => state.post.search)
    const limit = useSelector((state: StoreState) => state.post.limit)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadPosts({search, limit}))
    }, [limit])
    if (posts.length === 0){
        return null;
    }
    const changedPosts = getConvertedPosts(posts);
    const handleSearchChange = (e: any) => {
        dispatch(setSearchPosts(e.target.value))
    }
    const handleSearchClick = () => {
        dispatch(loadPosts({search, limit}))
    }
    return (
        <Container>
            <div style={{display: 'flex'}}>
                <Form.Control placeholder="Enter title" value={search} onChange={handleSearchChange}/>
                <Button onClick={handleSearchClick}>Search</Button>
            </div>
            {changedPosts.map(postsRow => (<PostsRow posts={postsRow}/>))}
            <Pagination />
        </Container>
    )
}



export { Posts };