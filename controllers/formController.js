// Get paginated and filtered form submissions
exports.getFormsPaginated = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, email, name } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);
    
    const where = {};
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (name) where.name = { contains: name, mode: 'insensitive' };

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

    const baseUrl = req.protocol + '://' + req.get('host') + req.baseUrl + req.path;
    const totalPages = Math.ceil(total / pageSize);
    const currentPage = parseInt(page);
    const nav = {
      self: `${baseUrl}?page=${currentPage}&pageSize=${pageSize}`,
      first: `${baseUrl}?page=1&pageSize=${pageSize}`,
      last: `${baseUrl}?page=${totalPages}&pageSize=${pageSize}`,
      next: currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}&pageSize=${pageSize}` : null,
      prev: currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}&pageSize=${pageSize}` : null
    };
    res.json({
      success: true,
      data: submissions,
      page: currentPage,
      pageSize: parseInt(pageSize),
      total,
      totalPages,
      links: nav
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
// Log Prisma connection attempt (helps debugging on deployed servers like Render)
prisma.$connect().then(() => {
  console.log('Prisma connected to database');
}).catch((err) => {
  console.error('Prisma connection error:', err && err.stack ? err.stack : err);
});

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

// Delete form submission
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if submission exists
    const submission = await prisma.formSubmission.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!submission) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }
    
    // Delete submission (cascade will handle submissionServices)
    await prisma.formSubmission.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Update status for a submission (process/done)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
      const { status } = req.body;
      console.log(`updateStatus called for id=${id} with status=${status}`);
      // Accept the enum values defined in prisma schema
      if (!['processing', 'ongoing', 'done'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status' });
      }

      const updated = await prisma.formSubmission.update({
        where: { id: parseInt(id) },
        data: { status },
      });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('updateStatus error:', error && error.stack ? error.stack : error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Simple DB connectivity check
exports.debugDb = async (req, res) => {
  try {
    // run a lightweight query
    const count = await prisma.formSubmission.count();
    res.json({ success: true, message: 'DB reachable', count });
  } catch (err) {
    console.error('debugDb error:', err && err.stack ? err.stack : err);
    res.status(500).json({ success: false, error: 'DB unreachable', details: err && err.message ? err.message : String(err) });
  }
};
