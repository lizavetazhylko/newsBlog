import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import { all } from "redux-saga/effects";
import { watcherUser } from "./action_creators";
import { watcherArticles } from "./action_creators/article_action_creators";
import { watcherBlogs } from "./action_creators/blog_action_creators";
import article_reducer from "./reducers/article_reducer";
import blog_reducer from "./reducers/blog_reducer";
import menu_reducer from "./reducers/menu_reducer";
import userAuthorize_reducer from "./reducers/userAuthorize_reducer";
import userError_reducer from "./reducers/userError_reducer";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        watcherUser(),
        watcherArticles(),
        watcherBlogs(),
    ])
};

export default createStore(combineReducers({ 
    user: userAuthorize_reducer,
    errors: userError_reducer,
    articles: article_reducer,
    blogs: blog_reducer,
    menu: menu_reducer,
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);