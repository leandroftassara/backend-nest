/*
  Warnings:

  - You are about to drop the column `verification_code` on the `users` table. All the data in the column will be lost.
  - Added the required column `verification_token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "verification_code",
ADD COLUMN     "verification_token" VARCHAR(128) NOT NULL;
