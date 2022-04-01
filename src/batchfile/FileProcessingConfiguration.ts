export interface FileProcessingConfiguration {
    fileNamePattern: string;
    mappingName: string;
    // if the content type is csv or xml or json, etc..
    contentType: string;
    // minimum length to process
    minLength?: number;
    docLevels?: DocLevelDefinition;
    // If the docLevels needs to be retrived from db
    docLevelid?: string;
}

export interface DocLevelDefinition {
    name: string;
    isArray: boolean;
    levelKeys?: string[];
    levelKeysStr?: string;
    // level keys are the fields in the row, docKeys are the corresponding field names in the document
    docKeys?: string[];
    docKeysStr?: string;
    levelFields?: string[];
    levelFieldsStr?: string;
    // Fields names in the document to set the field value to
    docFields?: string[];
    docFieldsStr?: string;
    childLevels?: DocLevelDefinition[];
}
