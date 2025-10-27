import {Injectable, NotFoundException} from '@nestjs/common';

import {createMessage} from '@1770169-fitfriends/helpers';

import {NotificationRepository} from './notification.repository';
import {NotificationEntity} from './notification.entity';
import {NOT_FOUND_BY_ID_MESSAGE} from './notification.constant';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async createNotification(userId: string, text: string) {
    const newNotificationEntity = new NotificationEntity({userId, text});

    return this.notificationRepository.save(newNotificationEntity);
  }

  public async getNotificationsByUserId(userId: string) {
    const notifications = await this.notificationRepository.find(userId);

    return notifications.filter((notification) => notification !== null);
  }

  public async deleteNotification(id: string) {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    await this.notificationRepository.delete(id);
  }
}
