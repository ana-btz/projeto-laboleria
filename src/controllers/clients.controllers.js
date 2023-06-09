import {
  findClientOrders,
  insertClientDB,
} from "../repositories/clients.repository.js";
import {
  findCakeById,
  findClientById,
  findOrderDateById,
} from "../repositories/orders.repository.js";

export async function createClient(req, res) {
  try {
    await insertClientDB(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getClientOrders(req, res) {
  const { id } = req.params;
  const clientOrders = [];

  try {
    const client = await findClientById(id);
    if (client.rowCount === 0)
      res.status(404).send({ message: "Cliente não encontrado" });

    const orders = await findClientOrders(id);

    for (const order of orders.rows) {
      const { rows: queryDate } = await findOrderDateById(order.id);
      const orderDate = queryDate[0].newdateformat;

      const cake = await findCakeById(order.cakeId);

      clientOrders.push({
        orderId: order.id,
        quantity: order.quantity,
        createdAt: orderDate,
        totalPrice: order.totalPrice,
        cakeName: cake.rows[0].name,
      });
    }

    res.status(200).send(clientOrders);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
