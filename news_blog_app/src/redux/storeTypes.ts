import { ArticlesState } from "../types/articleTypes";
import { UserErrorState } from "../types/errortypes";
import { UserState } from "../types/userTypes";

type StoreState = {
    user: UserState,
    errors: UserErrorState,
    articles: ArticlesState,
};

export type { StoreState };