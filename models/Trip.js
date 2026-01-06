const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    from: { type: String, required: true },
    destination: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Completed
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
