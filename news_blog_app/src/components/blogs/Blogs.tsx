import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Accordion, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/storeTypes";
import { Blog } from "./Blog";
import { BlogPagination } from "./BlogPagination";
import { SortMode, SORT_BLOGS_RULES } from "../../constants";
import { 
    loadBlogs, 
    setCurrentPage, 
    setSortMode, 
    setStart, 
    setTextContains, 
    setTitleContains 
} from "../../redux/action_creators/blog_action_creators";
import "./Blogs.css";

const Blogs = () => {
    const dispatch = useDispatch();
    const [title_contains, setSearchTitle] = useState('');
    const [summary_contains, setSearchContent] = useState('');
    const [_sort, setSort] = useState(SORT_BLOGS_RULES[1]);
    const [sortMode, setSortModeChecked] = useState(SortMode.ASC);

    const handleSearchChange = (e: any, setSearch: Function) => {
        setSearch(e.target.value);
        dispatch(setStart(0));
        dispatch(setCurrentPage(1));
    }

    const handleSortChange = (e: any) => {
        setSort(e.target.value);
    }

    const handleSortModeChange = (e: any) => {
        setSortModeChecked(e.target.value === SortMode.ASC ? SortMode.DESC : SortMode.ASC);
        dispatch(setStart(0));
        dispatch(setCurrentPage(1));
    }

    const debounceOnChange = debounce(handleSearchChange, 500);

    const { _start, _limit } = useSelector((state: StoreState) => state.blogs.searchInfo);
    const { totalCount, currentPage } = useSelector((state: StoreState) => state.blogs);

    useEffect(() => {
        dispatch(setTitleContains(title_contains));
        dispatch(setTextContains(summary_contains));
        dispatch(setSortMode(sortMode));
        dispatch(
            loadBlogs({
                _start,
                _limit,
                _sort,
                title_contains,
                summary_contains,
            })
        );
    }, [title_contains, summary_contains, _start, _sort, sortMode])
   
    const blogs = useSelector((state: StoreState) => state.blogs.blogs);

    return (
        <div className="blogs">
            <h2>Blogs</h2>
            <Accordion defaultActiveKey="0" style={{marginBottom: '30px'}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Search params</Accordion.Header>
                    <Accordion.Body>
                        <div className="blogs-search">
                            <Form.Group className="blogs-search-item" controlId="formBasicSearchTitle">
                                <Form.Label>Search by title</Form.Label>
                                <Form.Control 
                                    style={{width: '100%'}} 
                                    type="text" 
                                    placeholder="search text..." 
                                    onChange={(e) => debounceOnChange(e, setSearchTitle)} 
                                />
                            </Form.Group>
                            <Form.Group className="blogs-search-item" controlId="formBasicSearchContent">
                                <Form.Label>Search by content</Form.Label>
                                <Form.Control 
                                    style={{width: '100%'}} 
                                    type="text" 
                                    placeholder="search text..." 
                                    onChange={(e) => debounceOnChange(e, setSearchContent)} 
                                />
                            </Form.Group>
                            <Form.Group className="blogs-search-item" controlId="formBasicSort">
                                <Form.Label>Order by</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={handleSortChange}
                                    value={_sort}
                                >
                                    {
                                        SORT_BLOGS_RULES.map(sort => (
                                            <option value={sort} key={sort}>{sort}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="blogs-search-item" controlId="formBasicSortMode">
                                <Form.Label>Order by mode</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        defaultChecked = {sortMode === SortMode.ASC}                            
                                        label={`Order by ${SortMode.ASC}`}
                                        name="sort-blogs-mode"
                                        type={'radio'}
                                        id={`sort-mode-${'type'}-1`}
                                        onChange={handleSortModeChange}
                                        value={sortMode}
                                    />
                                    <Form.Check
                                        inline
                                        defaultChecked = {sortMode === SortMode.DESC}  
                                        label={`Order by ${SortMode.DESC}`}
                                        name="sort-blogs-mode"
                                        type={'radio'}
                                        id={`sort-mode-${'radio'}-2`}
                                        onChange={handleSortModeChange}
                                        value={sortMode}
                                    />
                                </div>
                            </Form.Group>                   
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>                
            {
                blogs.length > 0 ?
                <>
                    <Row xs={1} md={3} className="g-3">
                    {    
                        blogs.map(blog => {
                            const { id, imageUrl, title, summary, url, publishedAt } = blog;
                            return (
                                <Blog blog={{ id, imageUrl, title, summary, url, publishedAt }} key={id} />
                            )
                        })                  
                    }
                    </Row>
                    <BlogPagination totalCount={totalCount} currentPage={currentPage} />                
                </>
                :
                <h1>NO DATA FOUND</h1>
            } 
        </div>
    )
};

export { Blogs };