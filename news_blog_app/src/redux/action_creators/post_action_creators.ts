import { ADD_POST, LOAD_POSTS, SET_LIMIT_POSTS, SET_NEW_POST_IMAGE, SET_NEW_POST_LESSON, SET_NEW_POST_TEXT, SET_NEW_POST_TITLE, SET_POSTS, SET_SEARCH_POSTS } from "../action_types";
import { Post, PostsResponse, SearchInfo } from "../../types";
import { takeEvery, put } from "redux-saga/effects";
import { getToken } from "./user_action_creators";
 
const loadPosts = (searchInfo: SearchInfo) => ({
  type: LOAD_POSTS,
  searchInfo
})

const setPosts = (posts: Post[]) => ({
    type: SET_POSTS,
    posts
})

const setSearchPosts = (search: string) => ({
    type: SET_SEARCH_POSTS,
    search
})

const setLimitPosts = (limit: number) => ({
    type: SET_LIMIT_POSTS,
    limit
})

const setNewPostTitle = (title: string) => ({
    type: SET_NEW_POST_TITLE,
    title
})

const setNewPostText = (text: string) => ({
    type: SET_NEW_POST_TEXT,
    text
})

const setNewPostLesson = (lesson: number) => ({
    type: SET_NEW_POST_LESSON,
    lesson
})

const setNewPostImage = (image: any) => ({
    type: SET_NEW_POST_IMAGE,
    image
})

const addPost = (postInfo: any) => ({
    type: ADD_POST,
    postInfo
})

const buildPostsString = (searchInfo: SearchInfo) => {
    const url = new URL("https://api.spaceflightnewsapi/net/v3/articles/");
    Object.keys(searchInfo).forEach((key) => {
        url.searchParams.append(key, `${searchInfo[key]}`)
    })
    return url.href
}

function* fetchPosts(action: any) {
    const { searchInfo } = action;
    const data: Response = yield fetch(buildPostsString(searchInfo))
    const posts: PostsResponse = yield data.json()
    yield put(setPosts(posts.results))
}

function* fetchAddPost(action: any) {
    const { postInfo } = action;
    const formData = new FormData();
    Object.entries(postInfo).forEach(([key, value]) => {
        formData.append(key, value as any);
    });
    const token: string = yield getToken();
    const data: Response = yield fetch ('https://api.spaceflightnewsapi/net/v3/articles/', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data'
        }
    })
    console.log(data)
}

function* watcherPost(){
    yield takeEvery(LOAD_POSTS, fetchPosts)
    yield takeEvery(ADD_POST, fetchAddPost)
}

export {
    loadPosts,
    setPosts,
    addPost,
    setSearchPosts,
    setLimitPosts,
    setNewPostImage,
    setNewPostLesson,
    setNewPostText,
    setNewPostTitle,
    watcherPost,
};