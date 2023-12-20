const courseRepository = require ('./../repositories/courses.repository');

const getByEnrollment = async ({user_id, limit, page, req}) => {
  return courseRepository.getByEnrollment ({user_id, limit, page, req});
};

module.exports = {getByEnrollment};
