import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { userModel } from './user.model';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { User } from './interfaces/user.interface';
import { DataStoredInToken } from './interfaces/data-stored-in-token.interface';
import { HttpException } from '../../exceptions/http-exception';
import { EmailInUseException } from '../../exceptions/email-in-use-exception';
import { WrongCredentialsException } from '../../exceptions/wrong-credentials-exception';

export class UserService {
  private user = userModel;

  async signUp(userData: SignUpDTO): Promise<User> {
    const { email, password } = userData;
    const existingUser = await this.user.findOne({ email });

    if (existingUser) {
      throw new EmailInUseException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new this.user({
      ...userData,
      password: hashedPassword
    }).save();

    delete newUser.password;
    return newUser;
  }

  async signIn(userData: SignInDTO): Promise<string> {
    const { email, password } = userData;
    const user = await this.user.findOne({ email });

    if (!user) {
      throw new WrongCredentialsException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new WrongCredentialsException();
    }

    return this.generateToken(user);
  }

  generateToken({ _id, fullname, email, role }: User): string {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      id: _id,
      fullname,
      email,
      role
    };

    if (!secret) {
      throw new HttpException(500, 'Internal server error');
    }

    return jwt.sign(dataStoredInToken, secret, { expiresIn });
  }
}
