import { Form } from './classes';
import { FieldLabel } from './fields';
import { FieldType } from './enums';

export interface Field{
  name: string,
  label: FieldLabel,
  type: FieldType,
  value: string,
  options?: string[],
  checked?: boolean,
  render(where: string): void,
  getValue(): any,
}

export interface DataStorage{
  saveDocument(values: any, form: Form): string;
  loadDocument(id: string): any;
  getDocuments(): string[];
}