import { Router } from 'express';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { RoleNameEnum } from '../models';
import { UserController } from '../controllers/user.controller';

const userRouter: Router = Router();

/**
 * @openapi
 * /user:
 *      get:
 *          summary: Get all users
 *          tags:
 *              - User
 *          responses:
 *              200:
 *                  description: Ok
 */
userRouter.get('/', AuthenticationMiddleware.checkPermissions([RoleNameEnum.ADMIN]), UserController.getAll);

/**
 * @openapi
 * /user/me:
 *      get:
 *          summary: Get a specific user
 *          responses:
 *              201:
 *                  description: Created
 */
userRouter.get('/me', AuthenticationMiddleware.checkPermissions([]), UserController.getCurrent);

/**
 * @openapi
 * /user/{id}:
 *      get:
 *          summary: Get a specific user
 *          parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric ID of the user to get
 *          tags:
 *              - User
 *          responses:
 *              201:
 *                  description: Created
 */
userRouter.get('/:id', AuthenticationMiddleware.checkPermissions([RoleNameEnum.ADMIN]), UserController.getById);

/**
 * @openapi
 * /user:
 *      post:
 *          summary: Register new user
 *          tags:
 *              - User
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              201:
 *                  description: Created
 */
userRouter.post('/', UserController.register);

/**
 * @openapi
 * /user/{id}:
 *      patch:
 *          summary: Update new user
 *          tags:
 *              - User
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              userId:
 *                                  type: number
 *          responses:
 *              200:
 *                  description: Ok
 */
userRouter.patch('/:id', AuthenticationMiddleware.checkPermissions([]), UserController.update);

/**
 * @openapi
 * /user/{id}:
 *      delete:
 *          summary: Delete specific user
 *          tags:
 *              - User
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *          responses:
 *              200:
 *                  description: Ok
 */
userRouter.delete('/:id', AuthenticationMiddleware.checkPermissions([RoleNameEnum.ADMIN]), UserController.delete);

export default userRouter;
