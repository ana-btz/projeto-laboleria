import {
  findCakeByName,
  insertCakeDB,
} from "../repositories/cakes.repository.js";

export async function createCake(req, res) {
  const { name, price, image, description } = req.body;

  try {
    const cake = await findCakeByName(name);
    if (cake.rowCount !== 0)
      return res
        .status(409)
        .send({ message: "Já existe um bolo com esse nome" });

    await insertCakeDB(name, price, image, description);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
