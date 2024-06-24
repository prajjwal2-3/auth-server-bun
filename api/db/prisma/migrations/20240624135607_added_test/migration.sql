-- CreateTable
CREATE TABLE "testUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "testUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testUser_id_key" ON "testUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "testUser_email_key" ON "testUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "testUser_phone_number_key" ON "testUser"("phone_number");
