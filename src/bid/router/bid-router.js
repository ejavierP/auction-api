const express = require("express");

function createBidRouter(bidRepository) {
  const router = express.Router();

  router.get("/bids", async (req, res) => {
    const bids = await bidRepository.getBids();
    res.status(200).send(bids);
  });

  router.get("/bids/:itemId", async (req, res) => {
    try {
      const id = req.params.itemId;
      const bids = await bidRepository.getBids({ itemId: id });
      res.status(200).json(bids);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.post("/bids", async (req, res) => {
    try {
      const bid = await bidRepository.createBid(req.body);
      res.status(201).json(bid);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.put("/bids/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const bid = await bidRepository.updateBid(id, req.body);
      res.status(200).send(bid);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.delete("/bids/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await bidRepository.deleteBid(id);
      res.status(200).json({ message: `Deleted Bid with ${id}` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  return router;
}

module.exports = createBidRouter;
