import { UserState } from "../../types/userTypes";
import { USER_AUTHORIZE } from "../action_types";

const initialState = {
    user: null
}

export default (state: UserState = initialState, action: any) => {
    switch (action.type) {
        case USER_AUTHORIZE: {
            return ({
                ...state,
                user: action.user
            });
        }
        default: {
            return state;
        }
    }
}