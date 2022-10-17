import { SortMode } from "../constants/vars"
import { Events } from "./eventTypes"
import { Launches } from "./launchesTypes"

type BlogInfo = {
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

type BlogVisualInfo = {
    id: number,
    title: string,
    url: string,
    imageUrl: string,
    summary: string,
    publishedAt: string, 
}

type BlogVisual = {
    blog: BlogVisualInfo,
    key: number,
}

type BlogsState = {
    blogs: BlogInfo[],
    searchInfo: SearchBlogsInfo,
    totalCount: number,
    currentPage: number,
    sortMode: SortMode,
}

type SearchBlogsInfo = {
    _start: number,
    _limit: number,
    _sort: string,
    title_contains: string,
    summary_contains: string,
}

type PaginationBlogInfo = {
    totalCount: number,
    currentPage: number,
}

export type { BlogInfo, BlogsState, SearchBlogsInfo, BlogVisualInfo, BlogVisual, PaginationBlogInfo };