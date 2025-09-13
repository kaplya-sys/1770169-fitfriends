import { Injectable, NotFoundException } from '@nestjs/common';

import {CreateOrderDTO} from '@1770169-fitfriends/dto';
import {OrdersQuery} from '@1770169-fitfriends/query';
import {FileRecord, Pagination} from '@1770169-fitfriends/types';
import {createMessage} from '@1770169-fitfriends/helpers';

import {OrderRepository} from './order.repository';
import {OrderEntity} from './order.entity';
import {TrainingService} from '../training/training.service';
import {AuthService} from '../auth/auth.service';
import {FilesService} from '../files/files.service';
import {NOT_FOUND_BY_ID_MESSAGE} from './order.constant';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly trainingService: TrainingService,
    private readonly authService: AuthService,
    private readonly filesService: FilesService
  ) {}

  public async createOrder(trainingId: string, userId: string, dto: CreateOrderDTO): Promise<OrderEntity> {
    const existTraining = await this.trainingService.getTrainingById(trainingId);
    const orderEntity = new OrderEntity({
      ...dto,
      userId,
      trainingId
    })
    const newOrder = await this.orderRepository.save(orderEntity);
    await this.authService.updateOrCreateUserBalance(userId, trainingId, newOrder.count);
    newOrder.training = existTraining;

    return newOrder;
  }

  public async getOrders(query: OrdersQuery): Promise<Pagination<OrderEntity>> {
    const orders = await this.orderRepository.find(query);
    const entities = await Promise.all(
      orders.entities.map(async (entity) => {
        if (entity.training) {
          const {video, background} = await this.getFiles(entity.training.videoId, entity.training.backgroundId);
          entity.training.video = video;
          entity.training.background = background;
        }

        return entity;
      })
    );
    orders.entities = entities;

    return orders;
  }

  public async getOrderById(id: string): Promise<OrderEntity> {
    const existOrder = await this.orderRepository.findById(id);

    if (!existOrder) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    if (existOrder.training) {
      const {video, background} = await this.getFiles(existOrder.training.videoId, existOrder.training.backgroundId);
      existOrder.training.video = video;
      existOrder.training.background = background;
    }

    return existOrder;
  }

  private async getFiles(videoId: string, backgroundId: string) {
    const file: Pick<FileRecord, 'video' | 'background'> = {};
    file.video = (await this.filesService.getFile(videoId)).toObject();
    file.background = (await this.filesService.getFile(backgroundId)).toObject();

    return file;
  }
}
