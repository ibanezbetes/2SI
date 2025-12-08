import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get('AWS_REGION') || 'us-east-1';
    const accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');

    const clientConfig: any = { region };

    if (accessKeyId && secretAccessKey) {
      clientConfig.credentials = { accessKeyId, secretAccessKey };
    }

    this.s3Client = new S3Client(clientConfig);
    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME') || '';
  }

  async getPresignedUrl(contentType: string = 'image/jpeg') {
    const key = `${uuidv4()}.jpg`; // Simple key generation
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return { url, key };
  }
}
