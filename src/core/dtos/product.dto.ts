import { Exclude, Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Product } from '@core/domain/entities/product';

@Exclude()
export class ProductDto {
  @Expose()
  public id: string;

  @Expose()
  public category: string;

  @Expose()
  public description: string;

  @Expose()
  public name: string;

  @Expose()
  public price: string;

  @Expose()
  @Type(() => Number)
  public stock: number;

  @Expose()
  public thumbnails: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date)?.toLocaleString())
  public editedAt: Date;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date).toLocaleString())
  public createdAt: Date;

  public static toProductDto(product: Product): ProductDto {
    return plainToClass(ProductDto, product);
  }

  public static toProductListDto(products: Array<Product>): Array<ProductDto> {
    return products.map((x) => this.toProductDto(x));
  }
}
