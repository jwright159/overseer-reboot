/*
  Warnings:

  - Added the required column `password` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT NOT NULL,
    "power" REAL NOT NULL
);
INSERT INTO "new_Sample" ("id", "power") SELECT "id", "power" FROM "Sample";
DROP TABLE "Sample";
ALTER TABLE "new_Sample" RENAME TO "Sample";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
