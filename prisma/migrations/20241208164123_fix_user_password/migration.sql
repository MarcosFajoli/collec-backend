/*
  Warnings:

  - You are about to drop the column `senha` on the `conta` table. All the data in the column will be lost.
  - Added the required column `password` to the `conta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conta" DROP COLUMN "senha",
ADD COLUMN     "password" TEXT NOT NULL;
