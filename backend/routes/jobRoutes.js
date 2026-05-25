const express = require('express');
const router = express.Router();
const { createJob, getJobsByUserId, getJobById, getJobs, deleteJob, updateJob } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateJobCreation, sanitizeInput } = require('../middleware/validationMiddleware');

router.post('/new', authMiddleware, sanitizeInput, validateJobCreation, createJob);
router.get('/user/:userId', getJobsByUserId);
router.get('/view/:jobId', getJobById);
router.get('/all', getJobs);
router.delete('/delete/:jobId', authMiddleware, deleteJob);
router.put('/save/:jobId', authMiddleware, sanitizeInput, validateJobCreation, updateJob);

module.exports = router;
