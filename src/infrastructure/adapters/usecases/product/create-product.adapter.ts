import { UseCaseValidatableAdapter } from "@core/common/adapters/usecase/usecase.validatable.adapter";
import { CreateProductPort } from "@core/domain/ports/usecases/product/create-product.port";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

@Exclude()
export class CreateProductAdapter extends UseCaseValidatableAdapter implements CreateProductPort {
  @Expose()
  @IsNotEmpty()
  public category: string;

  @Expose()
  @IsNotEmpty()
  public description: string;

  @Expose()
  @IsNotEmpty()
  public name: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  public price: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  public stock: number;

  @Expose()
  @IsNotEmpty()
  public thumbnails: string;

  public static async new(payload: CreateProductPort): Promise<CreateProductAdapter> {
    const adapter: CreateProductAdapter = plainToClass(CreateProductAdapter, payload);
    await adapter.validate();

    return adapter;
  }

}