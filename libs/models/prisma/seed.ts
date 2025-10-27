import mongoose, {model, Types, Schema} from 'mongoose';
import {lookup} from 'mime-types';

import {
  PrismaClient,
  TrainingTime,
  FitnessLevel,
  Gender,
  Role,
  Exercise,
  Station,
  PaymentMethod
} from '../src';

const videos = [
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aa4'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9b3'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9b4'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9b5'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9b6'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9b7'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9b8'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9b9'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9ba'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  },
  {
    _id: new Types.ObjectId('68d0160abc54e7c1b40cb9bb'),
    catalog: 'video',
    subDirectory: 'video',
    originalName: 'test-video.mp4',
    size: 0,
    mimetype: lookup('test-video.mp4'),
    video: {
      hashName: 'test-video.mp4',
      path: 'video/test-video.mp4'
    }
  }
];

const qualifications = [
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aa5'),
    catalog: 'qualification',
    subDirectory: 'qualification',
    originalName: 'certificate-1.pdf',
    size: 0,
    mimetype: lookup('certificate-1.pdf'),
    document: {
      hashName: 'certificate-1.pdf',
      path: 'qualification/certificate-1.pdf'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aa6'),
    catalog: 'qualification',
    subDirectory: 'qualification',
    originalName: 'certificate-2.pdf',
    size: 0,
    mimetype: lookup('certificate-2.pdf'),
    document: {
      hashName: 'certificate-2.pdf',
      path: 'qualification/certificate-2.pdf'
    }
  }
];

const userBackgrounds = [
  {
    _id: new Types.ObjectId('68a6ad6bdee8982852ce77ee'),
    catalog: 'background',
    subDirectory: 'background/user',
    originalName: 'user-card-photo1.jpg',
    size: 0,
    mimetype: lookup('user-card-photo1.jpg'),
    image: {
      hashName: 'user-card-photo1.jpg',
      path: 'background/user/user-card-photo1.jpg'
    },
    image2x: {
      hashName: 'user-card-photo1@2x.jpg',
      path: 'background/user/user-card-photo1@2x.jpg'
    },
    imageWebp: {
      hashName: 'user-card-photo1.webp',
      path: 'background/user/user-card-photo1.webp'
    },
    imageWebp2x: {
      hashName: 'user-card-photo1@2x.webp',
      path: 'background/user/user-card-photo1@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a6ad6bdee8982852ce77ef'),
    catalog: 'background',
    subDirectory: 'background/user',
    originalName: 'user-card-photo2.jpg',
    size: 0,
    mimetype: lookup('user-card-photo2.jpg'),
    image: {
      hashName: 'user-card-photo2.jpg',
      path: 'background/user/user-card-photo2.jpg'
    },
    image2x: {
      hashName: 'user-card-photo2@2x.jpg',
      path: 'background/user/user-card-photo2@2x.jpg'
    },
    imageWebp: {
      hashName: 'user-card-photo2.webp',
      path: 'background/user/user-card-photo2.webp'
    },
    imageWebp2x: {
      hashName: 'user-card-photo2@2x.webp',
      path: 'background/user/user-card-photo2@2x.webp'
    }
  }
];

const coachBackgrounds = [
  {
    _id: new Types.ObjectId('68a6ad6bdee8982852ce77f0'),
    catalog: 'background',
    subDirectory: 'background/coach',
    originalName: 'user-coach-photo1.jpg',
    size: 0,
    mimetype: lookup('user-coach-photo1.jpg'),
    image: {
      hashName: 'user-coach-photo1.jpg',
      path: 'background/coach/user-coach-photo1.jpg'
    },
    image2x: {
      hashName: 'user-coach-photo1@2x.jpg',
      path: 'background/coach/user-coach-photo1@2x.jpg'
    },
    imageWebp: {
      hashName: 'user-coach-photo1.webp',
      path: 'background/coach/user-coach-photo1.webp'
    },
    imageWebp2x: {
      hashName: 'user-coach-photo1@2x.webp',
      path: 'background/coach/user-coach-photo1@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a6ad6bdee8982852ce77f1'),
    catalog: 'background',
    subDirectory: 'background/coach',
    originalName: 'user-coach-photo2.jpg',
    size: 0,
    mimetype: lookup('user-coach-photo2.jpg'),
    image: {
      hashName: 'user-coach-photo2.jpg',
      path: 'background/coach/user-coach-photo2.jpg'
    },
    image2x: {
      hashName: 'user-coach-photo2@2x.jpg',
      path: 'background/coach/user-coach-photo2@2x.jpg'
    },
    imageWebp: {
      hashName: 'user-coach-photo2.webp',
      path: 'background/coach/user-coach-photo2.webp'
    },
    imageWebp2x: {
      hashName: 'user-coach-photo2@2x.webp',
      path: 'background/coach/user-coach-photo2@2x.webp'
    }
  }
];

const trainingBackgrounds = [
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aa7'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-01.jpg',
    size: 0,
    mimetype: lookup('training-01.jpg'),
    image: {
      hashName: 'training-01.jpg',
      path: 'background/training/training-01.jpg'
    },
    image2x: {
      hashName: 'training-01@2x.jpg',
      path: 'background/training/training-01@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-01.webp',
      path: 'background/training/training-01.webp'
    },
    imageWebp2x: {
      hashName: 'training-01@2x.webp',
      path: 'background/training/training-01@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aa8'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-02.jpg',
    size: 0,
    mimetype: lookup('training-02.jpg'),
    image: {
      hashName: 'training-02.jpg',
      path: 'background/training/training-02.jpg'
    },
    image2x: {
      hashName: 'training-02@2x.jpg',
      path: 'background/training/training-02@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-02.webp',
      path: 'background/training/training-02.webp'
    },
    imageWebp2x: {
      hashName: 'training-02@2x.webp',
      path: 'background/training/training-02@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aa9'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-03.jpg',
    size: 0,
    mimetype: lookup('training-03.jpg'),
    image: {
      hashName: 'training-03.jpg',
      path: 'background/training/training-03.jpg'
    },
    image2x: {
      hashName: 'training-03@2x.jpg',
      path: 'background/training/training-03@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-03.webp',
      path: 'background/training/training-03.webp'
    },
    imageWebp2x: {
      hashName: 'training-03@2x.webp',
      path: 'background/training/training-03@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aaa'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-04.jpg',
    size: 0,
    mimetype: lookup('training-04.jpg'),
    image: {
      hashName: 'training-04.jpg',
      path: 'background/training/training-04.jpg'
    },
    image2x: {
      hashName: 'training-04@2x.jpg',
      path: 'background/training/training-04@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-04.webp',
      path: 'background/training/training-04.webp'
    },
    imageWebp2x: {
      hashName: 'training-04@2x.webp',
      path: 'background/training/training-04@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aab'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-05.jpg',
    size: 0,
    mimetype: lookup('training-05.jpg'),
    image: {
      hashName: 'training-05.jpg',
      path: 'background/training/training-05.jpg'
    },
    image2x: {
      hashName: 'training-05@2x.jpg',
      path: 'background/training/training-05@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-05.webp',
      path: 'background/training/training-05.webp'
    },
    imageWebp2x: {
      hashName: 'training-05@2x.webp',
      path: 'background/training/training-05@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aac'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-06.jpg',
    size: 0,
    mimetype: lookup('training-06.jpg'),
    image: {
      hashName: 'training-06.jpg',
      path: 'background/training/training-06.jpg'
    },
    image2x: {
      hashName: 'training-06@2x.jpg',
      path: 'background/training/training-06@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-06.webp',
      path: 'background/training/training-06.webp'
    },
    imageWebp2x: {
      hashName: 'training-06@2x.webp',
      path: 'background/training/training-06@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aad'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-07.jpg',
    size: 0,
    mimetype: lookup('training-07.jpg'),
    image: {
      hashName: 'training-07.jpg',
      path: 'background/training/training-07.jpg'
    },
    image2x: {
      hashName: 'training-07@2x.jpg',
      path: 'background/training/training-07@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-07.webp',
      path: 'background/training/training-07.webp'
    },
    imageWebp2x: {
      hashName: 'training-07@2x.webp',
      path: 'background/training/training-07@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aae'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-08.jpg',
    size: 0,
    mimetype: lookup('training-08.jpg'),
    image: {
      hashName: 'training-08.jpg',
      path: 'background/training/training-08.jpg'
    },
    image2x: {
      hashName: 'training-08@2x.jpg',
      path: 'background/training/training-08@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-08.webp',
      path: 'background/training/training-08.webp'
    },
    imageWebp2x: {
      hashName: 'training-08@2x.webp',
      path: 'background/training/training-08@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015aaf'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-09.jpg',
    size: 0,
    mimetype: lookup('training-09.jpg'),
    image: {
      hashName: 'training-09.jpg',
      path: 'background/training/training-09.jpg'
    },
    image2x: {
      hashName: 'training-09@2x.jpg',
      path: 'background/training/training-09@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-09.webp',
      path: 'background/training/training-09.webp'
    },
    imageWebp2x: {
      hashName: 'training-09@2x.webp',
      path: 'background/training/training-09@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a30a546cb39008b0015ab0'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-10.jpg',
    size: 0,
    mimetype: lookup('training-10.jpg'),
    image: {
      hashName: 'training-10.jpg',
      path: 'background/training/training-10.jpg'
    },
    image2x: {
      hashName: 'training-10@2x.jpg',
      path: 'background/training/training-10@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-10.webp',
      path: 'background/training/training-10.webp'
    },
    imageWebp2x: {
      hashName: 'training-10@2x.webp',
      path: 'background/training/training-10@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a6ad6bdee8982852ce77f2'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-11.jpg',
    size: 0,
    mimetype: lookup('training-11.jpg'),
    image: {
      hashName: 'training-11.jpg',
      path: 'background/training/training-11.jpg'
    },
    image2x: {
      hashName: 'training-11@2x.jpg',
      path: 'background/training/training-11@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-11.webp',
      path: 'background/training/training-11.webp'
    },
    imageWebp2x: {
      hashName: 'training-11@2x.webp',
      path: 'background/training/training-11@2x.webp'
    }
  },
  {
    _id: new Types.ObjectId('68a6ad6bdee8982852ce77f3'),
    catalog: 'background',
    subDirectory: 'background/training',
    originalName: 'training-12.jpg',
    size: 0,
    mimetype: lookup('training-12.jpg'),
    image: {
      hashName: 'training-12.jpg',
      path: 'background/training/training-12.jpg'
    },
    image2x: {
      hashName: 'training-12@2x.jpg',
      path: 'background/training/training-12@2x.jpg'
    },
    imageWebp: {
      hashName: 'training-12.webp',
      path: 'background/training/training-12.webp'
    },
    imageWebp2x: {
      hashName: 'training-12@2x.webp',
      path: 'background/training/training-12@2x.webp'
    }
  }
];

const feedbacks = [
  {
    id: 'f2d8bb21-85aa-4c6d-8581-420a4cec900c',
    assessment: 5,
    content: 'Пришел в CrossFit после тренажерного зала, где стало скучно. Здесь скучно не бывает никогда! Каждая тренировка – это новое функциональное испытание: работа с канатами, гирями, подтягивания, бурпи. Выкладываешься на все 100%. Коллектив очень supportive, все друг друга подбадривают, что помогает не сдаться. За полгода получил тело, о котором раньше только мечтал: сильное, выносливое и рельефное. Предупреждение: вызывает сильную зависимость!',
    authorId: '110a0aeb-dbfb-4f27-8179-513185b00836',
    trainingId: '15f3d584-4525-4595-b9b6-a8295f90bb85'
  },
  {
    id: '3403700a-78cf-4a97-b75c-287190770a7f',
    assessment: 5,
    content: 'Регулярно выполняю эту тренировку дома и вижу результат! Спина стала прямее, появилось больше сил и гибкость тоже стала лучше, хотя упражнения довольно простые.',
    authorId: '110a0aeb-dbfb-4f27-8179-513185b00836',
    trainingId: '15f3d584-4525-4595-b9b6-a8295f90bb85'
  }
];

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
    price: 2250,
    specialOffer: true,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aa8',
    videoId: '68d0160abc54e7c1b40cb9b3',
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
    videoId: '68d0160abc54e7c1b40cb9b4',
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
    price: 1620,
    specialOffer: true,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aaa',
    videoId: '68d0160abc54e7c1b40cb9b5',
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
    videoId: '68d0160abc54e7c1b40cb9b6',
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
    videoId: '68d0160abc54e7c1b40cb9b7',
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
    price: 1440,
    specialOffer: true,
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aad',
    videoId: '68d0160abc54e7c1b40cb9b8',
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
    videoId: '68d0160abc54e7c1b40cb9b9',
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
    price: 1980,
    specialOffer: true,
    rating: Math.round(feedbacks.map((feedback) => feedback.assessment).reduce((acc, value, _, array) => acc + value / array.length, 0)),
    coachName: 'Виктория',
    backgroundId: '68a30a546cb39008b0015aaf',
    videoId: '68d0160abc54e7c1b40cb9ba',
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
    videoId: '68d0160abc54e7c1b40cb9bb',
    coachId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  }
];

const metroStations = [
  {
    id: 'a6252f41-ef7d-4323-bde4-2c5cb9252fa3',
    latitude: 59.966399,
    longitude: 30.311511,
    station: Station.petrogradskaya
  },
  {
    id: '1bf1efea-86a0-4679-b70b-d108f3634e8b',
    latitude: 60.002863,
    longitude: 30.296682,
    station: Station.pionerskaya
  },
  {
    id: 'd41b9936-fedf-4278-bd3c-03708906204d',
    latitude: 59.950190,
    longitude: 30.288335,
    station: Station.sportivnaya
  },
  {
    id: '2b205c64-c155-4bd7-b31a-078a35fdabc6',
    latitude: 60.016896,
    longitude: 30.316290,
    station: Station.udelnaya
  },
  {
    id: 'ceee95b0-7e31-4a76-95a6-77acdefecfb5',
    latitude: 59.833283,
    longitude: 30.349262,
    station: Station.zvezdnaya
  }
]

const users = [
  {
    id: '110a0aeb-dbfb-4f27-8179-513185b00836',
    name: 'Виктор',
    email: 'victor@mail.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    birthday: '2015-06-18T00:00:00.000Z',
    gender: Gender.male,
    stationId: 'a6252f41-ef7d-4323-bde4-2c5cb9252fa3',
    role: Role.user,
    backgroundIds: ['68a6ad6bdee8982852ce77ee', '68a6ad6bdee8982852ce77ef']
  },
  {
    id: '5efb3f8b-efb0-4b11-ab65-9e916b23831c',
    name: 'Виктория',
    email: 'vika@mail.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    gender: Gender.female,
    stationId: 'ceee95b0-7e31-4a76-95a6-77acdefecfb5',
    role: Role.coach,
    backgroundIds: ['68a6ad6bdee8982852ce77f0', '68a6ad6bdee8982852ce77f1']
  },
  {
    id: '61d1ffbf-5d0b-417d-8ba8-9989b85a667e',
    name: 'Артём',
    email: 'jones-sonya35@yandex.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    birthday: '2013-08-18T00:00:00.000Z',
    gender: Gender.male,
    stationId: '2b205c64-c155-4bd7-b31a-078a35fdabc6',
    role: Role.user,
    backgroundIds: ['68a6ad6bdee8982852ce77ee', '68a6ad6bdee8982852ce77ef']
  },
  {
    id: 'd9eeda2a-088f-4d06-8c33-7bd610c70257',
    name: 'София',
    email: 'solano_sherrie84@mail.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    gender: Gender.female,
    stationId: '1bf1efea-86a0-4679-b70b-d108f3634e8b',
    role: Role.coach,
    backgroundIds: ['68a6ad6bdee8982852ce77f0', '68a6ad6bdee8982852ce77f1']
  },
  {
    id: '70c6380e-2ce2-4df4-9ab8-395fdee57714',
    name: 'Роберт',
    email: 'wilson_marcus31@gmail.com',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    birthday: '2012-02-18T00:00:00.000Z',
    gender: Gender.male,
    stationId: 'd41b9936-fedf-4278-bd3c-03708906204d',
    role: Role.user,
    backgroundIds: ['68a6ad6bdee8982852ce77ee', '68a6ad6bdee8982852ce77ef']
  },
  {
    id: '00feb0c6-ad1b-430f-b8b0-1bd806980ca9',
    name: 'Вероника',
    email: 'hurley-dakota67@yandex.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    gender: Gender.female,
    stationId: 'ceee95b0-7e31-4a76-95a6-77acdefecfb5',
    role: Role.user,
    backgroundIds: ['68a6ad6bdee8982852ce77f0', '68a6ad6bdee8982852ce77f1']
  },
  {
    id: '56248ec1-5e1e-4f3c-9328-19ee161276cb',
    name: 'Антон',
    email: 'boyce-hagan10@gmail.com',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    birthday: '2011-04-18T00:00:00.000Z',
    gender: Gender.male,
    stationId: '1bf1efea-86a0-4679-b70b-d108f3634e8b',
    role: Role.user,
    backgroundIds: ['68a6ad6bdee8982852ce77ee', '68a6ad6bdee8982852ce77ef']
  },
  {
    id: '66826b10-0365-411b-9dc0-269944b97fbc',
    name: 'Екатерина',
    email: 'ponce_stevan37@list.ru',
    password: '$2b$10$WzCJFgeNKS7Gk6nRtvd2WOfzFpz9/i4yc5ky6HeW2JeUbjekwxM26',
    gender: Gender.female,
    stationId: '2b205c64-c155-4bd7-b31a-078a35fdabc6',
    role: Role.user,
    backgroundIds: ['68a6ad6bdee8982852ce77f0', '68a6ad6bdee8982852ce77f1']
  },
];

const userQuestionnaires = [
  {
    id: '1953d3a5-9b4b-4fb8-93c2-d6ec5c8c7ab2',
    fitnessLevel: FitnessLevel.amateur,
    exercises: [Exercise.running, Exercise.crossfit],
    trainingTime: TrainingTime.long,
    caloriesLose: 2100,
    caloriesWaste: 4600,
    userId: '110a0aeb-dbfb-4f27-8179-513185b00836'
  },
  {
    id: '3924dd47-4f2f-445e-9e66-1429e804ca20',
    fitnessLevel: FitnessLevel.professional,
    exercises: [Exercise.boxing, Exercise.crossfit, Exercise.pilates],
    trainingTime: TrainingTime.medium,
    caloriesLose: 1000,
    caloriesWaste: 5000,
    userId: '61d1ffbf-5d0b-417d-8ba8-9989b85a667e'
  },
  {
    id: '1111050a-ffe0-46ca-9329-edcb24fb0706',
    fitnessLevel: FitnessLevel.beginner,
    exercises: [Exercise.stretching],
    trainingTime: TrainingTime.short,
    caloriesLose: 3100,
    caloriesWaste: 4500,
    userId: '70c6380e-2ce2-4df4-9ab8-395fdee57714'
  },
  {
    id: '01a133f2-9327-4a17-b9de-8966365e09d8',
    fitnessLevel: FitnessLevel.beginner,
    exercises: [Exercise.running, Exercise.aerobics, Exercise.yoga],
    trainingTime: TrainingTime.extraLong,
    caloriesLose: 1000,
    caloriesWaste: 3000,
    userId: '00feb0c6-ad1b-430f-b8b0-1bd806980ca9'
  },
  {
    id: '4a7f5480-6aca-40b9-80e8-806504f21545',
    fitnessLevel: FitnessLevel.amateur,
    exercises: [Exercise.aerobics, Exercise.stretching],
    trainingTime: TrainingTime.medium,
    caloriesLose: 1800,
    caloriesWaste: 3900,
    userId: '56248ec1-5e1e-4f3c-9328-19ee161276cb'
  },
  {
    id: 'c5c1d25d-3392-4ee4-9472-ea97c0548064',
    fitnessLevel: FitnessLevel.professional,
    exercises: [Exercise.yoga, Exercise.crossfit, Exercise.boxing],
    trainingTime: TrainingTime.long,
    caloriesLose: 2000,
    caloriesWaste: 3500,
    userId: '66826b10-0365-411b-9dc0-269944b97fbc'
  }
];

const coachQuestionnaires = [
  {
    id: '1e887d43-df4a-4350-a2d3-e4e250835676',
    fitnessLevel: FitnessLevel.professional,
    exercises: [Exercise.running, Exercise.crossfit, Exercise.aerobics],
    qualificationIds: ['68a30a546cb39008b0015aa6'],
    experience: 'Умение составлять и корректировать тренировочные планы в зависимости от индивидуальных запросов и физических возможностей клиентов.',
    isPersonal: true,
    userId: '5efb3f8b-efb0-4b11-ab65-9e916b23831c'
  },
  {
    id: '45484449-fb1a-4e7f-ab54-fa35e3a3f506',
    fitnessLevel: FitnessLevel.beginner,
    exercises: [Exercise.yoga, Exercise.stretching, Exercise.boxing],
    qualificationIds: ['68a30a546cb39008b0015aa5'],
    experience: 'Умение составлять и корректировать тренировочные планы в зависимости от индивидуальных запросов и физических возможностей клиентов.',
    isPersonal: false,
    userId: 'd9eeda2a-088f-4d06-8c33-7bd610c70257'
  }
];

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
];

async function seed(prismaClient: PrismaClient) {
  for(const metroStation of metroStations) {
    await prismaClient.metroStation.create({
      data: metroStation
    })
  }

  for(const user of users) {
    await prismaClient.user.create({
      data: user
    })
  }

  for(const userQuestionnaire of userQuestionnaires) {
    await prismaClient.questionnaire.create({
      data: userQuestionnaire
    });
  }

  for(const coachQuestionnaire of coachQuestionnaires) {
    await prismaClient.questionnaire.create({
      data: coachQuestionnaire
    });
  }

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

async function seedFiles() {
  const filesSchema = new Schema({
    originalName: {
      type: String,
      required: true
    },
    subDirectory: {
      type: String,
      required: true
    },
    catalog: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    image: {
      type: Object,
      required: false
    },
    image2x: {
      type: Object,
      required: false
    },
    imageWebp: {
      type: Object,
      required: false
    },
    imageWebp2x: {
      type: Object,
      required: false
    },
    video: {
      type: Object,
      required: false
    },
    document: {
      type: Object,
      required: false
    }
  });
  const FileModel = model('files', filesSchema);

  for(const video of videos) {
    const newModel = new FileModel(video);
    await newModel.save();
  }

  for(const userBackground of userBackgrounds) {
    const newModel = new FileModel(userBackground);
    await newModel.save();
  }

  for(const coachBackground of coachBackgrounds) {
    const newModel = new FileModel(coachBackground);
    await newModel.save();
  }

  for(const qualification of qualifications) {
    const newModel = new FileModel(qualification);
    await newModel.save();
  }

  for(const trainingBackground of trainingBackgrounds) {
    const newModel = new FileModel(trainingBackground);
    await newModel.save();
  }
}

async function bootstrap() {
  const {
    MONGO_INITDB_NAME,
    MONGO_INITDB_HOST,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_PORT,
    MONGO_AUTH_SOURCE
  } = process.env;
  const mongoUrl = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_INITDB_HOST}:${MONGO_INITDB_PORT}/${MONGO_INITDB_NAME}?authSource=${MONGO_AUTH_SOURCE}`;
  const prismaClient = new PrismaClient();

  try {
    prismaClient.$connect();
    mongoose.connect(mongoUrl);
    await seedFiles();
    await seed(prismaClient);
    globalThis.process.exit(0);
  } catch (error) {
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
