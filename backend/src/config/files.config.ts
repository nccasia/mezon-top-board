import { imageMimeTypes, videoMimeTypes } from "@domain/common/constants/fileMimeTypes";
import { createUploadPath, generateFilename, isMimeTypeValid } from "@libs/utils/file";
import { INestApplication } from "@nestjs/common";
import * as express from 'express';
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { join } from "path";
import envConfig from "./env.config";

const uploadDir = join(process.cwd(), envConfig().UPLOAD_RELATIVE_DIR);

const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = createUploadPath(uploadDir);
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, generateFilename(file));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (isMimeTypeValid(file.mimetype, imageMimeTypes) || isMimeTypeValid(file.mimetype, videoMimeTypes)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and video are allowed...'), false);
    }
  },
};

const configStaticFiles = (app: INestApplication) => {
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  app.use('/api/uploads', express.static(uploadDir));
};

export {
  configStaticFiles, multerConfig, uploadDir
};

