interface IAttachmentType {
  id: string;
  formType: number;
  fileType: number;
  title: string;
  size: number;
  format: string;
  isMultiple: boolean;
  isRequired: boolean;
  isIndexImage: boolean;
  isPublic: boolean;
  thumbnailWidth: number;
  thumbnailHeight: number;
}

export interface IUploadAttachment extends IAttachmentType {
  data: {
    src?: Array<string>;
    name?: string;
  };
  isViewMode: boolean;
}
