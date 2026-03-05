import { Router } from 'express';
import { handleSearch } from '../searchService/searchController.js';

const router = Router();

router.get('/', handleSearch);

export default router;