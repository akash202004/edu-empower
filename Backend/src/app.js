// Add this with your other route imports
const healthRoutes = require('./routes/health');

// Add this with your other app.use statements
app.use('/api', healthRoutes);