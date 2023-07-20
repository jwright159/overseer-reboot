/*
  Warnings:

  - The primary key for the `Character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Character` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "power" REAL NOT NULL DEFAULT 0,

    PRIMARY KEY ("username", "name"),
    CONSTRAINT "Character_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("power") SELECT "power" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE TABLE "new_User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("password", "username") SELECT "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
