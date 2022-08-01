import {
    Body,
    Controller,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { GetUser } from 'src/auth/decorator';
  import { JwtGuard } from 'src/auth/guard';
  import { CommentService } from './comment.service';
  import { AddCommentDto } from './dto';
  
  @UseGuards(JwtGuard)
  @Controller('comment')
  export class CommentController {
    constructor(private commentService: CommentService) {}
  
    @Post('addcomment')
    addcomment(
      @GetUser('id') userId: string,
      @Body() dto: AddCommentDto,
    ) {
      return this.commentService.addcomment(userId, dto);
    }
  }
  