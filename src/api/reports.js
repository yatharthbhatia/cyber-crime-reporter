import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createReport(reportData, userId) {
  const report = await prisma.report.create({
    data: {
      ...reportData,
      userId,
    },
  });
  return report;
}

export async function getReports(userId, filters = {}) {
  const reports = await prisma.report.findMany({
    where: {
      userId,
      ...filters,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reports;
}

export async function updateReportStatus(reportId, status) {
  const report = await prisma.report.update({
    where: { id: reportId },
    data: { status },
  });
  return report;
}

export async function getEmergencyContacts() {
  const contacts = await prisma.emergencyContact.findMany({
    orderBy: {
      type: 'asc',
    },
  });
  return contacts;
}

export async function createEmergencyContact(contactData) {
  const contact = await prisma.emergencyContact.create({
    data: contactData,
  });
  return contact;
}