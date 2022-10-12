import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FileLoader } from '../file_loader/FileLoader';
import { StoreState } from '../../types';
import { ImageListType } from "react-images-uploading";
import { addPost, setNewPostImage, setNewPostLesson, setNewPostText, setNewPostTitle } from '../../redux/action_creators/post_action_creators';


const AddPost = () => {
    const dispatch = useDispatch();
    const title = useSelector((state: StoreState) => state.post.newPostTitle)
    const text = useSelector((state: StoreState) => state.post.newPostText)
    const lesson = useSelector((state: StoreState) => state.post.newPostLesson)
    const image = useSelector((state: StoreState) => state.post.newPostImage);
    const handleChangeTitle = (e: any) => {
        dispatch(setNewPostTitle(e.target.value))
    }
    const handleChangeText = (e: any) => {
        dispatch(setNewPostText(e.target.value))
    }
    const handleChangeLesson = (e: any) => {
        dispatch(setNewPostLesson(e.target.value))
    }
    const handleImageChange = (imageList: ImageListType) => {
        dispatch(setNewPostImage(imageList[0]))
    }
    const handleAddPost = () => {
        dispatch(addPost({
            title,
            text,
            lesson_num: +(lesson || 0),
            image: image.file
        }))
    }
    return (
        <div>
            <Container>
                <h2>Add post</h2>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Enter title" value={title} onChange={handleChangeTitle}/>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3" controlId="text">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Text" value={text} onChange={handleChangeText}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="lesson_num">
                            <Form.Label>Lesson</Form.Label>
                            <Form.Control type='number' placeholder="Enter lesson number" value={lesson} onChange={handleChangeLesson}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <FileLoader image={image} 
                            onChange={handleImageChange}
                            onRemove={() => dispatch(setNewPostImage(undefined))}/>
                    </Col>
                </Row>
                <Row>
                    <Button onClick={handleAddPost}>Add post</Button>
                </Row>
            </Container>
        </div>
    )
}

export { AddPost };