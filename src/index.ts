import 'dotenv/config';
import express from 'express';
import routes from './routes';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen('3000', () => {
    console.log('Server started!')
});