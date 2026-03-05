import type { Request, Response } from 'express';
import * as SearchService from './searchService.js';

export const handleSearch = async (req: Request, res: Response) => {
    const { q, type } = req.query;
    try {
        let results;
        switch (type) {
            case 'letter': results = await SearchService.byFirstLetter(String(q)); break;
            case 'ing':    results = await SearchService.byIngredient(String(q)); break;
            case 'area':   results = await SearchService.byArea(String(q)); break;
            default:       results = await SearchService.byName(String(q));
        }

        res.json({ success: true, count: results.length, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en la búsqueda' });
    }
};