module.exports = (io, bidRepository) => {
  let bids = []
  io.on("connection", async (socket) => {
    bids = await bidRepository.getBids();
    socket.emit("initialBids", bids);

    socket.on("addBid", (item) => {
      bids.push(item)
      socket.emit('initialBids',bids)
    });
  });

  
};
