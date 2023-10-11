import {Router} from 'express';
import { createCar, deleteCar, getAllCars, getCar, updateCar } from './controllers/controller';

const routes = Router();

routes.get('/cars', getAllCars);
routes.get('/cars/:id', getCar);
routes.post('/cars', createCar);
routes.put('/cars/:id', updateCar);
routes.delete('/cars', deleteCar)

export default routes;