import { User } from '../src/modules/users/entities/user.entity';

declare global {
  interface RequestWithUser extends Request {
    user: User;
  }
}
