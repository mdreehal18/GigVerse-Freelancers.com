// middleware/validationMiddleware.js

// Validate user registration
exports.validateRegister = (req, res, next) => {
  const { email, password, name, role } = req.body;
  
  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: 'Missing required fields: email, password, name, role' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Validate role
  if (role !== 'client' && role !== 'freelancer') {
    return res.status(400).json({ message: 'Role must be either "client" or "freelancer"' });
  }

  next();
};

// Validate user login
exports.validateLogin = (req, res, next) => {
  const { name, password } = req.body;
  
  if (!name || !password) {
    return res.status(400).json({ message: 'Missing required fields: name, password' });
  }

  next();
};

// Validate job creation
exports.validateJobCreation = (req, res, next) => {
  const { title, description, budget, skillsRequired } = req.body;
  
  if (!title || !description || !budget) {
    return res.status(400).json({ message: 'Missing required fields: title, description, budget' });
  }

  if (!budget.min || !budget.max) {
    return res.status(400).json({ message: 'Budget must have min and max values' });
  }

  if (budget.min < 0 || budget.max < 0) {
    return res.status(400).json({ message: 'Budget values cannot be negative' });
  }

  if (budget.min > budget.max) {
    return res.status(400).json({ message: 'Minimum budget cannot be greater than maximum budget' });
  }

  next();
};

// Validate bid placement
exports.validateBidPlacement = (req, res, next) => {
  const { amount, proposedCompletionDate, jobId } = req.body;
  
  if (!amount || !proposedCompletionDate || !jobId) {
    return res.status(400).json({ message: 'Missing required fields: amount, proposedCompletionDate, jobId' });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: 'Bid amount must be greater than 0' });
  }

  if (new Date(proposedCompletionDate) < new Date()) {
    return res.status(400).json({ message: 'Proposed completion date cannot be in the past' });
  }

  next();
};

// Sanitize user input to prevent XSS
exports.sanitizeInput = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str === 'string') {
      return str.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return str;
  };

  // Sanitize all string fields in req.body
  Object.keys(req.body).forEach(key => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizeString(req.body[key]);
    }
  });

  next();
};
