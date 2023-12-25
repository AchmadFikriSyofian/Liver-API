const enrollmentService = require ('./../services/enrollments.service');

const create = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      course_id: req.params.course_id,
      // user_id: req.user.id
    }
    const result = await enrollmentService.create (payload);

    res.status (200).json ({
      status: 'success',
      message: 'success',
      data: result,
    });
  } catch (error) {
    next (error);
  }
};

module.exports = {create};
