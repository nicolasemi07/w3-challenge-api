-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "populationNumber" BIGINT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);
