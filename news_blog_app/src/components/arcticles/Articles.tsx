import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Accordion, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Articles.css";
import { StoreState } from "../../redux/storeTypes";
import { loadArticles, setTextContains, setTitleContains } from "../../redux/action_creators";
import { Article } from "./Article";

const Articles = () => {
    const dispatch = useDispatch();
    const [title_contains, setSearchTitle] = useState('');
    const [summary_contains, setSearchContent] = useState('');

    const handleSearchChange = (e: any, setSearch: Function) => {
        setSearch(e.target.value);
    }

    const debounceOnChange = debounce(handleSearchChange, 500);

    const { _start, _limit, _sort } = useSelector((state: StoreState) => state.articles.searchInfo);

    useEffect(() => {
        dispatch(setTitleContains(title_contains));
        dispatch(setTextContains(summary_contains));
        dispatch(
            loadArticles({
                _start,
                _limit,
                _sort,
                title_contains,
                summary_contains,
            })
        );
    }, [title_contains, summary_contains])
   
    const articles = useSelector((state: StoreState) => state.articles.articles);

    return (
        <div className="articles">
            <h2>Articles</h2>
            <Accordion defaultActiveKey="0" style={{marginBottom: '30px'}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Search params</Accordion.Header>
                    <Accordion.Body>
                        <div className="articles-search">
                            <Form.Group className="articles-search-item" controlId="formBasicSearchTitle">
                                <Form.Label>Search by title</Form.Label>
                                <Form.Control 
                                    style={{width: '100%'}} 
                                    type="text" 
                                    placeholder="search text..." 
                                    onChange={(e) => debounceOnChange(e, setSearchTitle)} 
                                />
                            </Form.Group>
                            <Form.Group className="articles-search-item" controlId="formBasicSearchContent">
                                <Form.Label>Search by content</Form.Label>
                                <Form.Control 
                                    style={{width: '100%'}} 
                                    type="text" 
                                    placeholder="search text..." 
                                    onChange={(e) => debounceOnChange(e, setSearchContent)} 
                                />
                            </Form.Group>
                            <Form.Group className="articles-search-item" controlId="formBasicSort">
                                <Form.Label>Order by</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>                            
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>                
            {
                articles.length > 0 ?
                <Row xs={1} md={3} className="g-3">
                {    
                    articles.map(article => {
                        const { id, imageUrl, title, summary, url, publishedAt } = article;
                        return (
                            <Article article={{ id, imageUrl, title, summary, url, publishedAt }} key={id} />
                        )
                    })                  
                }
                </Row>
                :
                <h1>NO DATA FOUND</h1>
            } 
        </div>
    )
};

export { Articles };