-- CreateTable
CREATE TABLE "public"."FormSubmission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "eventDates" TEXT NOT NULL,
    "weddingOf" TEXT NOT NULL,
    "venues" TEXT NOT NULL,
    "heardFrom" TEXT NOT NULL,
    "dreams" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "coverage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubmissionService" (
    "formSubmissionId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "SubmissionService_pkey" PRIMARY KEY ("formSubmissionId","serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "public"."Service"("name");

-- AddForeignKey
ALTER TABLE "public"."SubmissionService" ADD CONSTRAINT "SubmissionService_formSubmissionId_fkey" FOREIGN KEY ("formSubmissionId") REFERENCES "public"."FormSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubmissionService" ADD CONSTRAINT "SubmissionService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
