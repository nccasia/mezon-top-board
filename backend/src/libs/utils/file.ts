import { imageMimeTypes, videoMimeTypes } from "@domain/common/constants/fileMimeTypes";
import * as moment from "moment";
import { extname } from "path";

const isMimeTypeValid = (mimeType: string, mimeTypes: string[]): boolean => mimeTypes.includes(mimeType);

const createUploadPath = (uploadDir: string): string => {
    const year = moment().format("YYYY");
    const month = moment().format("MM");
    return `${uploadDir}/${year}/${month}`;
};

const generateFilename = (file: Express.Multer.File): string => {
    const ext = extname(file.originalname);
    const formattedTimestamp = moment().format("YYYYMMDD_HHmmss_SSSSSSSS");
    const filename = `${formattedTimestamp}${ext}`;

    if (isMimeTypeValid(file.mimetype, imageMimeTypes)) {
        return `IMG_${filename}`;
    }

    if (isMimeTypeValid(file.mimetype, videoMimeTypes)) {
        return `VID_${filename}`;
    }

    return filename;
};

export {
    isMimeTypeValid,
    createUploadPath,
    generateFilename,
}