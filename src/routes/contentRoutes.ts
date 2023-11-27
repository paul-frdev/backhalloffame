const { getAbout, createAbout, updateAbout, getAboutUs } = require('../controller/aboutController');
const { getContactsId, createContacts, updateContacts, getContacts } = require('../controller/contactsController');
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
module.exports = router;
