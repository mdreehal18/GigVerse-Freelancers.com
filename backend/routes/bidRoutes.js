const express = require('express');
const router = express.Router();
const { placeBid, getBidsByJobId, acceptBid } = require('../controllers/bidController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateBidPlacement, sanitizeInput } = require('../middleware/validationMiddleware');

router.post('/save', authMiddleware, sanitizeInput, validateBidPlacement, placeBid);
router.get('/job/:jobId', getBidsByJobId);
router.get('/accept/:bidId', authMiddleware, acceptBid);

module.exports = router;
