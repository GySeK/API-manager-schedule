import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectTimeDto } from './create-subject-time.dto';

export class UpdateSubjectTimeDto extends PartialType(CreateSubjectTimeDto) {}
