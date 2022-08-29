import { CreateProductPort } from "@core/domain/ports/usecases/product/create-product.port";


export interface UpdateProductPort extends CreateProductPort{
  id: string;
}