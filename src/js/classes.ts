import { Field } from './interfaces';

export class Form {
  fields: Field[];

  constructor(fields: Field[]){
    this.fields = fields;
  }

  getValue(): string[]{
    let values = [];

    for(let i = 0; i < this.fields.length; i++){
      values[i] = this.fields[i].value;
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
  }
}