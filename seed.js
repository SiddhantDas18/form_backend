const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedData = [
  {
    name: "John Smith",
    role: "Groom",
    email: "john.smith@email.com",
    mobile: "+1234567890",
    services: ["Photography", "Videography"],
    eventDates: "2024-06-15",
    weddingOf: "John & Sarah",
    venues: "Grand Hotel Ballroom",
    heardFrom: "Google",
    dreams: "Outdoor ceremony with sunset photos",
    budget: "$5000-$8000",
    coverage: "Full day coverage"
  },
  {
    name: "Emily Johnson",
    role: "Bride",
    email: "emily.johnson@gmail.com",
    mobile: "+1987654321",
    services: ["Photography", "Makeup"],
    eventDates: "2024-08-20",
    weddingOf: "Emily & Michael",
    venues: "Beach Resort",
    heardFrom: "Instagram",
    dreams: "Beach wedding with natural lighting",
    budget: "$3000-$5000",
    coverage: "Ceremony and reception"
  },
  {
    name: "David Wilson",
    role: "Groom",
    email: "david.w@yahoo.com",
    mobile: "+1555123456",
    services: ["Videography", "DJ"],
    eventDates: "2024-09-10",
    weddingOf: "David & Lisa",
    venues: "Mountain Lodge",
    heardFrom: "Friend referral",
    dreams: "Rustic mountain wedding",
    budget: "$8000-$12000",
    coverage: "Full weekend"
  },
  {
    name: "Sarah Brown",
    role: "Bride",
    email: "sarah.brown@outlook.com",
    mobile: "+1777888999",
    services: ["Photography", "Flowers"],
    eventDates: "2024-07-05",
    weddingOf: "Sarah & James",
    venues: "Garden Venue",
    heardFrom: "Wedding fair",
    dreams: "Garden party style wedding",
    budget: "$4000-$6000",
    coverage: "Half day"
  },
  {
    name: "Michael Davis",
    role: "Groom",
    email: "m.davis@company.com",
    mobile: "+1333444555",
    services: ["Photography", "Videography", "Catering"],
    eventDates: "2024-10-12",
    weddingOf: "Michael & Anna",
    venues: "City Hall",
    heardFrom: "Google",
    dreams: "Elegant city wedding",
    budget: "$10000+",
    coverage: "Full day with extras"
  },
  {
    name: "Jessica Martinez",
    role: "Bride",
    email: "jessica.martinez@hotmail.com",
    mobile: "+1666777888",
    services: ["Photography", "Makeup", "Flowers"],
    eventDates: "2024-11-25",
    weddingOf: "Jessica & Carlos",
    venues: "Historic Mansion",
    heardFrom: "Pinterest",
    dreams: "Vintage themed wedding",
    budget: "$6000-$9000",
    coverage: "Ceremony only"
  },
  {
    name: "Robert Taylor",
    role: "Groom",
    email: "rob.taylor@gmail.com",
    mobile: "+1444555666",
    services: ["Videography", "DJ", "Catering"],
    eventDates: "2024-05-18",
    weddingOf: "Robert & Amanda",
    venues: "Lakeside Pavilion",
    heardFrom: "Facebook",
    dreams: "Lakeside ceremony with live music",
    budget: "$12000+",
    coverage: "Full weekend"
  },
  {
    name: "Amanda Chen",
    role: "Bride",
    email: "amanda.chen@email.com",
    mobile: "+1222333444",
    services: ["Photography", "Videography"],
    eventDates: "2024-04-22",
    weddingOf: "Amanda & Kevin",
    venues: "Art Gallery",
    heardFrom: "Google",
    dreams: "Modern artistic wedding",
    budget: "$7000-$10000",
    coverage: "Full day"
  },
  {
    name: "Kevin Anderson",
    role: "Groom",
    email: "k.anderson@work.com",
    mobile: "+1888999000",
    services: ["Photography", "DJ"],
    eventDates: "2024-12-14",
    weddingOf: "Kevin & Rachel",
    venues: "Winter Lodge",
    heardFrom: "Instagram",
    dreams: "Winter wonderland theme",
    budget: "$5000-$8000",
    coverage: "Reception focus"
  },
  {
    name: "Rachel Thompson",
    role: "Bride",
    email: "rachel.t@personal.net",
    mobile: "+1111222333",
    services: ["Makeup", "Flowers", "Catering"],
    eventDates: "2024-03-30",
    weddingOf: "Rachel & Daniel",
    venues: "Country Club",
    heardFrom: "Wedding magazine",
    dreams: "Classic elegant reception",
    budget: "$9000-$12000",
    coverage: "Reception and dinner"
  },
  {
    name: "Daniel Garcia",
    role: "Groom",
    email: "daniel.garcia@mail.com",
    mobile: "+1555666777",
    services: ["Photography", "Videography", "DJ"],
    eventDates: "2024-07-28",
    weddingOf: "Daniel & Maria",
    venues: "Rooftop Terrace",
    heardFrom: "Friend referral",
    dreams: "City skyline backdrop",
    budget: "$8000-$11000",
    coverage: "Full day coverage"
  },
  {
    name: "Maria Rodriguez",
    role: "Bride",
    email: "maria.rodriguez@yahoo.com",
    mobile: "+1777888999",
    services: ["Photography", "Makeup"],
    eventDates: "2024-09-07",
    weddingOf: "Maria & Alex",
    venues: "Botanical Garden",
    heardFrom: "TikTok",
    dreams: "Garden party with natural beauty",
    budget: "$4000-$7000",
    coverage: "Ceremony and portraits"
  },
  {
    name: "Alex White",
    role: "Groom",
    email: "alex.white@company.org",
    mobile: "+1333444555",
    services: ["Videography", "Catering"],
    eventDates: "2024-06-08",
    weddingOf: "Alex & Sophie",
    venues: "Vineyard Estate",
    heardFrom: "Google",
    dreams: "Wine country celebration",
    budget: "$10000+",
    coverage: "Full day with rehearsal"
  },
  {
    name: "Sophie Miller",
    role: "Bride",
    email: "sophie.miller@outlook.com",
    mobile: "+1999000111",
    services: ["Photography", "Flowers", "DJ"],
    eventDates: "2024-08-03",
    weddingOf: "Sophie & Ryan",
    venues: "Beach House",
    heardFrom: "Instagram",
    dreams: "Intimate beach celebration",
    budget: "$6000-$9000",
    coverage: "Half day"
  },
  {
    name: "Ryan Clark",
    role: "Groom",
    email: "ryan.clark@email.net",
    mobile: "+1666777888",
    services: ["Photography", "Videography", "Makeup"],
    eventDates: "2024-10-19",
    weddingOf: "Ryan & Nicole",
    venues: "Forest Chapel",
    heardFrom: "Wedding fair",
    dreams: "Rustic forest wedding",
    budget: "$7000-$10000",
    coverage: "Ceremony and reception"
  }
];

async function seed() {
  try {
    console.log('Seeding database...');
    
    for (const data of seedData) {
      // Create services first
      const serviceRecords = await Promise.all(
        data.services.map(async (serviceName) => {
          return prisma.service.upsert({
            where: { name: serviceName },
            update: {},
            create: { name: serviceName }
          });
        })
      );

      // Create form submission
      await prisma.formSubmission.create({
        data: {
          name: data.name,
          role: data.role,
          email: data.email,
          mobile: data.mobile,
          eventDates: data.eventDates,
          weddingOf: data.weddingOf,
          venues: data.venues,
          heardFrom: data.heardFrom,
          dreams: data.dreams,
          budget: data.budget,
          coverage: data.coverage,
          submissionServices: {
            create: serviceRecords.map((service) => ({
              service: { connect: { id: service.id } }
            }))
          }
        }
      });
    }
    
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();