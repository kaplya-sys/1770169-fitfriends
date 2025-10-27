-- CreateTable
CREATE TABLE "subway-location" (
    "id" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "station" "Location" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subway-location_pkey" PRIMARY KEY ("id")
);
