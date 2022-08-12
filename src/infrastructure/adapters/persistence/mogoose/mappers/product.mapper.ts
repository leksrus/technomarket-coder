import { ProductSchema } from "@infrastructure/adapters/persistence/mogoose/schemas/product.schema";
import { Product } from "@core/domain/entities/product";


export class ProductMapper {
  public static toDomainEntity(productModel: ProductSchema): Product {
    return Product.new({
      id: productModel._id.toString(),
      name: productModel.name,
      description: productModel.description,
      category: productModel.category,
      stock: productModel.stock,
      price: parseInt(productModel.price),
      thumbnails: productModel.thumbnails,
      createdAt: new Date(productModel.createdAt),
      editedAt: new Date(productModel.editedAt)
    });
  }

  public static toDomainListEntities(ormProducts: Array<ProductSchema>): Array<Product> {
    return ormProducts.map((x) => this.toDomainEntity(x));
  }

  public static fromDomainToNewModel(product: Product): any {
    return Object.assign({
      name: product.name,
      description: product.description,
      category: product.category,
      stock: product.stock,
      price: product.price,
      thumbnails: product.thumbnails,
      createdAt: product.createdAt,
      editedAt: product.editedAt
    })
  }
}