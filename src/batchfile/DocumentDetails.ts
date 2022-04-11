export interface DocumentDetails {
  DocumentName: string;
  DocumentTitle: string;
  DocumentAuthor: string;
  DocumentSecurityGroup: string;
  DocumentAccount: string;
  DocumentId?: number;
  ContentType: string;
  FileName: string;
  ContentID?: string;
  Content?: Buffer;
  fileContents?: FileContent[];
  contentDocuments?: any[];
}

export interface FileContent {
  fileName: string;
  fileData: string;
  documents?: any[];
}
