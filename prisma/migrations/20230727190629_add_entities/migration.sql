/*
  Warnings:

  - You are about to drop the column `name` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `power` on the `Character` table. All the data in the column will be lost.
  - Added the required column `entityId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "power" REAL NOT NULL DEFAULT 0
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Character_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("id", "userId") SELECT "id", "userId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_entityId_key" ON "Character"("entityId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
