CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

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
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION NOT NULL,
    "light" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "gasConc" DOUBLE PRECISION NOT NULL,
    "piID" INTEGER NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_id_key" ON "Plant"("id");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_piID_fkey" FOREIGN KEY ("piID") REFERENCES "RasperryPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create time hypertable
SELECT create_hypertable('"Plant"', 'time');