import {PrismaClient, Station} from '../src';

const metroStations = [
  {
    latitude: 59.966399,
    longitude: 30.311511,
    station: Station.petrogradskaya
  },
  {
    latitude: 60.002863,
    longitude: 30.296682,
    station: Station.pionerskaya
  },
  {
    latitude: 59.950190,
    longitude: 30.288335,
    station: Station.sportivnaya
  },
  {
    latitude: 60.016896,
    longitude: 30.316290,
    station: Station.udelnaya
  },
  {
    latitude: 59.833283,
    longitude: 30.349262,
    station: Station.zvezdnaya
  }
]


async function seed(prismaClient: PrismaClient) {
  for(const metroStation of metroStations) {
    await prismaClient.metroStation.create({
      data: metroStation
    })
  }
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    prismaClient.$connect();
    await seed(prismaClient);
    globalThis.process.exit(0);
  } catch (error) {
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
