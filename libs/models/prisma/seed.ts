import {PrismaClient, TrainingTime, FitnessLevel, Gender, Role, Exercise, Location, PaymentMethod} from '../src';


const trainings = [
  {
    id: 'ed4586fa-ea74-4eee-8752-6e437c59d6d4',
    title: "Утренняя йога",
    level: FitnessLevel.beginner,
    type: Exercise.yoga,
    trainingTime: TrainingTime.short,
    calories: 1200,
    gender: Gender.female,
    description: "Расслабляющая утренняя практика для пробуждения тела и ума.",
    price: 1500,
    specialOffer: false,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aa7',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: 'ffc8635c-6129-48c4-aed0-c80b0ee6d05d',
    title: "CrossFit",
    level: FitnessLevel.professional,
    type: Exercise.crossfit,
    trainingTime: TrainingTime.extraLong,
    calories: 3500,
    gender: Gender.male,
    description: "Интенсивная тренировка на все группы мышц с высокой нагрузкой.",
    price: 2500,
    specialOffer: true,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aa8',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: '79ddb368-250a-4472-bc8f-5fdee13a8101',
    title: "Сила бокса",
    level: FitnessLevel.beginner,
    type: Exercise.boxing,
    trainingTime: TrainingTime.medium,
    calories: 1800,
    gender: Gender.whatever,
    description: "Основы бокса: стойки, удары, защита. Подходит для всех.",
    price: 2000,
    specialOffer: false,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aa9',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: '9e91bc86-fc68-4fd4-befd-9f93732523ba',
    title: "Пилатес",
    level: FitnessLevel.amateur,
    type: Exercise.pilates,
    trainingTime: TrainingTime.medium,
    calories: 1500,
    gender: Gender.female,
    description: "Укрепление мышц кора, улучшение осанки и гибкости.",
    price: 1800,
    specialOffer: true,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aaa',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: 'e56a4ff9-cad0-489c-b5eb-94dbfc63f3ac',
    title: "Бег к цели",
    level: FitnessLevel.amateur,
    type: Exercise.running,
    trainingTime: TrainingTime.long,
    calories: 2800,
    gender: Gender.whatever,
    description: "Тренировка на развитие выносливости и правильной техники бега.",
    price: 1200,
    specialOffer: false,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aab',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: 'b18b3fb0-314f-4aff-904a-015d08be9d47',
    title: "Стретчинг",
    level: FitnessLevel.beginner,
    type: Exercise.stretching,
    trainingTime: TrainingTime.short,
    calories: 1000,
    gender: Gender.female,
    description: "Упражнения на растяжку и улучшение гибкости тела.",
    price: 1300,
    specialOffer: false,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aac',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: '0cc88507-5583-4bf9-8e6e-2df0362bd2b4',
    title: "Аэробика",
    level: FitnessLevel.beginner,
    type: Exercise.aerobics,
    trainingTime: TrainingTime.medium,
    calories: 2000,
    gender: Gender.female,
    description: "Динамичная тренировка под музыку для улучшения тонуса.",
    price: 1600,
    specialOffer: true,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aad',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: '44fb186c-0eb0-4093-a4d2-2e796bc1fda0',
    title: "Вызов себе",
    level: FitnessLevel.professional,
    type: Exercise.boxing,
    trainingTime: TrainingTime.long,
    calories: 4000,
    gender: Gender.male,
    description: "Тренировка для опытных спортсменов с отработкой комбинаций.",
    price: 3000,
    specialOffer: false,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aae',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: '15f3d584-4525-4595-b9b6-a8295f90bb85',
    title: "Жиросжигание",
    level: FitnessLevel.amateur,
    type: Exercise.crossfit,
    trainingTime: TrainingTime.long,
    calories: 1000,
    gender: Gender.whatever,
    description: "Высокоинтенсивные упражнения для сжигания калорий.",
    price: 2200,
    specialOffer: true,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aaf',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: '0ecf372b-260a-4acb-ace1-4a5b81941bd8',
    title: "Энергия",
    level: FitnessLevel.professional,
    type: Exercise.yoga,
    trainingTime: TrainingTime.medium,
    calories: 1800,
    gender: Gender.whatever,
    description: "Сложные асаны и дыхательные практики для опытных.",
    price: 1900,
    specialOffer: false,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015ab0',
    videoId: '68a30a546cb39008b0015aa4',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  }
];

const users = [
  {
    id: '110a0aeb-dbfb-4f27-8179-513185b00836',
    name: 'Виктор',
    email: 'victor@mail.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    birthday: '2015-06-18T00:00:00.000Z',
    gender: Gender.male,
    location: Location.petrogradskaya,
    role: Role.user,
    backgroundIds: ['68a30a546cb39008b0015aa0', '68a30a546cb39008b0015aa1']
  },
  {
    id: '5efb3f8b-efb0-4b11-ab65-9e916b23831c',
    name: 'Виктория',
    email: 'vika@mail.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    gender: Gender.female,
    location: Location.zvezdnaya,
    role: Role.coach,
    backgroundIds: ['68a30a546cb39008b0015aa2', '68a30a546cb39008b0015aa3']
  }
]

const userQuestionnaire = {
  id: '1953d3a5-9b4b-4fb8-93c2-d6ec5c8c7ab2',
  fitnessLevel: FitnessLevel.amateur,
  exercises: [Exercise.running, Exercise.crossfit],
  trainingTime: TrainingTime.long,
  caloriesLose: 1000,
  caloriesWaste: 3000,
  userId: '110a0aeb-dbfb-4f27-8179-513185b00836'
}

const coachQuestionnaire = {
  id: '1e887d43-df4a-4350-a2d3-e4e250835676',
  fitnessLevel: FitnessLevel.professional,
  exercises: [Exercise.running, Exercise.crossfit, Exercise.aerobics],
  qualifications: ['68a30a546cb39008b0015aa5', '68a30a546cb39008b0015aa6'],
  experience: 'Регулярно выполняю эту тренировку дома и вижу результат!',
  isPersonal: true,
  userId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
}

const orders = [
  {
    id: 'c753ce29-f619-4a8f-8190-1fbfbb579b4f',
    exercise: Exercise.crossfit,
    price: 2200,
    count: 2,
    amount: 4400,
    payment: PaymentMethod.mir,
    userId: '110a0aeb-dbfb-4f27-8179-513185b00836',
    trainingId: '15f3d584-4525-4595-b9b6-a8295f90bb85'
  },
  {
    id: 'f65c38c4-5e38-442f-97f7-48f29a5ccfdf',
    exercise: Exercise.aerobics,
    price: 1600,
    count: 2,
    amount: 3200,
    payment: PaymentMethod.visa,
    userId: '110a0aeb-dbfb-4f27-8179-513185b00836',
    trainingId: '0cc88507-5583-4bf9-8e6e-2df0362bd2b4'
  }
]

const feedbacks = [
  {
    id: 'f2d8bb21-85aa-4c6d-8581-420a4cec900c',
    assessment: 4,
    content: 'Пришел в CrossFit после тренажерного зала, где стало скучно. Здесь скучно не бывает никогда! Каждая тренировка – это новое функциональное испытание: работа с канатами, гирями, подтягивания, бурпи. Выкладываешься на все 100%. Коллектив очень supportive, все друг друга подбадривают, что помогает не сдаться. За полгода получил тело, о котором раньше только мечтал: сильное, выносливое и рельефное. Предупреждение: вызывает сильную зависимость!',
    authorId: '110a0aeb-dbfb-4f27-8179-513185b00836',
    trainingId: '15f3d584-4525-4595-b9b6-a8295f90bb85'
  },
  {
    id: '3403700a-78cf-4a97-b75c-287190770a7f',
    assessment: 3,
    content: 'Регулярно выполняю эту тренировку дома и вижу результат! Спина стала прямее, появилось больше сил и гибкость тоже стала лучше, хотя упражнения довольно простые.',
    authorId: '110a0aeb-dbfb-4f27-8179-513185b00836',
    trainingId: '15f3d584-4525-4595-b9b6-a8295f90bb85'
  }
]

async function seedDb(prismaClient: PrismaClient) {
  for(const user of users) {
    await prismaClient.user.create({
      data: user
    })
  }

  await prismaClient.questionnaire.create({
    data: userQuestionnaire
  });

  await prismaClient.questionnaire.create({
    data: coachQuestionnaire
  });


  for(const training of trainings) {
    await prismaClient.training.create({
      data: training
    })
  }

  for(const order of orders) {
    await prismaClient.order.create({
      data: order
    })
  }

  for(const feedback of feedbacks) {
    await prismaClient.feedback.create({
      data: feedback
    })
  }
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    prismaClient.$connect();
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error) {
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
