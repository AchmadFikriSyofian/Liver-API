const enrollmentService = require ('./../services/enrollments.service');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');       
const {JWT_SECRET_KEY} = process.env;
const { sendOTPByEmail, getHtml, sendEmail } = require('../utils/nodemailer');

const create = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      course_id: req.params.course_id,
      user_id: req.user.id
    }
    const result = await enrollmentService.create (payload);

    // ngirim email disini
    let token = jwt.sign({ enrollment_id: result.id, user_id: req.user.id }, JWT_SECRET_KEY);
    let link = `http://localhost:3000/payment/?token=${token}`;
    let html = await getHtml('payment-confirmation.ejs', { link })

    // sendEmail(email, html);


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
