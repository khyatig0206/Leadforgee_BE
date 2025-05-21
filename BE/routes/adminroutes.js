const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController")
const {sendMessage, getAllContacts, markViewed} = require("../controllers/contactController")

router.post('/login', loginAdmin);
router.post('/contacts', sendMessage);
router.get('/contacts', getAllContacts);
router.patch('/contact/:id/viewed',markViewed);

module.exports = router;