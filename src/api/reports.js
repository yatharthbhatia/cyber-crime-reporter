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

export async function escalateReport(reportId, escalationData) {
  const { authority, priority, details } = escalationData;
  const report = await prisma.report.update({
    where: { id: reportId },
    data: {
      status: 'ESCALATED',
      escalatedTo: authority,
      escalatedAt: new Date(),
      escalationRef: `CR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
      priority,
    },
  });
  return report;
}

export async function getEscalatedReports(filters = {}) {
  const reports = await prisma.report.findMany({
    where: {
      status: 'ESCALATED',
      ...filters,
    },
    orderBy: {
      escalatedAt: 'desc',
    },
  });
  return reports;
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