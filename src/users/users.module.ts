/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './user.repository';
import { DataBaseModule } from 'src/common/database/database.module';
import { User, userSchema } from './entities/user.entity';

@Module({
  imports : [DataBaseModule.forFeature([
    {name : User.name, schema : userSchema},
  ])],
  providers: [UsersResolver, UsersService, UserRepository],
})
export class UsersModule {}
