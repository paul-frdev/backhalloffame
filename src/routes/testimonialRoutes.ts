const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  updateIsActiveTestimonial,
  deleteTestimonialId,
} = require('../controller/testimonialController');
const express = require('express');
const route = express.Router();

route.post('/', createTestimonial);
route.get('/', getTestimonials);
route.get('/:id', getTestimonialById);
route.put('/active/:id', updateIsActiveTestimonial);
route.put('/:id', updateTestimonial);
route.delete('/:id', deleteTestimonialId);

module.exports = route;
