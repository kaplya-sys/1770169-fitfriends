/*
  Warnings:

  - You are about to drop the column `location` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `subway-location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `station_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Station" AS ENUM ('pionerskaya', 'petrogradskaya', 'udelnaya', 'zvezdnaya', 'sportivnaya');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "location",
ADD COLUMN     "station_id" VARCHAR(36) NOT NULL;

-- DropTable
DROP TABLE "subway-location";

-- DropEnum
DROP TYPE "Location";

-- CreateTable
CREATE TABLE "metro-stations" (
    "id" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "name" "Station" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "metro-stations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "metro-stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
