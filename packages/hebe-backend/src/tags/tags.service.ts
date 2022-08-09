import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTags } from './dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async addTag(dto: AddTags) {
    const tag = await this.prisma.tags.create({
      data: {
        tagName: dto.tagName,
        productsId: dto.productId,
      },
    });

    return tag;
  }
}
