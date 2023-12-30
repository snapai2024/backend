import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import multer from 'multer'
const upload = multer({dest: 'tmp'})

const imageRouter: Router = Router();

/**
 * @openapi
 * /analyse:
 *      post:
 *          summary: Analyse an image
 *          tags:
 *              - Image
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              imageUrl:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Created
 */
imageRouter.post('/analyse', upload.single('image'), ImageController.analyse);

export default imageRouter;
