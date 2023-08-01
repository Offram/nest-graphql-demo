import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { SignupUserInput } from './dto/signup-user.input';
import { Role } from 'src/users/entities/role.entity';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.authService.signup(signupUserInput);
  }

  // @ResolveField(() => Role)
  // role(@Parent() user: User): Promise<Role> {
  //   return this.userService.getRole(user.roleId);
  // }
}
