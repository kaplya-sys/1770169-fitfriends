import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {
  CURRENT_PAGE_PROPERTY,
  ENTITIES_PROPERTY,
  ITEMS_PER_PAGE_PROPERTY,
  TOTAL_ITEMS_PROPERTY,
  TOTAL_PAGES_PROPERTY
} from './rdo.constant';
import {UserRDO} from './user.rdo';

export class UsersWithPaginationRDO {
  @ApiProperty({
    description: ENTITIES_PROPERTY.DESCRIPTION,
    type: UserRDO,
    isArray: true
  })
  @Type(() => UserRDO)
  @Expose()
  public entities!: UserRDO[];

  @ApiProperty({
    description: TOTAL_PAGES_PROPERTY.DESCRIPTION,
    example: TOTAL_PAGES_PROPERTY.EXAMPLE
  })
  @Expose()
  public totalPages!: number;

  @ApiProperty({
    description: TOTAL_ITEMS_PROPERTY.DESCRIPTION,
    example: TOTAL_ITEMS_PROPERTY.EXAMPLE
  })
  @Expose()
  public totalItems!: number;

  @ApiProperty({
    description: CURRENT_PAGE_PROPERTY.DESCRIPTION,
    example: CURRENT_PAGE_PROPERTY.EXAMPLE
  })
  @Expose()
  public currentPage!: number;

  @ApiProperty({
    description: ITEMS_PER_PAGE_PROPERTY.DESCRIPTION,
    example: ITEMS_PER_PAGE_PROPERTY.EXAMPLE
  })
  @Expose()
  public itemsPerPage!: number;
}

