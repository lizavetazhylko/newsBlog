import { put, takeEvery } from "redux-saga/effects";
import { ArticleInfo, SearchArticlesInfo } from "../../types/articleTypes";
import { 
    LOAD_ARTICLES, 
    SET_ARTICLES, SET_ARTICLE_LIMIT, SET_ARTICLE_SORT, SET_ARTICLE_START, 
    SET_ARTICLE_TEXT_CONTAINS, SET_ARTICLE_TITLE_CONTAINS 
} from "../action_types";

const loadArticles = (searchInfo: SearchArticlesInfo) => ({
    type: LOAD_ARTICLES,
    searchInfo,
});

const setArticles = (articles: ArticleInfo[]) => ({
    type: SET_ARTICLES,
    articles,
});

const setTitleContains = (title_contains: string) => ({
    type: SET_ARTICLE_TITLE_CONTAINS,
    title_contains,
});

const setTextContains = (summary_contains: string) => ({
    type: SET_ARTICLE_TEXT_CONTAINS,
    summary_contains,
});

const setStart = (start: number) => ({
    type: SET_ARTICLE_START,
    start,
});

const setLimit = (limit: number) => ({
    type: SET_ARTICLE_LIMIT,
    limit,
});

const setSort = (sort: string) => ({
    type: SET_ARTICLE_SORT,
    sort,
});

function* fetchArticles(action: any) {
    const { searchInfo } = action;
    console.log('searchInfo =', searchInfo);
    const url = new URL('https://api.spaceflightnewsapi.net/v3/articles/');
    for (let key in searchInfo) {        
        url.searchParams.append(key, searchInfo[key]);
    }
    console.log(url);
    const data: Response = yield fetch(url);
    const response: ArticleInfo[] = yield data.json();
    yield put(setArticles(response));
};

function* watcherArticles() {
    yield takeEvery(LOAD_ARTICLES, fetchArticles);
};

export { watcherArticles, loadArticles, setTitleContains, setTextContains };