import { ICreateProduct } from 'src/modules/products/domain/models/ICreateProduct';
import { IProduct } from 'src/modules/products/domain/models/IProduct';
import { IFindProducts } from 'src/modules/products/domain/models/IFindProducts';
import { IUpdateStockProduct } from 'src/modules/products/domain/models/IUpdateProduct';
import { IProductsRepository } from 'src/modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
  }

  public async findAll(): Promise<IProduct[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const productsExists = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return productsExists;
  }
}

export default ProductsRepository;
