import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default {

    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", `./tmp/${folder}`),
                filename: (request, file, callback) => {
                    const filehash = crypto.randomBytes(16).toString("hex");
                    const filename = `${filehash}-${file.originalname}`;

                    return callback(null, filename);
                }
            })
        }
    }
}