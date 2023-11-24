// seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed data for Users
  const user1 = await prisma.users.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      no_hp: '08123456789',
      jenis_kelamin: 'Male',
      is_admin: false,
    },
  });

  const user2 = await prisma.users.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password456',
      no_hp: '08765432100',
      jenis_kelamin: 'Female',
      is_admin: true,
    },
  });

  // Seed data for Categories
  const category1 = await prisma.categories.create({
    data: {
      name: 'Programming',
    },
  });

  const category2 = await prisma.categories.create({
    data: {
      name: 'Design',
    },
  });

  // Seed data for Mentors
  const mentor1 = await prisma.mentors.create({
    data: {
      name: 'Mentor1 Name',
    },
  });

  const mentor2 = await prisma.mentors.create({
    data: {
      name: 'Mentor2 Name',
    },
  });

  // Seed data for Courses
  const course1 = await prisma.courses.create({
    data: {
      name: 'Web Development',
      desc: 'Learn web development from scratch.',
      price: '100000',
      level: 'Beginner',
      type: 'isPremium',
    },
  });

  const course2 = await prisma.courses.create({
    data: {
      name: 'Graphic Design',
      desc: 'Master the art of graphic design.',
      price: '80000',
      level: 'Intermediate',
      type: 'isFree',
    },
  });

  // Seed data for Chapters
  const chapter1 = await prisma.chapters.create({
    data: {
      name: 'Chapter 1',
      course_id_chapter: course1.id,
    },
  });

  const chapter2 = await prisma.chapters.create({
    data: {
      name: 'Chapter 2',
      course_id_chapter: course2.id,
    },
  });

  // Seed data for Lessons
  const lesson1 = await prisma.lessons.create({
    data: {
      name: 'Lesson 1',
      video: 'video_url_1',
      desc: 'Description for Lesson 1',
      chapter_id: chapter1.id,
    },
  });

  const lesson2 = await prisma.lessons.create({
    data: {
      name: 'Lesson 2',
      video: 'video_url_2',
      desc: 'Description for Lesson 2',
      chapter_id: chapter2.id,
    },
  });

  // Seed data for Enrollments
  const enrollment1 = await prisma.enrollments.create({
    data: {
      payment: '50000',
      user_id: user1.id,
      course_id_enrollment: course1.id,
    },
  });

  const enrollment2 = await prisma.enrollments.create({
    data: {
      payment: '0',
      user_id: user2.id,
      course_id_enrollment: course2.id,
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
