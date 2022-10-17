import { ArticlesState } from "../types/articleTypes";
import { BlogsState } from "../types/blogTypes";
import { UserErrorState } from "../types/errortypes";
import { MenuState } from "../types/menuTypes";
import { UserState } from "../types/userTypes";

type StoreState = {
    user: UserState,
    errors: UserErrorState,
    articles: ArticlesState,
    blogs: BlogsState,
    menu: MenuState,
};

export type { StoreState };