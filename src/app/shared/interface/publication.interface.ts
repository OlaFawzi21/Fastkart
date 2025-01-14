import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";
import { Country } from "./country.interface";
import { States } from "./state.interface";

export interface PublicationModel extends PaginateModel {
    data: Publication[];
}

export interface Publication {
    id: number;
    publisher_name: string;
    description: string;
    slug: string;
    publisher_logo_id: number;
    publisher_logo: Attachment;
    publisher_cover_image_id: number;
    publisher_cover_image: Attachment;
    country_id: number;
    state_id: number;
    city: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    pinterest?: string;
    created_by_id: number;
    status: boolean;
    country: Country;
    state: States
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
 