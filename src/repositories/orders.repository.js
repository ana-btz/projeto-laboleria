import { db } from "../database/db.connection.js";

export function findClientById(id) {
  return db.query(`SELECT * FROM clients WHERE id = $1`, [id]);
}

export function findCakeById(id) {
  return db.query(`SELECT * FROM cakes WHERE id = $1`, [id]);
}

export function insertOrderDB(clientId, cakeId, quantity, totalPrice) {
  return db.query(
    `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4)`,
    [clientId, cakeId, quantity, totalPrice]
  );
}
