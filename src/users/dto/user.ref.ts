import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, MaxLength, IsEnum, IsBoolean } from "class-validator";
import { UserRole } from "../users-role.enum";

export class UserRef {
    @ApiProperty({
        description: 'User\'s ID',
        maxLength: 36,
        type: String,
    })
    @IsString()
    @MaxLength(36)
    public id: string;

    @ApiProperty({
        description: 'User\'s Name',
        maxLength: 128,
        type: String,
    })
    @IsString()
    @MaxLength(128)
    public name: string;

    @ApiPropertyOptional({
        description: 'Indicate if the User it is Active or Inactive in the Application',
        type: Boolean,
        default: true,
    })
    @IsBoolean()
    public active: boolean;

    @ApiProperty({
        description: 'User\'s Role',
        enum: UserRole,
        type: UserRole,
    })
    @IsEnum(UserRole)
    public role: UserRole;
}