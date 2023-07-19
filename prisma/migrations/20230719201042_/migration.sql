-- RedefineIndex
DROP INDEX "Sample_username_key";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
