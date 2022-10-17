import { COUNT_BLOGS_PAGE, SortMode, SORT_BLOGS_RULES } from "../../constants";
import { BlogsState } from "../../types/blogTypes";
import { SET_BLOGS, SET_BLOG_CURRENT_PAGE, SET_BLOG_LIMIT, SET_BLOG_SORT, SET_BLOG_SORT_MODE, SET_BLOG_START, SET_BLOG_TEXT_CONTAINS, SET_BLOG_TITLE_CONTAINS, SET_BLOG_TOTAL_COUNT } from "../action_types/blog_action_types";


const initialState = {
    blogs: [],
    searchInfo: {
        _start: 0,
        _limit: COUNT_BLOGS_PAGE,
        _sort: SORT_BLOGS_RULES[1],
        title_contains: '',
        summary_contains: '',
    },
    totalCount: 0,
    currentPage: 1,
    sortMode: SortMode.ASC,
}

export default (state: BlogsState = initialState, action: any) => {
    switch(action.type) {
        case SET_BLOGS: 
            return ({
                ...state,
                blogs: state.sortMode === SortMode.ASC ? action.blogs : action.blogs.reverse(),
            });
        case SET_BLOG_TOTAL_COUNT: 
            return ({
                ...state,
                totalCount: action.totalCount,
            });    
        case SET_BLOG_CURRENT_PAGE: 
            return ({
                ...state,
                currentPage: action.currentPage,
            });            
        case SET_BLOG_TITLE_CONTAINS: 
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    title_contains: action.title_contains,
                },
            });
        case SET_BLOG_TEXT_CONTAINS: 
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    summary_contains: action.summary_contains,
                },
            });            
        case SET_BLOG_START:
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    _start: action.start,
                },
            });
        case SET_BLOG_LIMIT:
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    _limit: action.limit,
                },                
            });
        case SET_BLOG_SORT:
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    _sort: action.order,
                },                
            }); 
        case SET_BLOG_SORT_MODE:
            return ({
                ...state,
                sortMode: action.sortMode,                
            });          
        default:
            return state;
    }
}