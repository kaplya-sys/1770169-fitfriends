/*
  Warnings:

  - You are about to drop the column `is_join_training` on the `friends` table. All the data in the column will be lost.
  - You are about to drop the column `is_personal_training` on the `friends` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserApplicationStatus" AS ENUM ('pending', 'rejected', 'accepted');

-- AlterTable
ALTER TABLE "friends" DROP COLUMN "is_join_training",
DROP COLUMN "is_personal_training";

-- CreateTable
CREATE TABLE "user-applications" (
    "id" TEXT NOT NULL,
    "initiator_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "status" "UserApplicationStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user-applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user-applications" ADD CONSTRAINT "user-applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
