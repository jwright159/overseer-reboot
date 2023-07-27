/*
  Warnings:

  - Added the required column `teamId` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Strife" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "strifeId" INTEGER,
    "teamId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "power" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "Entity_strifeId_fkey" FOREIGN KEY ("strifeId") REFERENCES "Strife" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Entity_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entity" ("id", "name", "power") SELECT "id", "name", "power" FROM "Entity";
DROP TABLE "Entity";
ALTER TABLE "new_Entity" RENAME TO "Entity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
