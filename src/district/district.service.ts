import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/mongoose';
import { District } from './entities/district.entity';
import { Model } from 'mongoose';
@Injectable()
export class DistrictService {
  constructor(@InjectModel('district') private districtModel: Model<District>) { }

  async create(createDistrictDto: CreateDistrictDto) {
    const newDis = new this.districtModel(createDistrictDto)
    const result = await newDis.save();
    if (!result) {
      throw new BadRequestException('Insert faild')
    }
    return result.id as string
  }

  async findAll() {
    const data = await this.districtModel.find().exec()
    if (!data) {
      throw new NotFoundException('Not Found')
    }
    return data as District[]
  }

  async findOne(id: string) {
    const district = await this.findDistrict(id)
    return district
  }

  async update(id: string, updateDistrictDto: UpdateDistrictDto) {

    //let updateDistrict =  await this.findDistrict(id)
    let updateDistrict = await this.districtModel.findByIdAndUpdate(id, updateDistrictDto).exec()
    let res = await updateDistrict.save()
    return `This action updates a #${res} district`;
  }

  async remove(id: string) {
    let result = await this.districtModel.deleteOne({ _id: id }).exec()
    return `This action removes a #${result} district`;
  }

  //Find district entity call function is here :)
  async findDistrict(id: string): Promise<District> {
    let district;
    try {
      district = await this.districtModel.findById(id).exec()

    } catch (error) {
      throw new NotFoundException('Could not find district.');
    }
    if (!district) {
      throw new NotFoundException('Could not find district.');
    }
    return district;
  }
}
