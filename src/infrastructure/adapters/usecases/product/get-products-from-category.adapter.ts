import { UseCaseValidatableAdapter } from "@core/common/adapters/usecase/usecase.validatable.adapter";
import { GetProductsFromCategoryPort } from "@core/domain/ports/usecases/product/get-products-from-category.port";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class GetProductsFromCategoryAdapter extends UseCaseValidatableAdapter implements GetProductsFromCategoryPort {
  @Expose()
  @IsNotEmpty()
  public category: string;

  public static async new(payload: GetProductsFromCategoryPort): Promise<GetProductsFromCategoryAdapter> {
    const adapter: GetProductsFromCategoryAdapter = plainToClass(GetProductsFromCategoryAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}