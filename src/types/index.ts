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

export interface Product {
  id: string | number;
  image: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: string;
}
