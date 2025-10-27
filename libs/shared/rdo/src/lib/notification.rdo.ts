import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {ID_PROPERTY, NOTIFICATION_DATE_PROPERTY, NOTIFICATION_TEXT_PROPERTY} from './rdo.constant';

export class NotificationRDO {
   @ApiProperty({
      description: ID_PROPERTY.DESCRIPTION,
      example: ID_PROPERTY.EXAMPLE
    })
    @Expose()
    public id!: string;

    @ApiProperty({
      description: NOTIFICATION_TEXT_PROPERTY.DESCRIPTION,
      example: NOTIFICATION_TEXT_PROPERTY.EXAMPLE
    })
    @Expose()
    public text!: string;

    @ApiProperty({
      description: NOTIFICATION_DATE_PROPERTY.DESCRIPTION,
      example: NOTIFICATION_DATE_PROPERTY.EXAMPLE
    })
    @Expose({name: 'createdAt'})
    public date!: Date;
}
