const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
//   // Seed data for Users
//   const user1 = await prisma.users.create({
//     data: {
//       name: 'Achmad Fikri',
//       email: 'achmad@gmail.com',
//       password: 'pikri123',
//       no_hp: '08123456789',
//       foto_profile: 'foto',
//       country: 'Indonesia',
//       city: 'Semarang',
//       is_active: false,
//       is_admin: false
//     },
//   });

//   // Seed data for Users
//   const user2 = await prisma.users.create({
//     data: {
//       name: 'Sabrina',
//       email: 'sabrina@gmail.com',
//       password: 'sabrina123',
//       no_hp: '08993872154',
//       foto_profile: 'foto',
//       country: 'Indonesia',
//       city: 'Semarang',
//       is_active: false,
//       is_admin: false
//     },
//   });

//   // Seed data for Admin
//   const user3 = await prisma.users.create({
//     data: {
//       name: 'Rizki',
//       email: 'rizki@gmail.com',
//       password: 'rizki123',
//       no_hp: '08765432100',
//       foto_profile: 'foto',
//       country: 'Indonesia',
//       city: 'Semarang',
//       is_active: false,
//       is_admin: false
//     },
//   });

//   // Seed data for Admin
//   const user4 = await prisma.users.create({
//     data: {
//       name: 'Nurul',
//       email: 'nurul@gmail.com',
//       password: 'nurul123',
//       no_hp: '08765542310',
//       foto_profile: 'foto',
//       country: 'Indonesia',
//       city: 'Semarang',
//       is_active: true,
//       is_admin: true
//     },
//   });

//   // Seed data for Categories
//   const category1 = await prisma.categories.create({
//     data: {
//       name: 'UI/UX',
//       image: 'foto'
//     },
//   });

//   const category2 = await prisma.categories.create({
//     data: {
//       name: 'JavaScript',
//       image: 'foto'
//     },
//   });

//   const category3 = await prisma.categories.create({
//     data: {
//       name: 'Python',
//       image: 'foto'
//     },
//   });

//   // Seed data for Mentors
//   const mentor1 = await prisma.mentors.create({
//     data: {
//       name: 'Wawan',
//     },
//   });

//   const mentor2 = await prisma.mentors.create({
//     data: {
//       name: 'Austin',
//     },
//   });

//   const mentor3 = await prisma.mentors.create({
//     data: {
//       name: 'John',
//     },
//   })

//   // Seed data for Courses
//   const course1 = await prisma.courses.create({
//     data: {
//       name: 'Node JavaScript Dasar',
//       desc: 'Course ini mempelajari tentang bagaimana menggunakan Node JS untuk pemula',
//       price: '200.000',
//       level: 'Beginner',
//       rating: 4.8,
//       type: 'isPremium',
//       image: 'foto'
//     },
//   });

//   const course2 = await prisma.courses.create({
//     data: {
//       name: 'Progressive Web App',
//       desc: 'Progressive web apps merupakan metode pengembangan perangkat lunak terbaru yang memungkinkan pengguna merasakan pengalaman menggunakan aplikasi mobile melalui browser',
//       price: '0',
//       level: 'Intermediate',
//       rating: 4.7,
//       type: 'isFree',
//       image: 'foto'
//     },
//   });

//   const course3 = await prisma.courses.create({
//     data: {
//       name: 'Python Pemrograman Dasar',
//       desc: 'Di kelas ini kita akan mempelajari Python dari cara install di Windows, Linux, atau Mac OS sampai bisa memahami beberapa kodingan yang bisa dilakukan oleh Python.',
//       price: '0',
//       level: 'Beginner',
//       rating: 4.8,
//       type: 'isFree',
//       image: 'foto'
//     },
//   });
//   const course4 = await prisma.courses.create({
//     data: {
//       name: 'Belajar Data Science dengan Python Pandas',
//       desc: 'Di kelas ini kita akan mempelajari Python dari cara install di Windows, Linux, atau Mac OS sampai bisa memahami beberapa kodingan yang bisa dilakukan oleh Python.',
//       price: '50.000',
//       level: 'Beginner',
//       rating: 5.0,
//       type: 'isPremium',
//       image: 'foto'
//     },
//   });

//   const course5 = await prisma.courses.create({
//     data: {
//       name: 'Statistics for Data Science and Business Analysis',
//       desc: 'Pada kelas ini, kita akan belajar dasar data analisis yang digunakan di Data Science. Dari sebuah dataset atau himpunan data “Heart Failure”, kita akan mulai dengan data preparation menggunakan Jupyter Notebook.',
//       price: '0',
//       level: 'Beginner',
//       rating: 4.6,
//       type: 'isPremium',
//       image: 'foto',
//     },
//   });

  // const mentorsOnCourses1 = await prisma.mentorsOnCourses.create({
  //   data: {
  //     mentor_id: 1,
  //     course_id: 3
  //   }
  // });

  // const mentorsOnCourses2 = await prisma.mentorsOnCourses.create({
  //   data: {
  //     mentor_id: 1,
  //     course_id: 4
  //   }
  // });

  // const mentorsOnCourses3 = await prisma.mentorsOnCourses.create({
  //   data: {
  //     mentor_id: 2,
  //     course_id: 1
  //   }
  // });

  // const mentorsOnCourses4 = await prisma.mentorsOnCourses.create({
  //   data: {
  //     mentor_id: 3,
  //     course_id: 1
  //   }
  // });

  // const mentorsOnCourses5 = await prisma.mentorsOnCourses.create({
  //   data: {
  //     mentor_id: 2,
  //     course_id: 2
  //   }
  // });

  // const mentorsOnCourses6 = await prisma.mentorsOnCourses.create({
  //   data: {
  //     mentor_id: 3,
  //     course_id: 2
  //   }
  // });

  // const mentorsOnCourses7 = await prisma.mentorsOnCourses.create({
  //   data: {
  //     mentor_id: 1,
  //     course_id: 5
  //   }
  // });

  // const categoriesOnCourses1 = await prisma.categoriesOnCourses.create({
  //   data: {
  //     category_id: 2,
  //     course_id: 1
  //   }
  // });

  // const categoriesOnCourses2 = await prisma.categoriesOnCourses.create({
  //   data: {
  //     category_id: 1,
  //     course_id: 2
  //   }
  // });

  // const categoriesOnCourses3 = await prisma.categoriesOnCourses.create({
  //   data: {
  //     category_id: 2,
  //     course_id: 2
  //   }
  // });

  // const categoriesOnCourses4 = await prisma.categoriesOnCourses.create({
  //   data: {
  //     category_id: 3,
  //     course_id: 3
  //   }
  // });

  // const categoriesOnCourses5 = await prisma.categoriesOnCourses.create({
  //   data: {
  //     category_id: 3,
  //     course_id: 4
  //   }
  // });

  // const categoriesOnCourses6 = await prisma.categoriesOnCourses.create({
  //   data: {
  //     category_id: 3,
  //     course_id: 5
  //   }
  // });

  // const categoriesOnCourses7 = await prisma.categoriesOnCourses.create({
  //   data: {
  //     category_id: 2,
  //     course_id: 5
  //   }
  // });

  // // Seed data for Chapters
  // const chapter1 = await prisma.chapters.create({
  //   data: {
  //     name: 'Chapter 1',
  //     course_id_chapter: 1,
  //   },
  // });

  // const chapter2 = await prisma.chapters.create({
  //   data: {
  //     name: 'Chapter 2',
  //     course_id_chapter: 1,
  //   },
  // });

  // const chapter3 = await prisma.chapters.create({
  //   data: {
  //     name: 'Chapter 3',
  //     course_id_chapter: 1,
  //   },
  // });

  // const chapter4 = await prisma.chapters.create({
  //   data: {
  //     name: 'Chapter 1',
  //     course_id_chapter: 2,
  //   },
  // });

  // const chapter5 = await prisma.chapters.create({
  //   data: {
  //     name: 'Chapter 2',
  //     course_id_chapter: 2,
  //   },
  // });

  // const chapter6 = await prisma.chapters.create({
  //   data: {
  //     name: 'Chapter 3',
  //     course_id_chapter: 2,
  //   },
  // });

  // const chapter7 = await prisma.chapters.create({
  //   data: {
  //     name: 'Chapter 4',
  //     course_id_chapter: 2,
  //   },
  // });

  // // Seed data for Lessons
  // const lesson1 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 1',
  //     video: 'video_url_1',
  //     desc: 'Description for Lesson 1',
  //     chapter_id: 1,
  //     duration: 15
  //   },
  // });

  // const lesson2 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 2',
  //     video: 'video_url_2',
  //     desc: 'Description for Lesson 2',
  //     chapter_id: 2,
  //     duration: 35
  //   },
  // });
  
  // const lesson3 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 3',
  //     video: 'video_url_3',
  //     desc: 'Description for Lesson 3',
  //     chapter_id: 3,
  //     duration: 40
  //   },
  // });
  // const lesson4 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 1',
  //     video: 'video_url_4',
  //     desc: 'Description for Lesson 4',
  //     chapter_id: 4,
  //     duration: 30
  //   },
  // });
  // const lesson5 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 2',
  //     video: 'video_url_2',
  //     desc: 'Description for Lesson 2',
  //     chapter_id: 5,
  //     duration: 42
  //   },
  // });
  // const lesson6 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 3',
  //     video: 'video_url_3',
  //     desc: 'Description for Lesson 3',
  //     chapter_id: 6,
  //     duration: 27
  //   },
  // });
  // const lesson7 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 1',
  //     video: 'video_url_1',
  //     desc: 'Description for Lesson 1',
  //     chapter_id: 4,
  //     duration: 34
  //   },
  // });

  // const lesson8 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 2',
  //     video: 'video_url_2',
  //     desc: 'Description for Lesson 2',
  //     chapter_id: 5,
  //     duration: 54
  //   },
  // });

  // const lesson9 = await prisma.lessons.create({
  //   data: {
  //     name: 'Materi 3',
  //     video: 'video_url_3',
  //     desc: 'Description for Lesson 3',
  //     chapter_id: 6,
  //     duration: 56
  //   },
  // });

  // // Seed data for Enrollments
  // const enrollment1 = await prisma.enrollments.create({
  //   data: {
  //     payment: '249.000',
  //     user_id: 3,
  //     course_id_enrollment: 1,
  //   },
  // });

  // const enrollment2 = await prisma.enrollments.create({
  //   data: {
  //     payment: '249.000',
  //     user_id: 4,
  //     course_id_enrollment: 2,
  //   },
  // });

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