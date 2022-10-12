import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LIMITS } from '../../constants';
import { setLimitPosts } from '../../redux/action_creators/post_action_creators';
import { StoreState } from '../../types';

const Pagination = () => {
    const dispatch = useDispatch();
    const rowPerPage = useSelector((state: StoreState) => state.post.limit)
    const handleChangeLimit = (e: any) => {
        dispatch(setLimitPosts(+e.target.value))
    }
    return (
        <Row>
            <Col>
            </Col>
            <Col sm={1}>
                <Form.Select value={rowPerPage} onChange={handleChangeLimit}>
                    {LIMITS.map((limit) =><option key={limit}
                    value={limit}>{limit}</option>)}
                </Form.Select>
            </Col>
        </Row>
    )
}

export { Pagination };