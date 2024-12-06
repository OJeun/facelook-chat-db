import { sequelize } from '../db/index';

/**
 * Execute a raw SQL query.
 * @param query SQL query string
 * @param params Parameters for the query
 * @returns Query result
 */
export async function executeQuery(query: string) {
  try {
    console.log("Executing query:", query);

    const [results] = await sequelize.query(query);
    return results;
  } catch (error) {
    console.error('Failed to execute query:', error);
    throw error;
  }
}
