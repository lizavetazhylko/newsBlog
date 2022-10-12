import { PostState } from "../../types";
import { SET_LIMIT_POSTS, SET_NEW_POST_IMAGE, SET_NEW_POST_LESSON, SET_NEW_POST_TEXT, SET_NEW_POST_TITLE, SET_POSTS, SET_SEARCH_POSTS } from "../action_types";

const initial_state = {
  posts: [],
  search: '',
  limit: 20 
}

export default (state: PostState = initial_state, action: any) => {
  switch (action.type) {
    case SET_POSTS: {
      return ({
        ...state,
        posts: action.posts
      })
    }
    case SET_SEARCH_POSTS: {
      return ({
        ...state,
        search: action.search
      })
    }
    case SET_LIMIT_POSTS: {
      return ({
        ...state,
        limit: action.limit
      })
    }
    case SET_NEW_POST_IMAGE: {
      return ({
        ...state,
        newPostImage: action.image
      })
    }
    case SET_NEW_POST_TITLE: {
      return ({
        ...state,
        newPostTitle: action.title
      })
    }
    case SET_NEW_POST_TEXT: {
      return ({
        ...state,
        newPostText: action.text
      })
    }
    case SET_NEW_POST_LESSON: {
      return ({
        ...state,
        newPostLesson: action.lesson
      })
    }
    default: {
      return state;
    }
  }
}