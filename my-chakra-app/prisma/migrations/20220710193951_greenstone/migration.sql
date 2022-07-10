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
    "hostname" TEXT NOT NULL,

    CONSTRAINT "RASPBERRYPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RASPBERRYPIPORT" (
    "id" SERIAL NOT NULL,
    "raspberryID" INTEGER NOT NULL,
    "port" TEXT NOT NULL,
    "plantID" INTEGER NOT NULL,

    CONSTRAINT "RASPBERRYPIPORT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PLANT" (
    "id" SERIAL NOT NULL,
    "plantName" TEXT NOT NULL,
    "plantInfo" TEXT,
    "raspberryPiPortID" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "RASPBERRYPI_hostname_key" ON "RASPBERRYPI"("hostname");

-- CreateIndex
CREATE UNIQUE INDEX "RASPBERRYPIPORT_plantID_key" ON "RASPBERRYPIPORT"("plantID");

-- CreateIndex
CREATE UNIQUE INDEX "RASPBERRYPIPORT_raspberryID_port_key" ON "RASPBERRYPIPORT"("raspberryID", "port");

-- CreateIndex
CREATE UNIQUE INDEX "PLANT_raspberryPiPortID_key" ON "PLANT"("raspberryPiPortID");

-- AddForeignKey
ALTER TABLE "RASPBERRYPIPORT" ADD CONSTRAINT "RASPBERRYPIPORT_raspberryID_fkey" FOREIGN KEY ("raspberryID") REFERENCES "RASPBERRYPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PLANT" ADD CONSTRAINT "PLANT_experimentID_fkey" FOREIGN KEY ("experimentID") REFERENCES "EXPERIMENT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PLANT" ADD CONSTRAINT "PLANT_raspberryPiPortID_fkey" FOREIGN KEY ("raspberryPiPortID") REFERENCES "RASPBERRYPIPORT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PLANTDATA" ADD CONSTRAINT "PLANTDATA_plantID_fkey" FOREIGN KEY ("plantID") REFERENCES "PLANT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('"PLANTDATA"', 'time');

-- Populate
-- Experiments
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(9996, 'Experiment1', './placeholder.png', 'This is a string containing more information about this experiment');
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(9997, 'Experiment2', './placeholder.png', 'This is a string containing more information about this experiment');
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(9998, 'Experiment3', '.png', 'This is a string containing more information about this experiment');
INSERT INTO "EXPERIMENT"("id", "name", "image", "info")
    VALUES(9999, 'Experiment4', './placeholder.png', 'This is a string containing more information about this experiment');

-- RaspberryPis
INSERT INTO "RASPBERRYPI"("id", "hostname")
    VALUES(9998, 'Raspberry-1');
INSERT INTO "RASPBERRYPI"("id", "hostname")
    VALUES(9999, 'Raspberry-2');

--Plants
-- Experiment 1 Plants
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9989, 9998, 'dev/tty0', 9989);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9989, 'Plant0', 9989, 9996);
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9992, 9998, 'dev/tty3', 9992);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9992, 'Plant4', 9992, 9996);
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9993, 9998, 'dev/tty4', 9993);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9993, 'Plant5', 9993, 9996);
--Experiment 2 Plants
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9990, 9998, 'dev/tty1', 9990);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9990, 'Plant2', 9990, 9997);
--Experiment 3 Plants
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9991, 9998, 'dev/tty2', 9991);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9991, 'Plant3', 9991, 9998);
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9994, 9998, 'dev/tty5', 9994);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9994, 'Plant6', 9994, 9998);
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9995, 9998, 'dev/tty6', 9995);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9995, 'Plant1', 9995, 9998);
--Experiment 4 Plants
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9996, 9999, 'dev/tty0', 9996);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9996, 'Plant8', 9996, 9999);
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9997, 9999, 'dev/tty1', 9997);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9997, 'Plant9', 9997, 9999);
INSERT INTO "RASPBERRYPIPORT"("id", "raspberryID", "port", "plantID")       VALUES(9998, 9999, 'dev/tty2', 9998);
INSERT INTO "PLANT"("id", "plantName", "raspberryPiPortID", "experimentID")    VALUES(9998, 'Plant10', 9998, 9999);

--Plant Data
-- plant1
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:15 AM', 21, 43, 27, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:16 AM', 21, 75, 97, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:17 AM', 28, 29, 99, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:18 AM', 30, 71, 46, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:19 AM', 21, 56, 24, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:20 AM', 22, 28, 18, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:21 AM', 24, 69, 9, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:22 AM', 23, 36, 4, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:23 AM', 30, 56, 16, 9989);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220602 10:35:24 AM', 20, 44, 10, 9989);
-- plant2
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:15 PM', 21, 43, 27, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:16 PM', 21, 75, 97, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:17 PM', 28, 29, 99, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:18 PM', 30, 71, 46, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:19 PM', 21, 56, 24, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:20 PM', 22, 28, 18, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:21 PM', 24, 69, 9, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:22 PM', 23, 36, 4, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:23 PM', 30, 56, 16, 9990);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220604 02:41:24 PM', 20, 44, 10, 9990);
-- plant 3
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:25 PM', 21, 43, 27, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:26 PM', 21, 75, 97, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:27 PM', 28, 29, 99, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:28 PM', 30, 71, 46, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:29 PM', 21, 56, 24, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:30 PM', 22, 28, 18, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:31 PM', 24, 69, 9, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:32 PM', 23, 36, 4, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:33 PM', 30, 56, 16, 9991);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220607 08:03:34 PM', 20, 44, 10, 9991);
-- plant 4
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:15 PM', 21, 43, 27, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:16 PM', 21, 75, 97, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:17 PM', 28, 29, 99, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:18 PM', 30, 71, 46, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:19 PM', 21, 56, 24, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:20 PM', 22, 28, 18, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:21 PM', 24, 69, 9, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:22 PM', 23, 36, 4, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:23 PM', 30, 56, 16, 9992);
INSERT INTO "PLANTDATA"("time", "temperature", "humidity", "distance", "plantID")
    VALUES('20220610 06:35:24 PM', 20, 44, 10, 9992);