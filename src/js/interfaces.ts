import { FieldLabel } from './fields';
import { FieldType } from './enums';

export interface Field{
  name: string,
  label: FieldLabel,
  type: FieldType,
  value: string,
  render(where: string): void,
  getValue(): any,
}

export interface DataStorage{
  saveDocument(values: any): string;
  loadDocument(id: string): any;
  getDocuments(): string[];
}