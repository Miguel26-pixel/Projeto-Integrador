-- CreateTable
CREATE TABLE "EXPERIMENT" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "EXPERIMENT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RASPBERRYPI" (
    "id" SERIAL NOT NULL,
    "piName" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "RASPBERRYPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PLANT" (
    "id" SERIAL NOT NULL,
    "piID" INTEGER NOT NULL,
    "experimentID" INTEGER NOT NULL,

    CONSTRAINT "PLANT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PLANTDATA" (
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "plantID" INTEGER NOT NULL,

    CONSTRAINT "PLANTDATA_pkey" PRIMARY KEY ("time")
);

-- CreateIndex
CREATE UNIQUE INDEX "PLANT_id_key" ON "PLANT"("id");

-- AddForeignKey
ALTER TABLE "PLANT" ADD CONSTRAINT "PLANT_experimentID_fkey" FOREIGN KEY ("experimentID") REFERENCES "EXPERIMENT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PLANT" ADD CONSTRAINT "PLANT_piID_fkey" FOREIGN KEY ("piID") REFERENCES "RASPBERRYPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PLANTDATA" ADD CONSTRAINT "PLANTDATA_plantID_fkey" FOREIGN KEY ("plantID") REFERENCES "PLANT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('"PLANTDATA"', 'time');


-- Populate
-- Experiments
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(1, 'Experiment1', './placeholder.png', 'This is a string containing more information about this experiment');
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(2, 'Experiment2', './placeholder.png', 'This is a string containing more information about this experiment');
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(3, 'Experiment3', './placeholder.png', 'This is a string containing more information about this experiment');
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(4, 'Experiment4', './placeholder.png', 'This is a string containing more information about this experiment');

-- RaspberryPis
INSERT INTO "RASPBERRYPI"("id", "piName", "ip")
    VALUES(1, 'Raspberry-1', '192.168.1.1');
INSERT INTO "RASPBERRYPI"("id", "piName", "ip")
    VALUES(2, 'Raspberry-2', '192.168.1.2');

--Plants
-- Experiment 1 Plants
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(1, 1, 1);
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(4, 1, 1);
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(5, 1, 1);
--Experiment 2 Plants
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(2, 1, 2);
--Experiment 3 Plants
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(3, 1, 3);
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(6, 1, 3);
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(7, 1, 3);
--Experiment 4 Plants
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(8, 2, 4);
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(9, 2, 4);
INSERT INTO "PLANT"("id", "piID", "experimentID") VALUES(10, 2, 4);

--Plant Data
-- plant1
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:15 AM', 21, 43, 27, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:16 AM', 21, 75, 97, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:17 AM', 28, 29, 99, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:18 AM', 30, 71, 46, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:19 AM', 21, 56, 24, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:20 AM', 22, 28, 18, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:21 AM', 24, 69, 9, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:22 AM', 23, 36, 4, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:23 AM', 30, 56, 16, 1);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220602 10:35:24 AM', 20, 44, 10, 1);
-- plant2
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:15 PM', 21, 43, 27, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:16 PM', 21, 75, 97, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:17 PM', 28, 29, 99, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:18 PM', 30, 71, 46, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:19 PM', 21, 56, 24, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:20 PM', 22, 28, 18, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:21 PM', 24, 69, 9, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:22 PM', 23, 36, 4, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:23 PM', 30, 56, 16, 2);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220604 02:41:24 PM', 20, 44, 10, 2);
-- plant 3
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:25 PM', 21, 43, 27, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:26 PM', 21, 75, 97, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:27 PM', 28, 29, 99, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:28 PM', 30, 71, 46, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:29 PM', 21, 56, 24, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:30 PM', 22, 28, 18, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:31 PM', 24, 69, 9, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:32 PM', 23, 36, 4, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:33 PM', 30, 56, 16, 3);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220607 08:03:34 PM', 20, 44, 10, 3);
-- plant 4
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:15 PM', 21, 43, 27, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:16 PM', 21, 75, 97, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:17 PM', 28, 29, 99, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:18 PM', 30, 71, 46, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:19 PM', 21, 56, 24, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:20 PM', 22, 28, 18, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:21 PM', 24, 69, 9, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:22 PM', 23, 36, 4, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:23 PM', 30, 56, 16, 4);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID") VALUES('20220610 06:35:24 PM', 20, 44, 10, 4);