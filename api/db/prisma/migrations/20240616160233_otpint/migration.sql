/*
  Warnings:

  - The `verification_otp` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `forgot_pass_otp` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verification_otp",
ADD COLUMN     "verification_otp" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "forgot_pass_otp",
ADD COLUMN     "forgot_pass_otp" INTEGER NOT NULL DEFAULT 0;
