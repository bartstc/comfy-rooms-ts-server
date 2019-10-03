import 'dotenv/config';

import { App } from './app';
import { User } from './modules/user/interfaces/user.interface';
import { UserController } from './modules/user/user.controller';
import { AdminProfileController } from './modules/admin/admin-profile.controller';

// expand Request interface with a new property: user: User
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const app = new App([new UserController(), new AdminProfileController()]);

app.listen();
