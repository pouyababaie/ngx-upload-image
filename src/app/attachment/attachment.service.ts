import { ChangeDetectorRef, Injectable } from '@angular/core';
import { IUploadAttachment } from './attachment.model';

@Injectable({
  providedIn: 'root',
  deps: [ChangeDetectorRef],
})
export class AttachmentService {
  private attachments: IUploadAttachment[] = [
    {
      id: 'bcebd72b-34b3-4d1b-8f80-2d1536102e75',
      formType: 100,
      fileType: 100,
      title: 'Logo',
      size: 314573,
      format: 'image/jpeg, image/png',
      isMultiple: true,
      isRequired: true,
      isIndexImage: true,
      isPublic: true,
      thumbnailWidth: 200,
      thumbnailHeight: 200,
      data: {
        src: [],
        name: '',
      },
      isViewMode: false,
    },
    {
      id: 'c301e419-92e5-4e4d-b2df-b35742a61ab4',
      formType: 100,
      fileType: 201,
      title: 'AgencyManagerNationalCard',
      size: 314573,
      format: 'image/jpeg, image/png',
      isMultiple: false,
      isRequired: true,
      isIndexImage: true,
      isPublic: false,
      thumbnailWidth: 60,
      thumbnailHeight: 60,
      data: {
        src: [],
        name: '',
      },
      isViewMode: false,
    },
    {
      id: '446db94f-a978-450b-b755-ffe24be6b743',
      formType: 100,
      fileType: 200,
      title: 'Paragraph-B-License',
      size: 314573,
      format: 'image/jpeg, image/png',
      isMultiple: false,
      isRequired: true,
      isIndexImage: true,
      isPublic: false,
      thumbnailWidth: 60,
      thumbnailHeight: 60,
      data: {
        src: [],
        name: '',
      },
      isViewMode: false,
    },
  ];
  cdRef: ChangeDetectorRef;
  constructor() {
    // Load attachments from localStorage on service initialization
    const storedAttachments = localStorage.getItem('attachments');
    if (storedAttachments) {
      this.attachments = JSON.parse(storedAttachments);
    }
  }

  getAttachments(): IUploadAttachment[] {
    return this.attachments;
  }

  selectAttachment(file: File, attachmentId: string): void {
    const attachment = this.attachments.find((a) => a.id === attachmentId);

    if (attachment) {
      // Check if the selected file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        // Read the file as a base64 string
        reader.onload = (e: any) => {
          const base64String = e.target.result;

          // Update the 'src' property of the selected attachment
          attachment.data.src.push(base64String);
          attachment.isViewMode = true;

          // Store the updated data in localStorage
          localStorage.setItem('attachments', JSON.stringify(this.attachments));
          this.cdRef.detectChanges();
        };

        reader.readAsDataURL(file);
      } else {
        alert('Please select image files only.');
      }
    }
  }

  removeAttachment(attachmentId: string, imageIndex: number): void {
    const attachmentIndex = this.attachments.findIndex(
      (a) => a.id === attachmentId
    );

    if (attachmentIndex !== -1) {
      // Remove the 'src' property from the attachment
      this.attachments[attachmentIndex].data.src.splice(imageIndex, 1);
      this.attachments[attachmentIndex].isViewMode = false;

      // Remove the attachment from localStorage
      localStorage.setItem('attachments', JSON.stringify(this.attachments));

      this.cdRef.detectChanges()
    }
  }

  setChangeDetectorRef(cdRef: ChangeDetectorRef): void {
    this.cdRef = cdRef;
  }
}
