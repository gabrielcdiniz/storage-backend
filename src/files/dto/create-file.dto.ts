import { OmitType } from "@nestjs/swagger";
import { FileRef } from "./file.ref";

export class CreateFileDto extends OmitType(FileRef, ['id']) { }