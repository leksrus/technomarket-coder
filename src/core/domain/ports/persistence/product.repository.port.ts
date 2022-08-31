import { Product } from "@core/domain/entities/product";
import { Nullable } from "@core/common/types/common-types";


export interface ProductRepositoryPort {
  findAll(): Promise<Nullable<Array<Product>>>;

  findById(productId: string): Promise<Nullable<Product>>;

  findByCategory(category: string): Promise<Nullable<Array<Product>>>;

  add(product: Product): Promise<Nullable<Product>>;

  update(product: Product): Promise<Nullable<Product>>;

  remove(product: Product): Promise<Nullable<Product>>;
}