import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async addcomment(userId: string, dto: AddCommentDto) {
    const comment = await this.prisma.productComments.create({
      data: {
        userId,
        feedback: dto.feedback,
        productId:dto.productId
      },
    });

    return comment;
  }
}
