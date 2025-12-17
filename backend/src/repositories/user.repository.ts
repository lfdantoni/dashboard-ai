import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   * Find a user by Google ID
   */
  async findByGoogleId(googleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ googleId }).exec();
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Find a user by ID
   */
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Create a new user
   */
  async create(userData: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<UserDocument> {
    const user = new this.userModel({
      ...userData,
      isActive: true,
      lastLoginAt: new Date(),
    });
    return user.save();
  }

  /**
   * Update user information
   */
  async update(
    id: string,
    updateData: Partial<User>,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  /**
   * Update last login timestamp
   */
  async updateLastLogin(googleId: string): Promise<UserDocument | null> {
    return this.userModel
      .findOneAndUpdate(
        { googleId },
        { lastLoginAt: new Date() },
        { new: true },
      )
      .exec();
  }

  /**
   * Find or create a user by Google ID
   * If user exists, updates last login; if not, creates a new user
   */
  async findOrCreate(userData: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<UserDocument> {
    let user = await this.findByGoogleId(userData.googleId);

    if (!user) {
      user = await this.create(userData);
    } else {
      // Update last login and any changed information
      user = await this.update(user._id.toString(), {
        lastLoginAt: new Date(),
        name: userData.name,
        picture: userData.picture,
      });
    }

    return user;
  }

  /**
   * Deactivate a user
   */
  async deactivate(id: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
  }

  /**
   * Activate a user
   */
  async activate(id: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, { isActive: true }, { new: true })
      .exec();
  }

  /**
   * Delete a user
   */
  async delete(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  /**
   * Get all active users
   */
  async findAllActive(): Promise<UserDocument[]> {
    return this.userModel.find({ isActive: true }).exec();
  }

  /**
   * Count total users
   */
  async count(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }
}

