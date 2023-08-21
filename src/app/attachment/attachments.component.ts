import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IUploadAttachment } from './attachment.model';
import { AttachmentService } from './attachment.service';
import { attachments_2_from_api } from './attachments.mock-data';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  attachments: IUploadAttachment[] = [];

  @Input('viewMode') viewMode: boolean = false;

  attachmentData = (id: number) => {
    return this.attachments[id].data;
  };

  constructor(
    private attachmentService: AttachmentService,
    cdr: ChangeDetectorRef
  ) {
    this.attachmentService.cdRef = cdr;
    if (this.viewMode) {
      this.getAttachmentsFromApi();
      return;
    } else this.attachments = this.attachmentService.getAttachments();
  }

  ngOnInit(): void {}

  handleFileSelect(event: any, attachmentId: string): void {
    const files = event.target.files as FileList;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.attachmentService.selectAttachment(file, attachmentId);
    }
  }

  removeAttachment(attachmentId: string, imageIndex?: number): void {
    this.attachmentService.removeAttachment(attachmentId, imageIndex);
  }

  clearAttachments() {
    this.attachments.forEach((attachment) => {
      attachment.data.src = [];
    });
    const localStorageAttachments = JSON.parse(localStorage.getItem('attachments')) as IUploadAttachment[]

    localStorageAttachments.forEach((attachment)=>attachment.data.src = [])
    localStorage.setItem('attachments',JSON.stringify(localStorageAttachments))

  }

  getAttachmentsFromApi() {
    this.attachments[0].data = attachments_2_from_api;
  }
}
