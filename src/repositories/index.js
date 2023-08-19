import { userDAO } from "../daos/factory.js";
import { cartDAO } from "../daos/factory.js";
import { productDAO } from "../daos/factory.js";
import { ticketDAO } from "../daos/factory.js";


import CartRepository from "./carts.repository.js";
import UserRepository from "./users.repository.js";
import ProductRepository from "./products.repository.js";
import TicketRepository from "./tickets.repository.js";

export const cartRepository = new CartRepository(cartDAO);
export const userRepository = new UserRepository(userDAO);
export const productRepository = new ProductRepository(productDAO);
export const ticketRepository = new TicketRepository(ticketDAO);