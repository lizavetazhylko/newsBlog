import { Events } from "./eventTypes"
import { Launches } from "./launchesTypes"

type ArticleInfo = {
    id: number,
    featured: boolean,
    title: string,
    url: string,
    imageUrl: string,
    newsSite: string,
    summary: string,
    publishedAt: string, 
    launches: Launches[],
    events: Events[],
}

type ArticleVisualInfo = {
    id: number,
    title: string,
    url: string,
    imageUrl: string,
    summary: string,
    publishedAt: string, 
}

type ArticleVisual = {
    article: ArticleVisualInfo,
    key: number,
}

type ArticlesState = {
    articles: ArticleInfo[],
    searchInfo: SearchArticlesInfo,
    totalCount: number,
}

type SearchArticlesInfo = {
    _start: number,
    _limit: number,
    _sort: string,
    title_contains: string,
    summary_contains: string,
}

export type { ArticleInfo, ArticlesState, SearchArticlesInfo, ArticleVisualInfo, ArticleVisual };