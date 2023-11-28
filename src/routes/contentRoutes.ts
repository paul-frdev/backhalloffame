const { getAbout, createAbout, updateAbout, getAboutUs } = require('../controller/aboutController');
const { getContactsId, createContacts, updateContacts, getContacts } = require('../controller/contactsController');
const { createRefund, getRefund, getRefundId, updateRefund } = require('../controller/refundController');
const express = require('express');

const router = express.Router();

//about
router.get('/about/:id', getAbout);
router.post('/about', createAbout);
router.put('/about/:id', updateAbout);
router.get('/about', getAboutUs);

// contacts
router.get('/contacts/:id', getContactsId);
router.post('/contacts', createContacts);
router.put('/contacts/:id', updateContacts);
router.get('/contacts', getContacts);

// get refund
router.get('/refund/:id', getRefundId);
router.post('/refund', createRefund);
router.put('/refund/:id', updateRefund);
router.get('/refund', getRefund);

module.exports = router;
