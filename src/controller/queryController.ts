import { Request, Response } from 'express';
import { executeQuery } from '../service/queryService';

export async function handleGenericQuery(req: Request, res: Response) {
  const { query, params } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  console.log('Executing query:', query, 'with params', params);
  try {
    const result = await executeQuery(query, params || []);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ error: 'Failed to execute query.', details: error.message });
  }
}
