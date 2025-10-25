-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "ref" TEXT,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);
