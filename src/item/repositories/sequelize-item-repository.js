const { DataTypes } = require("sequelize");
const { db } = require("../../frameworks/db/sequelize");

class SequelizeItemRepository {
  constructor() {
    this.ItemModel = db.Item;
  }

  async getItems() {
    const items = await this.ItemModel.findAll({
      raw: true,
    });

    return items;
  }

  async getItem(id) {
    return await this.ItemModel.findByPk(id);
  }

  async createItem(item) {
    const itemData = await this.ItemModel.create({
      name: item.name,
      description: item.description,
      stock: item.stock,
    });

    const itemId = itemData.id;

    return itemId;
  }

  async updateItem(item) {
    const options = {
      where: {
        id: item.id,
      },
    };

    await this.ItemModel.update(item, options);
  }

  async deleteItem(id) {
    const item = await this.ItemModel.findOne({ where: { id } });
    await item.destroy();
  }
}

module.exports = SequelizeItemRepository;
