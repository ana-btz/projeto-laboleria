import {
  findAllOrders,
  findCakeById,
  findClientById,
  findOrderById,
  findOrderDateById,
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
  const { date } = req.query;
  const ordersInfo = [];

  try {
    const orders = await findAllOrders();
    if (orders.rowCount === 0) return res.status(404).send(orders.rows);

    for (const order of orders.rows) {
      const {
        rows: [client],
      } = await findClientById(order.clientId);

      const {
        rows: [cake],
      } = await findCakeById(order.cakeId);

      const { rows: queryDate } = await findOrderDateById(order.id);
      const orderDate = queryDate[0].newdateformat;

      if (date) {
        if (orderDate.slice(0, 11) === date) {
          ordersInfo.push({
            client: {
              id: client.id,
              name: client.name,
              address: client.address,
              phone: client.phone,
            },
            cake: {
              id: cake.id,
              name: cake.name,
              price: cake.price,
              description: cake.description,
              image: cake.image,
            },
            orderId: order.id,
            createdAt: orderDate,
            quantity: order.quantity,
            totalPrice: order.totalPrice,
          });
        }
      } else {
        ordersInfo.push({
          client: {
            id: client.id,
            name: client.name,
            address: client.address,
            phone: client.phone,
          },
          cake: {
            id: cake.id,
            name: cake.name,
            price: cake.price,
            description: cake.description,
            image: cake.image,
          },
          orderId: order.id,
          createdAt: orderDate,
          quantity: order.quantity,
          totalPrice: order.totalPrice,
        });
      }
    }

    res.status(200).send(ordersInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const order = await findOrderById(id);
    if (order.rowCount === 0)
      return res.status(404).send({ message: "Ordem não encontrada" });

    const {
      rows: [client],
    } = await findClientById(order.rows[0].clientId);

    const {
      rows: [cake],
    } = await findCakeById(order.rows[0].cakeId);

    const { rows: queryDate } = await findOrderDateById(order.rows[0].id);
    const orderDate = queryDate[0].newdateformat;

    const orderInfo = {
      client: {
        id: client.id,
        name: client.name,
        address: client.address,
        phone: client.phone,
      },
      cake: {
        id: cake.id,
        name: cake.name,
        price: cake.price,
        description: cake.description,
        image: cake.image,
      },
      orderId: order.rows[0].id,
      createdAt: orderDate,
      quantity: order.rows[0].quantity,
      totalPrice: order.rows[0].totalPrice,
    };

    res.status(200).send(orderInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
