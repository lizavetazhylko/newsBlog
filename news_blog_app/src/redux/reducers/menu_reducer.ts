import { MenuStateValues } from "../../constants/menuVars";
import { MenuState } from "../../types/menuTypes";
import { TOGGLE_MENU } from "../action_types/menu_action_types";

const initialState = {
    menuState: MenuStateValues.CLOSE,
}

export default (state: MenuState = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_MENU: {
            return (
                {
                    ...state,
                    menuState: state.menuState === MenuStateValues.OPEN ? MenuStateValues.CLOSE : MenuStateValues.OPEN
                }
            )
        }
        default: {
            return state;
        }
    }
}