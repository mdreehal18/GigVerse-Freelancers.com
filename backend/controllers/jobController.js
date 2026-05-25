// controllers/jobController.js
const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: 'User information is missing' });
    }

    try {
        const job = new Job({
            ...req.body,
            createdBy: req.user._id
        });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: 'Error creating job', error: error.message });
    }
};


exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('createdBy', 'name');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        // Check if user is the job creator
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }
        const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true, runValidators: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Error updating job', error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        // Check if user is the job creator
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }
        await Job.findByIdAndDelete(req.params.jobId);
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
};

exports.getJobsByUserId = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.params.userId });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs by user', error: error.message });
    }
};


exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job', error: error.message });
    }
};

// Job controller
exports.getJobByIdWithBids = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId).populate('bids').populate('createdBy', 'name email');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job', error: error.message });
    }
};
