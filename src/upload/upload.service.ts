import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private s3: AWS.S3;
  private storageDriver: string;

  constructor() {
    this.storageDriver = process.env.STORAGE_DRIVER ?? 'local';

    if (this.storageDriver === 's3') {
      this.s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
    }
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    if (this.storageDriver === 'local') {
      return this.uploadToLocal(file, folder);
    } else if (this.storageDriver === 's3') {
      return this.uploadToS3(file, folder);
    }
    throw new Error('Invalid storage driver');
  }

  private async uploadToLocal(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const localPath = process.env.LOCAL_STORAGE_PATH ?? './uploads';
    const uploadPath = path.join(localPath, folder);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    const destination = path.join(uploadPath, file.filename); // file.filename gerado pelo Multer
    fs.renameSync(file.path, destination); // Move o arquivo para a pasta final

    return `${folder}/${file.filename}`;
  }

  private async uploadToS3(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const bucketUrl = process.env.AWS_BUCKET_URL;

    const params = {
      Bucket: bucketName,
      Key: `${folder}/${file.originalname}`,
      Body: fs.createReadStream(file.path), // Lê o arquivo diretamente do disco
      ContentType: file.mimetype,
    };

    await this.s3.upload(params).promise();
    return `${bucketUrl}/${folder}/${file.originalname}`;
  }
}
