import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Role {
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  rolename: string;

  @OneToMany(() => User, (user) => user.role)
  @Field(() => [User], { nullable: true })
  users?: User[];
}
