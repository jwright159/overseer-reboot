/*
  Warnings:

  - Added the required column `sessionId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owningCharacterId` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaderId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owningCharacterId` to the `Strife` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    CONSTRAINT "Session_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Character_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Character_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("entityId", "id", "userId") SELECT "entityId", "id", "userId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_entityId_key" ON "Character"("entityId");
CREATE TABLE "new_Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owningCharacterId" INTEGER NOT NULL,
    "owningStrifeId" INTEGER,
    "strifeId" INTEGER,
    "teamId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "power" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "Entity_owningCharacterId_fkey" FOREIGN KEY ("owningCharacterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Entity_owningStrifeId_fkey" FOREIGN KEY ("owningStrifeId") REFERENCES "Strife" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Entity_strifeId_fkey" FOREIGN KEY ("strifeId") REFERENCES "Strife" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Entity_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entity" ("id", "name", "power", "strifeId", "teamId") SELECT "id", "name", "power", "strifeId", "teamId" FROM "Entity";
DROP TABLE "Entity";
ALTER TABLE "new_Entity" RENAME TO "Entity";
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "leaderId" INTEGER NOT NULL,
    CONSTRAINT "Team_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("id", "name") SELECT "id", "name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE TABLE "new_Strife" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owningCharacterId" INTEGER NOT NULL,
    CONSTRAINT "Strife_owningCharacterId_fkey" FOREIGN KEY ("owningCharacterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Strife" ("id") SELECT "id" FROM "Strife";
DROP TABLE "Strife";
ALTER TABLE "new_Strife" RENAME TO "Strife";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Session_adminId_key" ON "Session"("adminId");
