/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ElementType, ReactNode } from "react";
import type { Brand, ProductImage, Variant } from "./product";
export const Role = {
  customer: "Customer",
  admin: "Admin",
} as const;

export type TRole = (typeof Role)[keyof typeof Role];
export interface ISidebarItem {
  title: string;
  url: string;
  icon?: ElementType;
  component?: ElementType;
  children?: ISidebarItem[];
  hidden?: boolean;
}

export interface ISectionHeaderProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

export interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface IProduct {
  id: number
  category_id: number
  brand_id: number
  cj_product_id: any
  source_type: string
  title: string
  slug: string
  description: string
  short_description: string
  status: boolean
  is_featured: boolean
  is_customizable: boolean
  meta_title: string
  meta_description: any
  deleted_at: any
  product_image?: ProductImage
  brand?: Brand
  reviews?: any[]
  variants?: Variant[]
  createdAt?: string
  updatedAt?: string
  quantity?: number | null
  reviewCount?: number
  averageRating?: number
}

export interface IProductCategory {
  category: string;
  products: IProduct[];
}

export interface PricingPlan {
  plan: string;
  description: string;
  price?: string;
  priceNote?: string;
  chatNote?: string;
  buttonText: string;
  footerText: string;
  features: string[];
}

// campaign
export type CampaignStatus = "Active" | "Paused" | "Completed" | "Draft";

export type Campaign = {
  id: string;
  title: string;
  status: CampaignStatus;
  description: string;
  recipients: number;
  giftsSent: string;
  startDate: string;
  progress: number; // 0-100
  trigger: string;
};
