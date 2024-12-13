/*
  Warnings:

  - Added the required column `ambienteId` to the `colecao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "colecao" ADD COLUMN     "ambienteId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "colecao" ADD CONSTRAINT "colecao_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "ambiente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
