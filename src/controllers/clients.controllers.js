import { insertClientDB } from "../repositories/clients.repository.js";

export async function createClient(req, res) {
  try {
    await insertClientDB(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getClientOrders(req, res) {
  res.send("getClientOrders");
}
