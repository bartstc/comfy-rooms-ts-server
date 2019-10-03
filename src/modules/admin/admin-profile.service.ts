import { userModel } from '../user/user.model';
import { adminProfileModel } from './admin-profile.model';
import { AdminProfile } from './interfaces/admin-profile.interface';
import { HttpException } from '../../exceptions/http-exception';

export class AdminProfileService {
  private user = userModel;
  private adminProfile = adminProfileModel;

  async createAdminProfile(id: string): Promise<AdminProfile> {
    return new this.adminProfile({ user: id }).save();
  }

  async registerUser(
    adminId: string,
    userToRegisterId: string
  ): Promise<AdminProfile> {
    const adminProfile = await this.adminProfile.findOne({ user: adminId });

    if (!adminProfile) {
      throw new HttpException(500, 'Internal server error');
    }

    const updatedRequests = adminProfile.requests.filter(
      req => req.user.toString() !== userToRegisterId
    );
    adminProfile.requests = updatedRequests;
    const updatedProfile = await adminProfile.save();

    await this.user.findOneAndUpdate({ _id: userToRegisterId }, { role: 2 });

    return updatedProfile;
  }
}
