
import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";
import { Country } from "./country.interface";
import { Product } from "./product.interface";
import { States } from "./state.interface";

export interface AuthorModel extends PaginateModel {
    data: Author[];
}

export interface Author {
    id: number;
    author_name: string;
    bio: string;
    slug: string;
    author_image_id: number;
    author_image: Attachment;
    author_cover_image_id: number
    author_cover_image: Attachment
    country_id: number;
    state_id: number;
    city: string;
    birth_date: string;
    death_date: string;
    languages: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    pinterest?: string;
    country: Country
    state: States
    status: boolean;
    created_by_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}