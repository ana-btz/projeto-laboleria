import { db } from "../database/db.connection.js";

export function insertClientDB(body) {
  const { name, address, phone } = body;
  return db.query(
    `INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)`,
    [name, address, phone]
  );
}

export function findClientOrders(id) {
  return db.query(`SELECT * from orders WHERE "clientId" = $1`, [id]);
}
