-- CreateTable
CREATE TABLE "ReadingList" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ReadingList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
