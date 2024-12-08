-- CreateTable
CREATE TABLE "conta" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambiente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contaId" INTEGER NOT NULL,

    CONSTRAINT "ambiente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambiente_userlist" (
    "ambienteId" INTEGER NOT NULL,
    "contaId" INTEGER NOT NULL,

    CONSTRAINT "ambiente_userlist_pkey" PRIMARY KEY ("ambienteId","contaId")
);

-- CreateTable
CREATE TABLE "estilo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "estilo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estiloId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colecao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "colecao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livros_colecao" (
    "colecaoId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,

    CONSTRAINT "livros_colecao_pkey" PRIMARY KEY ("colecaoId","livroId")
);

-- CreateIndex
CREATE UNIQUE INDEX "conta_email_key" ON "conta"("email");

-- AddForeignKey
ALTER TABLE "ambiente" ADD CONSTRAINT "ambiente_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambiente_userlist" ADD CONSTRAINT "ambiente_userlist_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "ambiente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambiente_userlist" ADD CONSTRAINT "ambiente_userlist_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "conta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_estiloId_fkey" FOREIGN KEY ("estiloId") REFERENCES "estilo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livros_colecao" ADD CONSTRAINT "livros_colecao_colecaoId_fkey" FOREIGN KEY ("colecaoId") REFERENCES "colecao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livros_colecao" ADD CONSTRAINT "livros_colecao_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
