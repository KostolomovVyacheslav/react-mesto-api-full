const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // max: 100,
  max: 2,
  message: 'Слишком много запросов, пожалуйста попробуйте позже :)',
});

module.exports = {
  limiter,
};
