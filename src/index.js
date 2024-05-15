const createExpressApp = require("./frameworks/http/express");
const ItemRepository = require("./item/repositories/sequelize-item-repository");
const createItemRouter = require("./item/router/item-router");
const BidRepository = require("./bid/repositories/sequelize-bid-repository");
const createBidRouter = require("./bid/router/bid-router");
const { SequelizeClient } = require("./frameworks/db/sequelize");

const sequelizeClient = new SequelizeClient();
const itemRepository = new ItemRepository();
const bidRepository = new BidRepository();

sequelizeClient.syncDatabase();
let routers = [
  createItemRouter(itemRepository),
  createBidRouter(bidRepository),
];

const app = createExpressApp(routers);
