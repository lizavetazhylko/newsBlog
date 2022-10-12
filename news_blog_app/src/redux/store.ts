import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watcherPost } from './action_creators/post_action_creators';
import theme_reducer from './reducers/theme_reducer';
import user_reducer from './reducers/user_reducer';
import posts_reducer from './reducers/posts_reducer';
import { combineReducers } from 'redux';
import { watcherUser } from './action_creators';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();
function* rootSaga(){
  yield all([
    watcherPost(),
    watcherUser()
  ])
}
export default createStore(combineReducers({
  theme: theme_reducer,
  user: user_reducer,
  post: posts_reducer
}), applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
