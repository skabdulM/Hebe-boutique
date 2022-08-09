import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AddTags } from './dto';
import { TagsService } from './tags.service';

@UseGuards(JwtGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Post('addTag')
  addTag(@Body() dto: AddTags) {
    return this.tagService.addTag(dto);
  }
}
