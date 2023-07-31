/*
  Warnings:

  - Made the column `owningCharacterId` on table `Entity` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "entityId" INTEGER,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Character_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Character_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("entityId", "id", "sessionId", "userId") SELECT "entityId", "id", "sessionId", "userId" FROM "Character";
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
INSERT INTO "new_Entity" ("id", "name", "owningCharacterId", "owningStrifeId", "power", "strifeId", "teamId") SELECT "id", "name", "owningCharacterId", "owningStrifeId", "power", "strifeId", "teamId" FROM "Entity";
DROP TABLE "Entity";
ALTER TABLE "new_Entity" RENAME TO "Entity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
