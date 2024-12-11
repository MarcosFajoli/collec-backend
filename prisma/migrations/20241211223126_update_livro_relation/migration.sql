/*
  Warnings:

  - Added the required column `ambienteId` to the `livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "livro" ADD COLUMN     "ambienteId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "ambiente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
