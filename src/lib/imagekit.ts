import ImageKit from 'imagekit';

export interface ImageKitConfig {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
}

export function getImageKitConfig(): ImageKitConfig | null {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return null;
  }

  return { publicKey, privateKey, urlEndpoint };
}

let imagekitInstance: ImageKit | null = null;

export function getImageKitClient(): ImageKit | null {
  const config = getImageKitConfig();
  if (!config) return null;

  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey: config.publicKey,
      privateKey: config.privateKey,
      urlEndpoint: config.urlEndpoint,
    });
  }
  return imagekitInstance;
}

export interface UploadResult {
  fileId: string;
  filePath: string;
  url: string;
  signedUrl: string;
  name: string;
}

/**
 * Uploads a file (buffer or base64) to ImageKit marked as a private file.
 * Returns file IDs and a signed URL with 7 days validity for ops engineering review.
 */
export async function uploadPrivateSiteAsset(options: {
  file: Buffer | string;
  fileName: string;
  folder?: string;
  referenceCode?: string;
}): Promise<UploadResult> {
  const { file, fileName, folder = '/site-surveys', referenceCode = 'GENERAL' } = options;
  const client = getImageKitClient();

  if (!client) {
    console.warn('[ImageKit Service] Credentials not configured. Returning local mock asset.');
    const mockId = `mock_ik_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return {
      fileId: mockId,
      filePath: `${folder}/${fileName}`,
      url: `https://ik.imagekit.io/mock/${fileName}`,
      signedUrl: `https://ik.imagekit.io/mock/${fileName}?token=mock_signed`,
      name: fileName,
    };
  }

  const uploadResponse = await client.upload({
    file,
    fileName,
    folder,
    isPrivateFile: true,
    useUniqueFileName: true,
    tags: ['site-survey', referenceCode],
  });

  const signedUrl = client.url({
    path: uploadResponse.filePath,
    signed: true,
    expireSeconds: 3600 * 24 * 7, // 7 days validity for review
  });

  return {
    fileId: uploadResponse.fileId,
    filePath: uploadResponse.filePath,
    url: uploadResponse.url,
    signedUrl,
    name: uploadResponse.name,
  };
}

/**
 * Generates a time-bound signed URL for an existing ImageKit private file.
 */
export function getSignedAssetUrl(filePath: string, expireSeconds = 3600 * 24 * 7): string {
  const client = getImageKitClient();
  if (!client) {
    return `https://ik.imagekit.io/mock${filePath}?token=mock_signed`;
  }
  return client.url({
    path: filePath,
    signed: true,
    expireSeconds,
  });
}
