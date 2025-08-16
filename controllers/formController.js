// Get paginated and filtered form submissions
exports.getFormsPaginated = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, email } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);
    const where = email ? { email: { contains: email, mode: 'insensitive' } } : {};

    const [submissions, total] = await Promise.all([
      prisma.formSubmission.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          submissionServices: { include: { service: true } }
        }
      }),
      prisma.formSubmission.count({ where })
    ]);

    res.json({
      success: true,
      data: submissions,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      total,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
// Get all form submissions
exports.getForms = async (req, res) => {
  try {
    const submissions = await prisma.formSubmission.findMany({
      include: {
        submissionServices: { include: { service: true } }
      }
    });
    res.json({ success: true, data: submissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/form
exports.submitForm = async (req, res) => {
  try {
    const {
      name,
      role,
      email,
      mobile,
      services, // array of service names
      eventDates,
      weddingOf,
      venues,
      heardFrom,
      dreams,
      budget,
      coverage
    } = req.body;

    // Find or create services
    const serviceRecords = await Promise.all(
      (services || []).map(async (serviceName) => {
        return prisma.service.upsert({
          where: { name: serviceName },
          update: {},
          create: { name: serviceName }
        });
      })
    );

    // Create form submission with service relations
    const submission = await prisma.formSubmission.create({
      data: {
        name,
        role,
        email,
        mobile,
        eventDates,
        weddingOf,
        venues,
        heardFrom,
        dreams,
        budget,
        coverage,
        submissionServices: {
          create: serviceRecords.map((service) => ({ service: { connect: { id: service.id } } }))
        }
      },
      include: {
        submissionServices: { include: { service: true } }
      }
    });

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
