const enrollmentRepositories = require ('./../repositories/enrollment');

const create = async (req, res, next) => {
  try {
    const result = await enrollmentRepositories.create (req);

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
