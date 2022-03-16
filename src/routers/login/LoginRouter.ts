import { NextFunction, Request, Response, Router } from 'express';
import ThemeBController from '../../controllers/login/LoginController';

class LoginRouter {
  private _router = Router();
  private _controller = ThemeBController;

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
    this._router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.login(req, res);
    });
    this._router.post('/check', async (req: Request, res: Response, next: NextFunction) => {
      return this._controller.check(req, res);
    });
  }
}

export = new LoginRouter().router;