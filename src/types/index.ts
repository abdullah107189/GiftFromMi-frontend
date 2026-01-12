import type { ReactNode } from "react";

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

export interface IFeaturedCard {
  id: string | number;
  image: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount?: string;
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
