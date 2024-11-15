/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractEntity } from "src/common/database/abstract.entity";
import { Field, ObjectType } from '@nestjs/graphql'

@Schema({ versionKey : false})
@ObjectType()
export class User extends AbstractEntity{
    @Prop()
    @Field()
    email : string;

    @Prop()
    password : string;
}

export const userSchema  = SchemaFactory.createForClass(User);