import { NFTStorage } from 'nft.storage';
import { IPFS_CONFIG } from '../config/ipfs';

export const getNFTStorageClient = () => {
  const client = new NFTStorage({ token: IPFS_CONFIG.NFT_STORAGE_KEY });
  return client;
};

export const saveDataToNFTStorage = async (data: any) => {
  const client = getNFTStorageClient();
  const savedData = await client.store(data);

  console.log(`Data Stored`);
  return savedData.url;
};

export const saveFileToNFTStorage = async (binaryImage: any) => {
  try {
    const client = getNFTStorageClient();
    const imgFile = getFileFromBase64(binaryImage, 'face');
    const blob = new Blob([imgFile], { type: 'image/jpg' });
    const savedFilePath = await client.storeBlob(blob);
    return savedFilePath;
  } catch (err) {
    console.log(`Error saving file`, err);
  }
};

export function getFileFromBase64(string64: string, fileName: string) {
  const trimmedString = string64.replace('data:image/jpeg;base64,', '');
  const imageContent = window.atob(trimmedString);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }
  const type = 'image/jpeg';
  const blob = new Blob([buffer], { type });
  return new File([blob], fileName, { lastModified: new Date().getTime(), type });
}
