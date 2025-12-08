import { Controller, Post, Body } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presign')
  @ApiOperation({ summary: 'Get presigned URL for S3 upload' })
  async getPresignedUrl() {
    return this.uploadsService.getPresignedUrl();
  }
}
