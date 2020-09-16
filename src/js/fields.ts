import { FieldType } from './enums';
import { Field } from './interfaces';

export class FieldLabel{
  name: string;

  constructor(name: string){
    this.name = name;
  }

  render(field: HTMLElement): void{
    const label = document.createElement('label');
    label.innerHTML = this.name;

    field.appendChild(label);
  }
}

export class InputField implements Field{
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;

  constructor(name: string, labelName: string, value: string){
    this.type = FieldType.textInput;
    this.name = name;
    this.value = value;
    this.label = new FieldLabel(labelName);
  }

  render(where: string): void{
    let container = document.createElement('div');
    container.className = 'field';
    let input = document.createElement('input');
    input.type = 'text';
    input.name = this.name;
    input.value = this.value;
    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('input', () => {
      this.value = input.value;
    })
    document.querySelector(where).appendChild(container);
  }
}

export class TextAreaField implements Field{
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;

  constructor(name: string, labelName: string, value: string){
    this.type = FieldType.textArea;
    this.name = name;
    this.value = value;
    this.label = new FieldLabel(labelName);
  }

  render(where: string): void{
    let container = document.createElement('div');
    container.className = 'field';
    let input = document.createElement('textarea');
    input.name = this.name;
    input.value = this.value;
    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('input', () => {
      this.value = input.value;
    })
    document.querySelector(where).appendChild(container);
  }
}

export class DateField implements Field{
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;

  constructor(name: string, labelName: string, value: string){
    this.type = FieldType.date;
    this.name = name;
    this.value = value;
    this.label = new FieldLabel(labelName);
  }

  render(where: string): void{
    let container = document.createElement('div');
    container.className = 'field';
    let input = document.createElement('input');
    input.type = 'date';
    input.name = this.name;
    input.value = this.value;
    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('input', () => {
      this.value = input.value;
    })
    document.querySelector(where).appendChild(container);
  }
}

export class EmailField implements Field{
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;

  constructor(name: string, labelName: string, value: string){
    this.type = FieldType.email;
    this.name = name;
    this.value = value;
    this.label = new FieldLabel(labelName);
  }

  render(where: string): void{
    let container = document.createElement('div');
    container.className = 'field';
    let input = document.createElement('input');
    input.type = 'email';
    input.name = this.name;
    input.value = this.value;
    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('input', () => {
      this.value = input.value;
    })
    document.querySelector(where).appendChild(container);
  }
}

export class SelectField implements Field{
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;
  options: string[];

  constructor(name: string, labelName: string, value: string, options: string[]){
    this.type = FieldType.select;
    this.name = name;
    this.value = value;
    this.label = new FieldLabel(labelName);
    this.options = options;
  }

  render(where: string): void{
    let container = document.createElement('div');
    container.className = 'field';
    let input = document.createElement('select');
    input.name = this.name;
    input.value = this.value;

    for(let i = 0; i < this.options.length; i++){
      let option = document.createElement('option');
      option.value = this.options[i];
      option.innerHTML = this.options[i];
      input.appendChild(option);
    }

    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('input', () => {
      this.value = input.value;
    })
    document.querySelector(where).appendChild(container);
  }
}

export class CheckboxField implements Field{
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;

  constructor(name: string, labelName: string, value: string){
    this.type = FieldType.checkbox;
    this.name = name;
    this.value = value;
    this.label = new FieldLabel(labelName);
  }

  render(where: string): void{
    let container = document.createElement('div');
    container.className = 'field';
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = this.name;
    input.value = this.value;
    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('input', () => {
      this.value = input.value;
    })
    document.querySelector(where).appendChild(container);
  }
}