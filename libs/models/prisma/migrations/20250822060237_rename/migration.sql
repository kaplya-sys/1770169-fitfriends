-- CreateEnum
CREATE TYPE "Location" AS ENUM ('pionerskaya', 'petrogradskaya', 'udelnaya', 'zvezdnaya', 'sportivnaya');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male', 'whatever');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'coach');

-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('beginner', 'amateur', 'professional');

-- CreateEnum
CREATE TYPE "Exercise" AS ENUM ('yoga', 'running', 'boxing', 'stretching', 'crossfit', 'aerobics', 'pilates');

-- CreateEnum
CREATE TYPE "TrainingTime" AS ENUM ('short', 'medium', 'long', 'extraLong');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('visa', 'mir', 'umoney');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "avatarId" VARCHAR(36),
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3),
    "description" VARCHAR(140),
    "location" "Location" NOT NULL,
    "role" "Role" NOT NULL,
    "backgroundIds" TEXT[],
    "is_ready" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh-sessions" (
    "id" TEXT NOT NULL,
    "token_id" VARCHAR(36) NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "refresh-sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questionnaire" (
    "id" TEXT NOT NULL,
    "fitness_level" "FitnessLevel" NOT NULL,
    "exercises" "Exercise"[],
    "training_time" "TrainingTime",
    "qualificationIds" TEXT[],
    "calories_lose" INTEGER DEFAULT 0,
    "calories_waste" INTEGER DEFAULT 0,
    "experience" VARCHAR(140),
    "is_personal" BOOLEAN DEFAULT false,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balance" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "user_id" VARCHAR(36) NOT NULL,
    "training_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(15) NOT NULL,
    "backgroundId" VARCHAR(36) NOT NULL,
    "level" "FitnessLevel" NOT NULL,
    "type" "Exercise" NOT NULL,
    "training_time" "TrainingTime" NOT NULL,
    "calories" INTEGER NOT NULL DEFAULT 0,
    "gender" "Gender" NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "description" VARCHAR(140) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "videoId" VARCHAR(36) NOT NULL,
    "coachName" VARCHAR(15) NOT NULL,
    "special_offer" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "coach_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "assessment" INTEGER NOT NULL,
    "content" VARCHAR(1024) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" VARCHAR(36) NOT NULL,
    "training_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "exercise" "Exercise" NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment" "PaymentMethod" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" VARCHAR(36) NOT NULL,
    "training_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh-sessions_token_id_key" ON "refresh-sessions"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "questionnaire_user_id_key" ON "questionnaire"("user_id");

-- AddForeignKey
ALTER TABLE "refresh-sessions" ADD CONSTRAINT "refresh-sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questionnaire" ADD CONSTRAINT "questionnaire_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
