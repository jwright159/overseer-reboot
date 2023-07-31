-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "leaderId" INTEGER,
    CONSTRAINT "Team_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("id", "leaderId", "name") SELECT "id", "leaderId", "name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
