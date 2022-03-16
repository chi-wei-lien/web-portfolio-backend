import { NextFunction, Request, Response, Router } from 'express';
import BlogController from '../../controllers/blog/blogController';
import getAuth from '../../middleware/auth';

class blogRouter {
  private _router = Router();
  private _controller = BlogController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    this._router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.getAllPublished(req, res);
    });

    this._router.get('/admin', async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.getAll(req, res);
    });

    this._router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.findOne(req, res);
    });

    this._router.post('/create', getAuth, async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.create(req, res);
    });

    this._router.post('/save', getAuth, async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.save(req, res);
    });

    this._router.post('/edit/:id', getAuth, async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.edit(req, res);
    });

    this._router.post('/delete/:id', getAuth, async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.delete(req, res);
    });

    this._router.post('/publish/:id', getAuth, async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.publish(req, res);
    });

    this._router.post('/unpublish/:id', getAuth, async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.unPublish(req, res);
    });
  }
}

export = new blogRouter().router;