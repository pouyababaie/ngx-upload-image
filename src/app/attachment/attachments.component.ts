import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUploadAttachment } from './attachment.model';
import { AttachmentService } from './attachment.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  attachments: IUploadAttachment[] = [];

  attachmentData = (id: number) => {
    return this.attachments[id].data;
  };

  constructor(
    private attachmentService: AttachmentService,
    private cdr: ChangeDetectorRef
  ) {
    this.attachmentService.cdRef = cdr;
    this.attachments = this.attachmentService.getAttachments()
  }

  ngOnInit(): void {}

  handleFileSelect(event: any, attachmentId: string): void {
    const file = event.target.files[0];
    this.attachmentService.selectAttachment(file, attachmentId);
  }

  removeAttachment(attachmentId: string): void {
    this.attachmentService.removeAttachment(attachmentId);
  }

  clearAttachments() {
    this.attachments.forEach((attachment) => {
      this.removeAttachment(attachment.id);
    });
  }
}
