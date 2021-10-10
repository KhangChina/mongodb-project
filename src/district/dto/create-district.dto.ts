import { ApiProperty } from "@nestjs/swagger";
import { District } from "../entities/district.entity"; 
export class CreateDistrictDto implements District {
    @ApiProperty()
    districtid: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    provinceid: string;
}
