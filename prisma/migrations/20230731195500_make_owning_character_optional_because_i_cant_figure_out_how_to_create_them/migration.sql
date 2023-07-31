-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owningCharacterId" INTEGER,
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
