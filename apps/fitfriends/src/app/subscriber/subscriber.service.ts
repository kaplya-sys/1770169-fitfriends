import {Injectable, NotFoundException} from '@nestjs/common';

import {createMessage} from '@1770169-fitfriends/helpers';

import {SubscriberEntity} from './subscriber.entity';
import {SubscriberRepository} from './subscriber.repository';
import {NOT_FOUND_BY_ID_MESSAGE} from './subscriber.constants';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
  ) {}

  public async addSubscriber(email: string, userId: string): Promise<void> {
    const existsSubscriber = await this.subscriberRepository.findEmail(email);

    if (!existsSubscriber) {
      const newSubscriber = new SubscriberEntity({email, userId});
      await this.subscriberRepository.save(newSubscriber);
    }
  }

  public async deleteSubscriber(id: string): Promise<void> {
    const existsSubscriber = await this.subscriberRepository.findById(id);

    if(!existsSubscriber) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    await this.subscriberRepository.delete(id);
  }

   public async getSubscribersByUserId(id: string): Promise<SubscriberEntity[]> {
    const subscribers = await this.subscriberRepository.findManyByUserId(id);
  
    return subscribers.filter((subscriber) => subscriber !== null);
  }
}
