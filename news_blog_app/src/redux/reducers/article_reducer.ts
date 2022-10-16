import { ArticlesState } from "../../types/articleTypes"
import { 
    SET_ARTICLES, SET_ARTICLE_LIMIT, SET_ARTICLE_SORT, SET_ARTICLE_START, 
    SET_ARTICLE_TEXT_CONTAINS, SET_ARTICLE_TITLE_CONTAINS 
} from "../action_types";

const initialState = {
    articles: [],
    searchInfo: {
        _start: 0,
        _limit: 9,
        _sort: 'publishedAt',
        title_contains: '',
        summary_contains: '',
    },
    totalCount: 0,
}

export default (state: ArticlesState = initialState, action: any) => {
    switch(action.type) {
        case SET_ARTICLES: 
            return ({
                ...state,
                articles: action.articles,
                totalCount: action.articles.length,
            });
        case SET_ARTICLE_TITLE_CONTAINS: 
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    title_contains: action.title_contains,
                },
            });
        case SET_ARTICLE_TEXT_CONTAINS: 
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    summary_contains: action.summary_contains,
                },
            });            
        case SET_ARTICLE_START:
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    _start: action.start,
                },
            });
        case SET_ARTICLE_LIMIT:
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    _limit: action.limit,
                },                
            });
        case SET_ARTICLE_SORT:
            return ({
                ...state,
                searchInfo: { 
                    ...state.searchInfo,
                    _sort: action.order,
                },                
            });            
        default:
            return state;
    }
}