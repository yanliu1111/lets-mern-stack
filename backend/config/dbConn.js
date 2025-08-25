const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL); 
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
