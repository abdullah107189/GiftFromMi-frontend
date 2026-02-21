import type { IProduct } from "."

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Category {
    id: number
    name: string
    slug: string
    parent_id: any
    description: string
    icon: any
    status: boolean
    sort_order: number
    meta_title: string
    meta_description: string
    keywords: string
    products_count: number
    iconUrl: any
    products?: IProduct[]
}