/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Character_id_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_userId_key" ON "Character"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
