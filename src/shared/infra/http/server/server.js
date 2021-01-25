const app = require('./app');

const port = process.env.API_PORT || 8000;

app.listen(port, () => {
  console.log(`\n🔥 API running on port ${port}`);
});
