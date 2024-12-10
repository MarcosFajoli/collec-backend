/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `livro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `categoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `estilo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "livro" DROP CONSTRAINT "livro_categoriaId_fkey";

-- AlterTable
ALTER TABLE "livro" DROP COLUMN "categoriaId";

-- CreateTable
CREATE TABLE "livro_categoria" (
    "livroId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "livro_categoria_pkey" PRIMARY KEY ("livroId","categoriaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_key" ON "categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estilo_nome_key" ON "estilo"("nome");

-- AddForeignKey
ALTER TABLE "livro_categoria" ADD CONSTRAINT "livro_categoria_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livro_categoria" ADD CONSTRAINT "livro_categoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
