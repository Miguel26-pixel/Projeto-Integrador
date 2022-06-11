-- CreateTable
CREATE TABLE "RasperryPI" (
    "id" SERIAL NOT NULL,
    "piName" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "RasperryPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "piID" INTEGER NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantData" (
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION NOT NULL,
    "light" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "gasConc" DOUBLE PRECISION NOT NULL,
    "plantId" INTEGER NOT NULL,

    CONSTRAINT "PlantData_pkey" PRIMARY KEY ("time")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_id_key" ON "Plant"("id");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_piID_fkey" FOREIGN KEY ("piID") REFERENCES "RasperryPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantData" ADD CONSTRAINT "PlantData_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- set up timescaledb
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('"PlantData"', 'time');