-- DropForeignKey
ALTER TABLE "ReadingList" DROP CONSTRAINT "ReadingList_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "placeholder" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ReadingList" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
