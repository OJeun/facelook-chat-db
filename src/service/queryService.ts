import { sequelize } from '../db/index';

/**
 * Execute a raw SQL query.
 * @param query SQL query string
 * @param params Parameters for the query
 * @returns Query result
 */
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await sequelize.query(query, { replacements: params });
    return results;
  } catch (error) {
    console.error('Failed to execute query:', error);
    throw error;
  }
}
