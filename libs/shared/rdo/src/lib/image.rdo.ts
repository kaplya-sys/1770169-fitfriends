import {Expose, Type} from 'class-transformer';

import {Image} from '@1770169-guitar/types';

import {FailInfoRDO} from './file-info.rdo';

export class ImageRDO implements Image {
  @Type(() => FailInfoRDO)
  @Expose()
  public file!: FailInfoRDO;

  @Type(() => FailInfoRDO)
  @Expose()
  public file2x!: FailInfoRDO;
}
