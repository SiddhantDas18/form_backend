-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ongoing', 'processing', 'done');

-- AlterTable
ALTER TABLE "public"."FormSubmission" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'processing';
