
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Get paginated and filtered form submissions
router.get('/form/search', formController.getFormsPaginated);

// Submit form
router.post('/form', formController.submitForm);

// Get all form submissions
router.get('/form', formController.getForms);

// Delete form submission
router.delete('/form/:id', formController.deleteForm);

// Update status (process/done)
router.patch('/form/:id/status', formController.updateStatus);

// Debug DB connectivity
router.get('/debug/db', formController.debugDb);

module.exports = router;
