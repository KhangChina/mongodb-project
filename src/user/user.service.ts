import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto)
    const result = await newUser.save();
    if (!result) {
      throw new BadRequestException('Insert faild')
    }
    return result.id as string
  }

  async findAll() {
    const data = await this.userModel.find().exec()
    if (!data) {
      throw new NotFoundException('Not Found')
    }
    return data as User[]
  }

  async findOne(username: string): Promise<User | undefined>  {
     const data = await this.userModel.findOne({ username: username }).exec()
     if (!data) {
      throw new NotFoundException('Not Found')
    }
     return data as User
  }

  async findById(id: string): Promise<User | undefined>  {
    const data = await this.userModel.findById(id).exec()
    if (!data) {
     throw new NotFoundException('Not Found')
   }
    return data as User
 }


  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = await this.userModel.findByIdAndUpdate(id,updateUserDto).exec()
    return data
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
