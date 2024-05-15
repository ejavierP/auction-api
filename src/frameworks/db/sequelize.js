const { Sequelize } = require("sequelize");
require("dotenv").config();

let db = {};
class SequelizeClient {
  constructor() {
    const dialect = process.env.SEQUELIZE_DIALECT;
    const username = process.env.SEQUELIZE_USERNAME;
    const password = process.env.SEQUELIZE_PASSWORD;
    const database = process.env.SEQUELIZE_DATABASE;

    const host = process.env.SEQUELIZE_HOST;

    this.sequelize = new Sequelize(database, username, password, {
      dialect: dialect,
      host: host,
      logging: false,
    });

    this.assocations();
  }

  syncDatabase() {
    var syncOptions = {
      alter: false,
    };

    this.sequelize
      .sync(syncOptions)
      .catch((error) => {
        console.log("Couldn't sync database", error);
      });
  }
  assocations() {
    db.Bid = require("../db/models/bid.model.js")(this.sequelize, Sequelize);
    db.Item = require("../db/models/item.model.js")(this.sequelize, Sequelize);

    db.Bid.belongsTo(db.Item, { as: "bidItem", foreignKey: "itemId" });
    db.Item.hasMany(db.Bid, {
      as: "bids",
      foreignKey: "itemId",
    });
  }
}

module.exports = { db, SequelizeClient };
