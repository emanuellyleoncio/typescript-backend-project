import { Request, Response } from 'express';
import { knex } from '../database/connection';
import { Car } from '../types';

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

        return res.json(car);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const createCar = async (req: Request, res: Response) => {
    const { brand, model, year, color, price } = req.body;

    try {
        if (!brand || !model || !year || !color || !price) {
            return res.status(406).json({ message: 'All attributes must be informed.'})
        };

        const car = await knex<Omit<Car, 'id'>>('cars').insert({
            brand, 
            model, 
            year, 
            color, 
            price
        }).returning('*');

        return res.status(201).json(car[0]);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const updateCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { brand, model, year, color, price } = req.body;

    try {
        const car = await knex<Car>('cars').where({ id: Number(id) }).first();

        if (!car) {
            return res.status(404).json({ message: 'Car was not found!'})
        };

        await knex<Car>('cars').update({
            brand, 
            model, 
            year, 
            color, 
            price
        }).where({ id: Number(id) });

        return res.status(204).send();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const car = await knex<Car>('cars').where({ id: Number(id) }).first();

        if (!car) {
            return res.status(404).json({ message: 'Car was not found!'})
        };

        await knex<Car>('cars').where({ id: Number(id) }).del();

        return res.status(204).send();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};