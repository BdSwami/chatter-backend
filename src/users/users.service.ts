/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository : UserRepository) {}

  async create(createUserInput: CreateUserInput) {
    return this.userRepository.create({
      ...createUserInput,
      password : await this.hashPassword(createUserInput.password),
    });
  }

  private async hashPassword( password : string){
    return await bcrypt.hash(password , 10)
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne( _id: string) {
    return this.userRepository.findOne({ _id });
  }

 async update(_id: string, updateUserInput: UpdateUserInput) {
    if(updateUserInput.password){
      updateUserInput.password = await this.hashPassword(updateUserInput.password);
    }

    return this.userRepository.findOneAndUpdate({ _id }, {
      $set : {
        ...updateUserInput,
      }
    });
  }

 async remove(_id: string) {
    return this.userRepository.findAndDelete({ _id });
  }

  async verifyUser(email : string, password : string){
    const user = await this.userRepository.findOne({email});
    const passordIsValid = await bcrypt.compare(password, user.password);

    if(!passordIsValid){
      throw new UnauthorizedException('Credential are not valid.');
    }

    return user;
  }
}
