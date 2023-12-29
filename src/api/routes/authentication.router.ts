import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authenticationRouter: Router = Router();

/**
 * @openapi
 * /authenticate:
 *      post:
 *          summary: Login user
 *          tags:
 *              - Authentication
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
 *              200:
 *                  description: Created
 */
authenticationRouter.post('/', AuthController.login);

export default authenticationRouter;
