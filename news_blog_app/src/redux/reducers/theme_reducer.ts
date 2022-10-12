import { Themes } from "../../constants";
import { ThemeState } from "../../types";
import { TOGGLE_THEME } from "../action_types";

const initial_state = {
  theme: Themes.LIGHT
}

export default (state: ThemeState = initial_state, action: any) => {
  switch (action.type){
    case TOGGLE_THEME: {
      return (
        {
          ...state,
          theme: state.theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
        }
      )
    }
    default: {
      return state;
    }
  }
}