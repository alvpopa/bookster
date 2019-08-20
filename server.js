import express from 'express';
import logger from 'morgan';
import { GraphQLServer } from 'graphql-yoga';
import * as cron from 'node-cron';

// Import typeDefs & resolvers for GraphQL server
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

// Import cronJob
import { ticketService } from './services';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

// Import MongoDB Connection
import db from './config/db';

// Import Routes
import authRoute from './routes/auth';
import signUpRoute from './routes/user';
import testRoute from './routes';

const options = {
  port: process.env.PORT || 5000,
  endpoint: '/graphql',
};

// Use Mongo Connection
db();

// Schedule a cron job to check tickets daily at 6am
cron.schedule('0 6 * * *', ticketService.verifyTickets);

// Use Http-Logger Middleware
server.express.use(logger('dev'));

// Use Express Middleware Functions for Parsing JSON Body
server.express.use(express.json());
server.express.use(express.urlencoded({ extended: false }));

// Handle CORS
server.express.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-Requested-With, Accept, Authorization, x-auth-token'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT POST PATCH GET DELETE');
    return res.status(200).json({});
  }
  next();
});

// Implement Routes
server.express.use('/api', signUpRoute);
server.express.use('/api', testRoute);
server.express.use('/api/auth', authRoute);

server
  .start(options, ({ port }) =>
    console.log(`🚀 Server is running ⚡️ on http://localhost:${port}`)
  )
  .catch(err => console.error('connection Error', err));
