import type { ComponentType, ElementType, ReactNode } from "react";
export const Role = {
  customer: "customer",
  seller: "seller",
} as const;

export type TRole = (typeof Role)[keyof typeof Role];
export interface ISidebarItem {
  title: string;
  url: string;
  icon?: ElementType;
  component?: ComponentType;
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
  id: string | number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string[];
  rating: number;
  reviewsCount: number;
  stockCount: number;
  inStock: boolean;
  category?: string;
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
