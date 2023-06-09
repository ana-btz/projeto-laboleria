import {
  findCakeById,
  findClientById,
  insertOrderDB,
} from "../repositories/orders.repository.js";

export async function createOrder(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const client = await findClientById(clientId);
    if (client.rowCount === 0)
      return res.status(404).send({ message: "Cliente não encontrado" });

    const cake = await findCakeById(cakeId);
    if (cake.rowCount === 0)
      return res.status(404).send({ message: "Bolo não encontrado" });

    await insertOrderDB(clientId, cakeId, quantity, totalPrice);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getAllOrders(req, res) {
  res.send("getAllOrders");
}

export async function getOrderById(req, res) {
  res.send("getOrderById");
}
