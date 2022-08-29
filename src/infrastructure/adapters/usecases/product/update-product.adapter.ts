import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { UpdateProductPort } from '@core/domain/ports/usecases/product/update-product.port';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@Exclude()
export class UpdateProductAdapter extends UseCaseValidatableAdapter implements UpdateProductPort {
  @Expose()
  @IsNotEmpty()
  public category: string;
  @Expose()
  @IsNotEmpty()
  public description: string;
  @Expose()
  @IsNotEmpty()
  public id: string;
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

  public static async new(payload: UpdateProductPort): Promise<UpdateProductAdapter> {
    const adapter: UpdateProductAdapter = plainToClass(UpdateProductAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
