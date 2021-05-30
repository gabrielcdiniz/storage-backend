import { ApiProperty } from "@nestjs/swagger";

export class FileRef {
    @ApiProperty({
        description: 'File\'s ID',
        maxLength: 36,
        type: String,
    })
    // @IsString()
    // @MaxLength(36)
    public id: string;

    @ApiProperty({
        description: 'File\'s Name',
        maxLength: 128,
        type: String,
    })
    // @IsString()
    // @MaxLength(128)
    public name: string;

    @ApiProperty({
        description: 'File\'s Path',
        type: String,
    })
    // @IsString()
    public path: string;
}
