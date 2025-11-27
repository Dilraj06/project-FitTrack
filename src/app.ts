import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import errorHandler from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import { UPLOAD_DIR } from './middleware/multer.middleware';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(errorHandler);

export default app;
