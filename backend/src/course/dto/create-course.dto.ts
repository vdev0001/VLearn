import {
  Contains,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(3, {
    message: 'Course title must be at least 3 characters long.',
  })
  title!: string;

  @IsString()
  @MinLength(10, {
    message: 'Description must be at least 10 characters long.',
  })
  description!: string;

  @IsNotEmpty()
  @IsUrl({}, { message: 'Please enter a valid URL.' })
  @Contains('playlist?list=', {
    message: 'Please enter a valid YouTube playlist URL.',
  })
  youtubePlaylistUrl!: string;

  @IsInt()
  @Min(1, {
    message: 'Total videos must be at least 1.',
  })
  totalVideos!: number;

@IsOptional()
@IsString()
instructorId?: string;
}