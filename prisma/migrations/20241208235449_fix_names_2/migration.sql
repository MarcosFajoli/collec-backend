/*
  Warnings:

  - You are about to drop the column `name` on the `ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `conta` table. All the data in the column will be lost.
  - Added the required column `nome` to the `ambiente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `conta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ambiente" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "conta" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;
