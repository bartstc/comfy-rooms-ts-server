import 'dotenv/config';

import { App } from './app';
import { User } from './modules/user/interfaces/user.interface';
import { UserController } from './modules/user/user.controller';
import { AdminProfileController } from './modules/admin/admin-profile.controller';
import { ProfileController } from './modules/profile/profile.controller';
import { HotelController } from './modules/hotel/hotel.controller';

// expand Request interface
declare global {
  namespace Express {
    interface Request {
      user: User;
      files: {
        file: {
          path: string;
        };
      };
    }
  }
}

const app = new App([
  new UserController(),
  new AdminProfileController(),
  new ProfileController(),
  new HotelController()
]);

app.listen();
