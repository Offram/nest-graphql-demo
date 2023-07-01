import {
  Resolver,
  Query,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard.guard';
import { Role } from './entities/role.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @ResolveField(() => Role)
  role(@Parent() user: User): Promise<Role> {
    return this.usersService.getRole(user.roleId);
  }

  @Query(() => [Role], { name: 'roles' })
  findAllRoles() {
    return this.usersService.findAllRoles();
  }
}
