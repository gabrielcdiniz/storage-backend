import { OmitType } from "@nestjs/swagger";
import { UserRef } from "./user.ref";

export class CreateUserDto extends OmitType(UserRef, ['id']) { }
