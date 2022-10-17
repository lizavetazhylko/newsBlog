import React from "react";
import { useDispatch } from "react-redux";
import { COUNT_ARTICLES_PAGE } from "../../constants/articlesVars";
import { createPagination } from "../../hooks/createPagination";
import { setCurrentPage, setStart } from "../../redux/action_creators/blog_action_creators";
import { PaginationBlogInfo } from "../../types/blogTypes";

const BlogPagination = (props: PaginationBlogInfo) => {
    const { currentPage, totalCount } = props;
    let pagesNums: (string | number) [] = [];
    if (currentPage && totalCount) {
        pagesNums = createPagination(totalCount, currentPage, COUNT_ARTICLES_PAGE);
    }
    const dispatch = useDispatch();
    const onPageClick = (e: any) => {
        let newCurrentPage = e.target.innerHTML;
        if (newCurrentPage === '...') {
            const id = +e.target.id.substring(5);
            const pageFirst = +pagesNums[id-2].toString();
            const pageLast = +pagesNums[id].toString();
            newCurrentPage = Math.floor((pageFirst + pageLast) / 2);
        } else {
            newCurrentPage = +e.target.innerHTML;
        }
        dispatch(setCurrentPage(newCurrentPage));
        const newStart = (newCurrentPage - 1) * COUNT_ARTICLES_PAGE;
        dispatch(setStart(newStart));
    }
    return (
        <div className="blogs-pagination">
            {   
                pagesNums.length > 1
                ?
                pagesNums.map((num, index) => (
                    <span
                        id={`blogs-page-${index + 1}`}
                        key={index} 
                        className={`blogs-pagination-num${num === currentPage ? ' current-page' : ''}`}
                        onClick={onPageClick}
                    >
                        {num}
                    </span>
                ))
                :
                <></>
            }
        </div>
    );
};

export { BlogPagination };