/*
  Warnings:

  - Added the required column `username` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "power" REAL NOT NULL
);
INSERT INTO "new_Sample" ("id", "password", "power") SELECT "id", "password", "power" FROM "Sample";
DROP TABLE "Sample";
ALTER TABLE "new_Sample" RENAME TO "Sample";
CREATE UNIQUE INDEX "Sample_username_key" ON "Sample"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
