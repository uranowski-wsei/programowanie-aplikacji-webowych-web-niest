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

  getValue(): string{
    return this.value;
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

  getValue(): string{
    return this.value;
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

  getValue(): string{
    return this.value;
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

  getValue(): string{
    return this.value;
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

      if(i == 0){
        this.value = option.value;
      }
    }

    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('change', () => {
      this.value = input.value;
    })
    document.querySelector(where).appendChild(container);
  }

  getValue(): string{
    return this.value;
  }
}

export class CheckboxField implements Field{
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;
  checked: boolean;

  constructor(name: string, labelName: string, value: string, checked?: boolean){
    this.type = FieldType.checkbox;
    this.name = name;
    this.value = value;
    this.label = new FieldLabel(labelName);

    if(checked){
      this.checked = checked;
    } else {
      this.checked = false;
    }
  }

  render(where: string): void{
    let container = document.createElement('div');
    container.className = 'field';
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = this.name;
    input.value = this.value;
    input.checked = this.checked;
    this.label.render(container);
    container.appendChild(input);

    input.addEventListener('change', () => {
      this.checked = input.checked;
    })
    document.querySelector(where).appendChild(container);
  }

  getValue(): boolean{
    return this.checked;
  }
}