import { CreateOwnerInput } from 'src/owners/dto/create-owner.input';
import { CreatePetInput } from 'src/pets/dto/create-pet.input';
import { Roles } from 'src/structures/enums/enums';
import { CreateRoleInput } from 'src/users/dto/create-role.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';

export const ownersSeed: CreateOwnerInput[] = [
  { name: 'English' },
  { name: 'French' },
  { name: 'Spanish' },
  { name: 'Russian' },
];

export const petsSeed: CreatePetInput[] = [
  { name: 'English', ownerId: 1 },
  { name: 'French', ownerId: 2 },
  { name: 'Spanish', ownerId: 3 },
  { name: 'Russian', ownerId: 1 },
];

export const usersSeed: CreateUserInput[] = [
  {
    username: 'all_allowed_user',
    password: '$2b$10$IN/vxniVHe0AI4W7GoBHxerZnVvdFXEmzvO5AxmboJusFJRmj0Zwi',
    roleId: 1,
  },
  {
    username: 'partially_allowed_user',
    password: '$2b$10$IN/vxniVHe0AI4W7GoBHxerZnVvdFXEmzvO5AxmboJusFJRmj0Zwi',
    roleId: 2,
  },
  {
    username: 'none_allowed_user',
    password: '$2b$10$IN/vxniVHe0AI4W7GoBHxerZnVvdFXEmzvO5AxmboJusFJRmj0Zwi',
    roleId: 3,
  },
];

export const rolesSeed: CreateRoleInput[] = [
  {
    id: 1,
    rolename: Roles.ALL_ALLOWED, // 3
  },
  {
    id: 2,
    rolename: Roles.PARTIALLY_ALLOWED,
  },
  {
    id: 3,
    rolename: Roles.NONE_ALLOWED, // 2
  },
];
