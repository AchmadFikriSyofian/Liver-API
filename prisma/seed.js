// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
// //   // Seed data for Users
// //   const user1 = await prisma.users.create({
// //     data: {
// //       name: 'Achmad Fikri',
// //       email: 'achmad@gmail.com',
// //       password: 'pikri123',
// //       no_hp: '08123456789',
// //       jenis_kelamin: 'Male',
// //       is_admin: false,
// //     },
// //   });

// //   // Seed data for Users
// //   const user2 = await prisma.users.create({
// //     data: {
// //       name: 'Sabrina',
// //       email: 'sabrina@gmail.com',
// //       password: 'sabrina123',
// //       no_hp: '08993872154',
// //       jenis_kelamin: 'Male',
// //       is_admin: false,
// //     },
// //   });

// //   // Seed data for Admin
// //   const user3 = await prisma.users.create({
// //     data: {
// //       name: 'Rizki',
// //       email: 'rizki@gmail.com',
// //       password: 'rizki123',
// //       no_hp: '08765432100',
// //       jenis_kelamin: 'Male',
// //       is_admin: true,
// //     },
// //   });

  // Seed data for Categories
  const category1 = await prisma.categories.create({
    data: {
      name: 'Kotlin',
    },
  });

// //   const category2 = await prisma.categories.create({
// //     data: {
// //       name: 'JavaScript',
// //     },
// //   });

// //   const category3 = await prisma.categories.create({
// //     data: {
// //       name: 'Python',
// //     },
// //   });

// //   // Seed data for Mentors
// //   const mentor1 = await prisma.mentors.create({
// //     data: {
// //       name: 'Wawan',
// //     },
// //   });

// //   const mentor2 = await prisma.mentors.create({
// //     data: {
// //       name: 'Austin',
// //     },
// //   });

// //   const mentor3 = await prisma.mentors.create({
// //     data: {
// //       name: 'John',
// //     },
// //   })

// //   // Seed data for Courses
// //   const course1 = await prisma.courses.create({
// //     data: {
// //       name: 'Node JavaScript Dasar',
// //       desc: 'Course ini mempelajari tentang bagaimana menggunakan Node JS untuk pemula',
// //       price: '200.000',
// //       level: 'Beginner',
// //       type: 'isPremium',
// //       rating: 5,
// //       duration: 45
// //     },
// //   });

// //   const course2 = await prisma.courses.create({
// //     data: {
// //       name: 'Progressive Web App',
// //       desc: 'Progressive web apps merupakan metode pengembangan perangkat lunak terbaru yang memungkinkan pengguna merasakan pengalaman menggunakan aplikasi mobile melalui browser',
// //       price: '0',
// //       level: 'Intermediate',
// //       type: 'isFree',
// //       rating: 4,
// //       duration: 50
// //     },
// //   });

// //   const course3 = await prisma.courses.create({
// //     data: {
// //       name: 'Python Pemrograman Dasar',
// //       desc: 'Di kelas ini kita akan mempelajari Python dari cara install di Windows, Linux, atau Mac OS sampai bisa memahami beberapa kodingan yang bisa dilakukan oleh Python.',
// //       price: '0',
// //       level: 'Beginner',
// //       type: 'isFree',
// //       rating: 4,
// //       duration: 30
// //     },
// //   });
// //   const course4 = await prisma.courses.create({
// //     data: {
// //       name: 'Belajar Data Science dengan Python Pandas',
// //       desc: 'Di kelas ini kita akan mempelajari Python dari cara install di Windows, Linux, atau Mac OS sampai bisa memahami beberapa kodingan yang bisa dilakukan oleh Python.',
// //       price: '50.000',
// //       level: 'Beginner',
// //       type: 'isPremium',
// //       rating: 3,
// //       duration: 50
// //     },
// //   });

// //   const course5 = await prisma.courses.create({
// //     data: {
// //       name: 'Statistics for Data Science and Business Analysis',
// //       desc: 'Pada kelas ini, kita akan belajar dasar data analisis yang digunakan di Data Science. Dari sebuah dataset atau himpunan data “Heart Failure”, kita akan mulai dengan data preparation menggunakan Jupyter Notebook.',
// //       price: '0',
// //       level: 'Beginner',
// //       type: 'isFree',
// //       rating: 5,
// //       duration: 40
// //     },
// //   });

// //   const mentorsOnCourses1 = await prisma.mentorsOnCourses.create({
// //     data: {
// //       mentor_id: 1,
// //       course_id: 2
// //     }
// //   });

// //   const mentorsOnCourses2 = await prisma.mentorsOnCourses.create({
// //     data: {
// //       mentor_id: 1,
// //       course_id: 3
// //     }
// //   });

// //   const mentorsOnCourses3 = await prisma.mentorsOnCourses.create({
// //     data: {
// //       mentor_id: 2,
// //       course_id: 3
// //     }
// //   });

// //   const mentorsOnCourses4 = await prisma.mentorsOnCourses.create({
// //     data: {
// //       mentor_id: 2,
// //       course_id: 4
// //     }
// //   });

// //   const mentorsOnCourses5 = await prisma.mentorsOnCourses.create({
// //     data: {
// //       mentor_id: 3,
// //       course_id: 5
// //     }
// //   });

// //   const mentorsOnCourses6 = await prisma.mentorsOnCourses.create({
// //     data: {
// //       mentor_id: 3,
// //       course_id: 6
// //     }
// //   });

// //   const mentorsOnCourses7 = await prisma.mentorsOnCourses.create({
// //     data: {
// //       mentor_id: 1,
// //       course_id: 6
// //     }
// //   });

// //   const categoriesOnCourses1 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 2,
// //       course_id: 2
// //     }
// //   });

// //   const categoriesOnCourses2 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 2,
// //       course_id: 3
// //     }
// //   });

// //   const categoriesOnCourses3 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 3,
// //       course_id: 4
// //     }
// //   });

// //   const categoriesOnCourses4 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 3,
// //       course_id: 5
// //     }
// //   });

// //   const categoriesOnCourses5 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 3,
// //       course_id: 6
// //     }
// //   });

// //   const categoriesOnCourses6 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 12,
// //       course_id: 19
// //     }
// //   });

// //   const categoriesOnCourses7 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 13,
// //       course_id: 20
// //     }
// //   });

// //   const categoriesOnCourses8 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 13,
// //       course_id: 21
// //     }
// //   });
// //   const categoriesOnCourses9 = await prisma.categoriesOnCourses.create({
// //     data: {
// //       category_id: 13,
// //       course_id: 22
// //     }
// //   });

//   // Seed data for Chapters
// //   const chapter1 = await prisma.chapters.create({
// //     data: {
// //       name: 'Chapter 1',
// //       course_id_chapter: 4,
// //     },
// //   });

// //   const chapter2 = await prisma.chapters.create({
// //     data: {
// //       name: 'Chapter 2',
// //       course_id_chapter: 4,
// //     },
// //   });

// //   const chapter3 = await prisma.chapters.create({
// //     data: {
// //       name: 'Chapter 3',
// //       course_id_chapter: 4,
// //     },
// //   });

// //   const chapter4 = await prisma.chapters.create({
// //     data: {
// //       name: 'Chapter 1',
// //       course_id_chapter: 5,
// //     },
// //   });

// //   const chapter5 = await prisma.chapters.create({
// //     data: {
// //       name: 'Chapter 2',
// //       course_id_chapter: 5,
// //     },
// //   });

// //   const chapter6 = await prisma.chapters.create({
// //     data: {
// //       name: 'Chapter 3',
// //       course_id_chapter: 5,
// //     },
// //   });

// //   const chapter7 = await prisma.chapters.create({
// //     data: {
// //       name: 'Chapter 4',
// //       course_id_chapter: 5,
// //     },
// //   });

//   // Seed data for Lessons
//   const lesson1 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 1',
//       video: 'video_url_1',
//       desc: 'Description for Lesson 1',
//       chapter_id: 2,
//     },
//   });

//   const lesson2 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 2',
//       video: 'video_url_2',
//       desc: 'Description for Lesson 2',
//       chapter_id: 2,
//     },
//   });
  
//   const lesson3 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 3',
//       video: 'video_url_3',
//       desc: 'Description for Lesson 3',
//       chapter_id: 2,
//     },
//   });
//   const lesson4 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 1',
//       video: 'video_url_4',
//       desc: 'Description for Lesson 4',
//       chapter_id: 3,
//     },
//   });
//   const lesson5 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 2',
//       video: 'video_url_2',
//       desc: 'Description for Lesson 2',
//       chapter_id: 3,
//     },
//   });
//   const lesson6 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 3',
//       video: 'video_url_3',
//       desc: 'Description for Lesson 3',
//       chapter_id: 3,
//     },
//   });
//   const lesson7 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 1',
//       video: 'video_url_1',
//       desc: 'Description for Lesson 1',
//       chapter_id: 4,
//     },
//   });

//   const lesson8 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 2',
//       video: 'video_url_2',
//       desc: 'Description for Lesson 2',
//       chapter_id: 4,
//     },
//   });

//   const lesson9 = await prisma.lessons.create({
//     data: {
//       name: 'Materi 3',
//       video: 'video_url_3',
//       desc: 'Description for Lesson 3',
//       chapter_id: 4,
//     },
//   });

// //   // Seed data for Enrollments
// //   const enrollment1 = await prisma.enrollments.create({
// //     data: {
// //       payment: '249.000',
// //       user_id: 1,
// //       course_id_enrollment: 11,
// //     },
// //   });

// //   const enrollment2 = await prisma.enrollments.create({
// //     data: {
// //       payment: '249.000',
// //       user_id: 1,
// //       course_id_enrollment: 12,
// //     },
// //   });

// new script

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });