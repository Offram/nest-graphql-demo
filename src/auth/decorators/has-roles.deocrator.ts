import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/structures/enums/enums';

export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
