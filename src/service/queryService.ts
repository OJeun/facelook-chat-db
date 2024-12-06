import { sequelize } from "../db/index";
import { QueryTypes } from "sequelize";

/**
 * Execute a raw SQL query.
 * @param query SQL query string
 * @param params Parameters for the query
 * @returns Query result
 */
export async function executeQuery(query: string) {
  try {
    console.log("Executing query:", query);

    // Determine query type from the first word
    const queryType = query.trim().split(" ")[0].toUpperCase();

    let type;
    switch (queryType) {
      case "SELECT":
        type = QueryTypes.SELECT;
        break;
      case "INSERT":
        type = QueryTypes.INSERT;
        break;
      case "UPDATE":
        type = QueryTypes.UPDATE;
        break;
      case "DELETE":
        type = QueryTypes.DELETE;
        break;
      default:
        throw new Error("Unsupported query type");
    }

    const [results] = await sequelize.query(query, {
      type: type,
    });
    return results;
  } catch (error) {
    console.error("Failed to execute query:", error);
    throw error;
  }
}
