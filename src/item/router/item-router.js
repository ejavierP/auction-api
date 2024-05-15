const express = require("express");

function createItemRouter(itemRepository) {
  const router = express.Router();

  router.get("/items", async (req, res) => {
    const items = await itemRepository.getItems();
    res.status(200).send(items);
  });

  router.get("/items/:id",async (req, res) => {
    try {
      const id = req.params.id;
      const item = await itemRepository.getItem(id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.post(
    "/items",
    async (req, res) => {
      try {
        const product = await itemRepository.createItem(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  router.put(
    "/items/:id",
    async (req, res) => {
      try {
        const id = req.params.id;
        const item = await itemRepository.updateItem(id, req.body);
        res.status(200).send(item);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  router.delete(
    "/items/:id",
    async (req, res) => {
      try {
        const id = req.params.id;
        await itemRepository.deleteItem(id);
        res.status(200).json({message: `Deleted Item with ${id}`});
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    }
  );

  return router;
}

module.exports = createItemRouter;