import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';

import {CreateUserApplicationDTO, UpdateUserApplicationDTO} from '@1770169-fitfriends/dto';
import {createMessage} from '@1770169-fitfriends/helpers';
import {Role, UserApplicationStatus} from '@1770169-fitfriends/models';
import {TokenPayload} from '@1770169-fitfriends/types';

import {UserApplicationRepository} from './user-application.repository';
import {UserApplicationEntity} from './user-application.entity';
import {
  NOT_FOUND_APPLICATION_ERROR,
  NOT_FOUND_USER_ERROR,
  ROLE_TYPE_ERROR,
  USER_APPLICATION
} from './user-application.constant';
import {NotificationService} from '../notification/notification.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UserApplicationService {
  constructor(
    private readonly userApplicationRepository: UserApplicationRepository,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
  ) {}

  public async createUserApplication(payload: TokenPayload, dto: CreateUserApplicationDTO) {
    if (payload.role !== Role.user) {
      throw new BadRequestException(ROLE_TYPE_ERROR)
    }
    const existUser = await this.authService.getUserById(dto.userId);

    if (!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_USER_ERROR, [dto.userId]));
    }
    const existUserApplication = await this.userApplicationRepository.findByUserIdAndInitiatorId(payload.sub, dto.userId);

    if (existUserApplication) {
      return existUserApplication;
    }
    const newEntity = new UserApplicationEntity({
      ...dto,
      initiatorId: payload.sub
    })
    const userApplication = await this.userApplicationRepository.save(newEntity);
    await this.notificationService.createNotification(dto.userId, createMessage(USER_APPLICATION.INVITE_MESSAGE, [payload.name]));

    return userApplication;
  }

  public async updateUserApplication(applicationId: string, dto: UpdateUserApplicationDTO) {
    const existUserApplication = await this.userApplicationRepository.findById(applicationId);

    if (!existUserApplication) {
      throw new NotFoundException(createMessage(NOT_FOUND_APPLICATION_ERROR, [applicationId]));
    }

    if (dto.status === existUserApplication.status) {
      return;
    }
    existUserApplication.status = dto.status;
    await this.userApplicationRepository.update(applicationId, existUserApplication);

    if (existUserApplication.status !== UserApplicationStatus.pending) {
      const message = dto.status === UserApplicationStatus.accepted ? USER_APPLICATION.ACCEPT_MESSAGE : USER_APPLICATION.REJECT_MESSAGE;
      await this.notificationService.createNotification(existUserApplication.initiatorId, createMessage(message, [existUserApplication.user?.name]));
    }
  }

  public async getUserApplications(userId: string) {
    const userApplications = await this.userApplicationRepository.find(userId);

    return userApplications.filter((userApplication) => userApplication !== null);
  }
}
