/*
  Warnings:

  - You are about to drop the column `name` on the `metro-stations` table. All the data in the column will be lost.
  - Added the required column `station` to the `metro-stations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "metro-stations" DROP COLUMN "name",
ADD COLUMN     "station" "Station" NOT NULL;
