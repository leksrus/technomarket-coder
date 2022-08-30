import { Nullable } from "@core/common/types/common-types";


export type ProductType = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  thumbnails: string;
  editedAt?: Nullable<Date>;
  createdAt?: Nullable<Date>;
}