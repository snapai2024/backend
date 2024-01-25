import { Response } from 'express';
import { CausalError } from '../../common/errors/causal.error';
import { CustomRequest } from '../../common/entities/customRequest';
import fs from 'fs';

export interface FileController {
  getFile(req: CustomRequest, res: Response): any;
}

class _FileController implements FileController {
  public async getFile(req: CustomRequest, res: Response) {
    try {
      const path = req.query.path;

      if (!path) throw new Error('Vous devez fournir un path pour le fichier.');

      const file = fs.readFileSync(path as string);

      res.write(file, 'binary');

      res.status(200).send();
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }
}

export const FileController: FileController = new _FileController();
