import { Field, DataStorage } from './interfaces';

export class Form {
  fields: Field[];

  constructor(fields: Field[]){
    this.fields = fields;
  }

  getValue(): string[]{
    let values = [];

    for(let i = 0; i < this.fields.length; i++){
      values[i] = this.fields[i].getValue().toString();
    }

    return values;
  }

  render(where: string):void{
    const form = document.createElement('form');
    form.id = 'form';
    document.querySelector(where).appendChild(form);

    for(let i = 0; i < this.fields.length; i++){
      this.fields[i].render('#' + form.id);
    }

    const saveButton = document.createElement('button');
    saveButton.innerHTML = 'Zapisz';
    saveButton.type = 'button';
    form.appendChild(saveButton);
    saveButton.addEventListener('click', () => {
      this.save();
    })

    const returnButton = document.createElement('button');
    returnButton.innerHTML = 'Wstecz';
    returnButton.type = 'button';
    form.appendChild(returnButton);
    returnButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    })
  }

  save(){
    const storage = new LocStorage();
    const values = this.getValue();
    storage.saveDocument(values);
    window.location.href = 'index.html';
  }
}

export class LocStorage implements DataStorage {
  saveDocument(values: any): string{
    const id = 'document-' + Date.now().toString();
    window.localStorage.setItem(id, JSON.stringify(values));
    return id;
  }

  loadDocument(id: string): string[]{
    const document = window.localStorage.getItem(id);
    const documentFromStorage = JSON.parse(document) as string[];

    return documentFromStorage;
  }

  getDocuments(): string[]{
    return [];
  }
}

export class Document {
  id: string;
  values: string[];
  constructor(id: string, values: string[]){
    this.id = id;
    this.values = values;
  }
}

export class DocumentList {
  documents: Document[];

  constructor(){
    this.documents = [];
  }

  getDocumentList(){
    const storageKeys = Object.keys(window.localStorage);

    for(let i = 0; i < storageKeys.length; i++){
      if(storageKeys[i].indexOf('document-') >= 0){
        const documentFromStorage = window.localStorage.getItem(storageKeys[i]);
        this.documents.push(new Document(storageKeys[i], JSON.parse(documentFromStorage) as string[]));
      }
    }
    
    return this.documents;
  }

  render(where: string):void{
    const table = document.createElement('table');
    const tableHeadRow = document.createElement('tr');
    table.appendChild(tableHeadRow);
    const tableHeadId = document.createElement('th');
    tableHeadId.innerHTML = 'Id';
    tableHeadRow.appendChild(tableHeadId);

    for(let i = 0; i < this.documents.length; i++){
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.innerHTML = this.documents[i].id;
      row.appendChild(cell);
      table.appendChild(row);
    }

    document.querySelector(where).appendChild(table);
  }
}