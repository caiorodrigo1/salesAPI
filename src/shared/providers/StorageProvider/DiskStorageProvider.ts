import uploadConfig from '../../../config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePatch = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePatch);
    } catch {
      return;
    }

    await fs.promises.unlink(filePatch);
  }
}
