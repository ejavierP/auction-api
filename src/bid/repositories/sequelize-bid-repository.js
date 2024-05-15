const { DataTypes } = require("sequelize");
const { db } = require("../../frameworks/db/sequelize");

class SequelizeBidRepository {
  constructor() {
    this.bidModel = db.Bid;
  }

  async getBids(filters) {
    return await this.bidModel.findAll({
      raw: true,
      where: { ...filters },
    });
  }

  async getBid(id) {
    return await this.bidModel.findByPk(id);
  }

  async createBid(bid) {
    const bidData = await this.ItemModel.create({
      amount: bid.status,
      itemId: bid.itemId,
      createdDate: new Date().toDateString(),
    });

    const bidId = bidData.id;

    return bidId;
  }

  async updateItem(bid) {
    const options = {
      where: {
        id: bid.id,
      },
    };

    await this.bidModel.update(bid, options);
  }

  async deleteItem(id) {
    const bid = await this.bidModel.findOne({ where: { id } });
    await bid.destroy();
  }
}

module.exports = SequelizeBidRepository;
