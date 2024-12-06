import * as express from 'express';
import { handleGenericQuery } from '../controller/queryController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.post('/query', asyncHandler(handleGenericQuery));

export default router;
