module.exports = async (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'AntiTheft Backend API is working!',
    timestamp: new Date().toISOString()
  });
};
