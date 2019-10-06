interface Config {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

interface UploadResult {
  public_id: string;
  url: string;
}

interface Uploader {
  upload: (
    path: string,
    cb: (result: UploadResult) => void,
    options: { public_id: string; resource_type: string }
  ) => void;
  destroy: (imageId: string, cb: (err: any, result: any) => void) => void;
}

declare module 'cloudinary' {
  export const config: (options: Config) => void;
  export const uploader: Uploader;
}
