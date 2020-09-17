import { InputField, TextAreaField, DateField, EmailField, SelectField, CheckboxField } from './fields';
import { FieldType } from './enums';
import { Field, DataStorage } from './interfaces';

export class Form {
  fields: Field[];
  documentId?: string;
  id: string;

  constructor(fields: Field[], documentId?: string, forceBuild = false, id = ''){
    this.fields = fields;

    if(documentId){
      this.documentId = documentId;
    }

    if(id){
      this.id = id;
    } else {
      this.id = 'form-' + Date.now().toString();
    }

    if(documentId || forceBuild){
      for(let i = 0; i < this.fields.length; i++){
        const field = this.fields[i];
        console.log(this.fields);

        switch(field.type){
          case FieldType.textInput:
            this.fields[i] = new InputField(field.name, field.label.name, field.value);
            break;

          case FieldType.textArea:
            this.fields[i] = new TextAreaField(field.name, field.label.name, field.value);
            break;

          case FieldType.date:
            this.fields[i] = new DateField(field.name, field.label.name, field.value);
            break;

          case FieldType.email:
            this.fields[i] = new EmailField(field.name, field.label.name, field.value);
            break;

          case FieldType.select:
            this.fields[i] = new SelectField(field.name, field.label.name, field.value, field.options);
            break;

          case FieldType.checkbox:
            this.fields[i] = new CheckboxField(field.name, field.label.name, field.value, field.checked);
            break;
        }
      }
    }
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
      window.history.back();
    })
  }

  save(){
    const storage = new LocStorage();
    const values = this.getValue();
    storage.saveDocument(values, this);
    window.location.href = 'index.html';
  }
}

export class LocStorage implements DataStorage {
  saveDocument(values: any, form: Form): string{
    let id;

    if(form.documentId){
      id = form.documentId;
    } else {
      id = 'document-' + Date.now().toString();
    }

    const document = new Document(id, values, form);
    window.localStorage.setItem(id, JSON.stringify(document));
    return id;
  }

  loadDocument(id: string): Document{
    let document =  JSON.parse(window.localStorage.getItem(id)) as Document;
    document = new Document(document.id, document.values, document.form);
    return document;
  }

  saveForm(form: Form){
    const id = form.id;
    window.localStorage.setItem(id, JSON.stringify(form));
    return id;
  }

  loadForm(id: string): Form{
    let form = JSON.parse(window.localStorage.getItem(id)) as Form;
    form = new Form(form.fields, null, true);
    return form;
  }

  getDocuments(): string[]{
    return [];
  }

  removeDocument(id: string){
    window.localStorage.removeItem(id);
  }
}

export class Document {
  id: string;
  values: string[];
  form: Form;

  constructor(id: string, values: string[], form: Form){
    this.id = id;
    this.values = values;
    this.form = new Form(form.fields, this.id);
  }
}

export class DocumentList {
  documents: Document[];

  constructor(){
    this.documents = [];
  }

  getDocumentList(): Document[]{
    const storageKeys = Object.keys(window.localStorage);

    for(let i = 0; i < storageKeys.length; i++){
      if(storageKeys[i].indexOf('document-') >= 0){
        let document = JSON.parse(window.localStorage.getItem(storageKeys[i])) as Document;
        document = new Document(document.id, document.values, document.form);
        console.log(document);
        this.documents.push(document);
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

    const tableHeadEdit = document.createElement('th');
    tableHeadEdit.innerHTML = 'Edytuj';
    tableHeadRow.appendChild(tableHeadEdit);
    const tableHeadDelete = document.createElement('th');
    tableHeadDelete.innerHTML = 'Usuń';
    tableHeadRow.appendChild(tableHeadDelete);

    for(let i = 0; i < this.documents.length; i++){
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.innerHTML = this.documents[i].id;

      const editCell = document.createElement('td');
      const editCellLink = document.createElement('a');
      editCellLink.innerHTML = 'Edytuj';
      editCellLink.href = 'edit-document.html?id=' + this.documents[i].id;
      editCell.appendChild(editCellLink);

      const deleteCell = document.createElement('td');
      const deleteCellButton = document.createElement('button');
      deleteCellButton.innerHTML = 'Usuń';
      deleteCellButton.addEventListener('click', () => {
        this.removeDocument(this.documents[i].id);
        window.location.href = window.location.href;
      })
      deleteCell.appendChild(deleteCellButton);

      row.appendChild(cell);
      row.appendChild(editCell);
      row.appendChild(deleteCell);
      table.appendChild(row);
    }

    document.querySelector(where).appendChild(table);
  }

  getDocument(id: string): Document{
    let document = JSON.parse(window.localStorage.getItem(id)) as Document;
    document = new Document(document.id, document.values, document.form);
    return document;
  }

  removeDocument(id: string){
    const storage = new LocStorage();
    storage.removeDocument(id);
  }
}

export class Router{
  getParam(key: string){
    const query: string = window.location.search.substr(1);
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get(key);
    return id;
  }
}

export class FormCreator {
  fields: Field[];

  constructor(){
    this.fields = [];
  }

  newForm(){
    let form = new Form(this.fields);
    this.saveForm(form);
  }

  saveForm(form: Form){
    const storage = new LocStorage();
    storage.saveForm(form);
    window.location.href = 'index.html';
  }

  createField(type: string, name: string, label: string, value: string, options?: string[], checked?: boolean){
    let field;
    if(!type || !name || !label){
      alert('Podaj typ, nazwę pola i nazwę etykiety');
      return;
    }

    switch(type){
      case 'Text Input':
        field = new InputField(name, label, value);
        break;

      case 'Text Area':
        field = new TextAreaField(name, label, value);
        break;

      case 'Date':
        field = new DateField(name, label, value);
        break;

      case 'Email':
        field = new EmailField(name, label, value);
        break;

      case 'Select':
        field = new SelectField(name, label, value, options);
        break;

      case 'Checkbox':
        field = new CheckboxField(name, label, value, checked);
        break;
    }

    this.fields.push(field);
    field.render('#app');
  }

  render(where: string): void{
    const fieldTypeSelect = new SelectField('selected-type', 'Rodzaj pola', '', ['Text Input', 'Text Area', 'Date', 'Email', 'Select', 'Checkbox']);
    fieldTypeSelect.render(where);

    const fieldNameInput = new InputField('field-name', 'Nazwa pola', '');
    fieldNameInput.render(where);

    const fieldLabelNameInput = new InputField('field-label', 'Nazwa etykiety pola', '');
    fieldLabelNameInput.render(where);

    const fieldValueInput = new InputField('field-value', 'Wartość pola', '');
    fieldValueInput.render(where);

    const selectOptionsInput = new InputField('field-options', 'Opcje dla pola select(oddzielone przecinkiem)', '');
    selectOptionsInput.render(where);

    const checkboxCheckedInput = new CheckboxField('field-options', 'Czy pole jest zaznaczone?', '');
    checkboxCheckedInput.render(where);
    
    const createFieldButton = document.createElement('button');
    createFieldButton.innerHTML = 'Stwórz pole';
    createFieldButton.addEventListener('click', () => {
      this.createField(fieldTypeSelect.value, fieldNameInput.value, fieldLabelNameInput.value, fieldValueInput.value, selectOptionsInput.value.split(','), checkboxCheckedInput.checked);
    });
    document.querySelector(where).appendChild(createFieldButton);

    const createFormButton = document.createElement('button');
    createFormButton.innerHTML = 'Zapisz formularz';
    createFormButton.addEventListener('click', () => {
      this.newForm();
    });
    document.querySelector(where).appendChild(createFormButton);

    const backButton = document.createElement('button');
    backButton.innerHTML = 'Wstecz';
    backButton.addEventListener('click', () => {
      window.history.back();
    });
    document.querySelector(where).appendChild(backButton);
  }

  getFormList(): Form[]{
    const storageKeys = Object.keys(window.localStorage);
    const forms: Form[] = [];

    for(let i = 0; i < storageKeys.length; i++){
      if(storageKeys[i].indexOf('form-') >= 0){
        let form = JSON.parse(window.localStorage.getItem(storageKeys[i])) as Form;
        form = new Form(form.fields, null, true, storageKeys[i]);
        forms.push(form);
      }
    }
    
    return forms;
  }

  renderFormList(where: string):void{
    const formList = this.getFormList();

    const table = document.createElement('table');
    const tableHeadRow = document.createElement('tr');
    table.appendChild(tableHeadRow);
    const tableHeadId = document.createElement('th');
    tableHeadId.innerHTML = 'Id';
    tableHeadRow.appendChild(tableHeadId);

    const tableHeadEdit = document.createElement('th');
    tableHeadEdit.innerHTML = 'Wypełnij';
    tableHeadRow.appendChild(tableHeadEdit);

    for(let i = 0; i < formList.length; i++){
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.innerHTML = formList[i].id;

      const editCell = document.createElement('td');
      const editCellLink = document.createElement('a');
      editCellLink.innerHTML = 'Wypełnij';
      editCellLink.href = 'new-document.html?id=' + formList[i].id;
      editCell.appendChild(editCellLink);

      row.appendChild(cell);
      row.appendChild(editCell);
      table.appendChild(row);
    }

    document.querySelector(where).appendChild(table);
  }
}