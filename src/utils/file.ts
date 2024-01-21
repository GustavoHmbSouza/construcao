import fs from 'fs';

export const deleteFile = async (folder: string, fileName: string) => {
    try {
        await fs.promises.stat(`./tmp/${folder}/${fileName}`);
    } catch {
        return;
    }
    await fs.promises.unlink(`./tmp/${folder}/${fileName}`);
}