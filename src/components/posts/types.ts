export interface IPostItem {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    meta: string;
    urlSlug: string;
    published: boolean;
    postedOn: string;
    modified: string;
    categoryId: number;
    tags: string[];
}

export interface IPostCreate {
    title: string;
    shortDescription: string;
    description: string;
    meta: string;
    published: boolean;
    categoryId: number;
}

export interface IPostEdit {
    title: string;
    shortDescription: string;
    description: string;
    meta: string;
    published: boolean;
    categoryId: number;
}