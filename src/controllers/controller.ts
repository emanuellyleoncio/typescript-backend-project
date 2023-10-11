import {Request, Response} from 'express';
import {knex} from '../database/connection';
import {Car} from '../types';

export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await knex<Car>('cars');
        return res.json(cars);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const car = await knex<Car>('cars').where({ id: Number(id) }).first();

        if (!car) {
            return res.status(404).json({ message: 'Car was not found!'})
        }
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const createCar = async (req: Request, res: Response) => {

};

export const updateCar = async (req: Request, res: Response) => {

};

export const deleteCar = async (req: Request, res: Response) => {

};