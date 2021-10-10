import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto  {
    @ApiProperty()
    password : string
    @ApiProperty()
    token : string
}
