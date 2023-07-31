/*
  Warnings:

  - Made the column `adminId` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    CONSTRAINT "Session_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("adminId", "id", "name") SELECT "adminId", "id", "name" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_name_key" ON "Session"("name");
CREATE UNIQUE INDEX "Session_adminId_key" ON "Session"("adminId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
