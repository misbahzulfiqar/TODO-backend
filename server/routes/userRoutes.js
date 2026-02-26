import express from 'express';

import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controller/userController.js';

const route = express.Router();

route.post('/users', createUser);     // POST /api/users
route.get('/users', getUsers);        // GET /api/users
route.get('/users/:id', getUserById); // GET /api/users/:id
route.put('/users/:id', updateUser);  // PUT /api/users/:id
route.delete('/users/:id', deleteUser); // DELETE /api/users/:id


export default route;