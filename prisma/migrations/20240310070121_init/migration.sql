/*
  Warnings:

  - You are about to drop the column `type` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the `Results` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `result` to the `Prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rythm` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_promptId_fkey";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "type",
ADD COLUMN     "result" TEXT NOT NULL,
ADD COLUMN     "rythm" TEXT NOT NULL;

-- DropTable
DROP TABLE "Results";
