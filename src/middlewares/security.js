const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

const corsOptions = {
  origin: '*', 
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

const helmetConfig = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "img-src": ["'self'", 'data:', 'https:'],
      "script-src": ["'self'", "'unsafe-inline'"]
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
});

module.exports = (app) => {
  app.use(cors(corsOptions));

  app.use(helmetConfig);

  app.use('/api', apiLimiter);

  // app.use(mongoSanitize());

  // app.use(xss());

 app.use((req, res, next) => {
  if (['POST','PUT','PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json') && !contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'Only JSON or multipart/form-data requests are allowed' });
    }
  }
  next();
});

};
