import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard.guard';
import { HasRoles } from 'src/auth/decorators/has-roles.deocrator';
import { Roles } from 'src/structures/enums/enums';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(() => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Query(() => [Pet])
  @HasRoles(Roles.ALL_ALLOWED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @ResolveField(() => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }

  @Mutation(() => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }
}
