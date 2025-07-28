import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {QuestionnaireRepository} from './questionnaire.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [QuestionnaireRepository],
  exports: [QuestionnaireRepository]
})
export class QuestionnaireModule {}
