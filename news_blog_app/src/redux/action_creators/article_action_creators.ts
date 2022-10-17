import { put, takeEvery } from "redux-saga/effects";
import { SortMode } from "../../constants";
import { ArticleInfo, SearchArticlesInfo } from "../../types/articleTypes";
import { 
    LOAD_ARTICLES, 
    SET_ARTICLES, SET_ARTICLE_LIMIT, SET_ARTICLE_SORT, SET_ARTICLE_START, 
    SET_ARTICLE_TEXT_CONTAINS, SET_ARTICLE_TITLE_CONTAINS, SET_ARTICLE_CURRENT_PAGE, SET_ARTICLE_TOTAL_COUNT, SET_ARTICLE_SORT_MODE 
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

const setSortMode = (sortMode: SortMode) => ({
    type: SET_ARTICLE_SORT_MODE,
    sortMode,
});

const setCurrentPage = (currentPage: number) => ({
    type: SET_ARTICLE_CURRENT_PAGE,
    currentPage,
});

const setTotalCount = (totalCount: number) => ({
    type: SET_ARTICLE_TOTAL_COUNT,
    totalCount,
});

function* fetchArticles(action: any) {
    const { searchInfo } = action;
    console.log('searchInfo =', searchInfo);
    const url = new URL('https://api.spaceflightnewsapi.net/v3/articles/');
    const urlCount = new URL('https://api.spaceflightnewsapi.net/v3/articles/count');
    for (let key in searchInfo) {        
        url.searchParams.append(key, searchInfo[key]);
        urlCount.searchParams.append(key, searchInfo[key]);
    }

    const dataCount: Response = yield fetch(urlCount);
    const responseCount: number = yield dataCount.json();
    yield put(setTotalCount(responseCount));

    const data: Response = yield fetch(url);
    const response: ArticleInfo[] = yield data.json();
    yield put(setArticles(response));
};

function* watcherArticles() {
    yield takeEvery(LOAD_ARTICLES, fetchArticles);
};

export { watcherArticles, loadArticles, setTitleContains, setTextContains, setCurrentPage, setStart, setSort, setSortMode };