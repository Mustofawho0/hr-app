import { rmSync } from 'fs';

export const deletedUploadFile = (files: any) => {
  if (files) {
    const uploadFiles = Array.isArray(files) ? files : files['images'];

    if (Array.isArray(uploadFiles)) {
      uploadFiles?.forEach((item) => {
        rmSync(item.path);
      });
    }
  }
};
