/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CJProduct {
    id: number
    category_id: number
    brand_id: number
    cj_product_id: string
    source_type: string
    title: string
    slug: string
    description: string
    short_description: string
    status: boolean
    is_featured: boolean
    is_customizable: boolean
    meta_title: any
    meta_description: any
    deleted_at: any
    product_image: ProductImage[]
    brand: Brand
    reviews: any[]
    variants: Variant[]
}

export interface ProductImage {
    id: number
    product_id: number
    image: string
    imageUrl: string
}

export interface Brand {
    id: number
    name: string
    slug: string
    logo: any
    description: string
    status: boolean
    is_featured: boolean
    logoUrl: any
}

export interface Variant {
    id: number
    product_id: number
    sku: string
    price: number
    sell_price: number
    quantity: number
    cj_variant_id: any
    alert_quantity: number
    color: string
    size: any
}
