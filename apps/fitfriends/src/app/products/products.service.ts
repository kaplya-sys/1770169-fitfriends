import {Injectable} from '@nestjs/common';

import {CreateProductDTO, UpdateProductDTO} from '@1770169-guitar/dto';
import {ProductsQuery} from '@1770169-guitar/query';
import {RequestFiles} from '@1770169-guitar/types';

import {ProductsRepository} from './products.repository';
import {ProductsEntity} from './products.entity';
import {FilesService} from '../files/files.service';
import {FilesEntity} from '../files/files.entity';

@Injectable()
export class ProductsService {
  constructor (
    private readonly productsRepository: ProductsRepository,
    private readonly fileService: FilesService
  ) {}

  public async createProduct(dto: CreateProductDTO, file: RequestFiles) {
    const newFile = await this.fileService.saveFile(file);
    const newProduct = new ProductsEntity({...dto, image: newFile.id});

    return this.productsRepository.save(newProduct);
  }

  public async updateProduct(id: string, dto: UpdateProductDTO, file?: RequestFiles) {
    const existsProduct = await this.productsRepository.findById(id);
    let hasChanges = false;
    let newFile: FilesEntity;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsProduct[key] !== value) {
        existsProduct[key] = value;
        hasChanges = true;
      }
    }

    if (file) {
      newFile = await this.fileService.saveFile(file);
      existsProduct.image = newFile.id;
      hasChanges = true;
    }

    if (!hasChanges) {
      return existsProduct;
    }

    return this.productsRepository.update(id, existsProduct);
  }

  public async getProductById(id: string) {
    const result = await this.productsRepository.findById(id);

    if (result) {
      const image = await this.fileService.getFile(result.image as string);
      result.image = {
      image: image.file,
      image2x: image.file2x
    }
    }

    return result;
  }

  public async getProducts(query?: ProductsQuery) {
    const result = await this.productsRepository.find(query);
    const products = await Promise.all(
      result.entities.map(async (product) => {
        const image = await this.fileService.getFile(product.image as string);

        return Object.assign(product, {
          image: {
            image: image.file,
            image2x: image.file2x,
          }
        })
      })
    )

    return Object.assign(result, {entities: products});
  }

  public async deleteProductById(id: string) {
    return this.productsRepository.delete(id);
  }
}
