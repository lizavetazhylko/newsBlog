import { UserErrorState } from "../../types/errortypes";
import { CREATE_USER_TOKEN_ERROR, SIGN_UP_ERROR } from "../action_types";
import { StoreState } from "../storeTypes";

const initialState = {
    signUpErrors: [],
    createTokenUserErrors: [], 
};

export default (state: UserErrorState = initialState, action: any) => {
    switch (action.type) {
        case SIGN_UP_ERROR:
            return (
                {
                    ...state,
                    signUpErrors: action.errors
                }
            );
        case CREATE_USER_TOKEN_ERROR:
            return (
                {
                    ...state,
                    createTokenUserErrors: action.errors                    
                }
            );     
        default: 
            return state;
    }
}