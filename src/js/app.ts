import { InputField, TextAreaField, EmailField, SelectField, CheckboxField } from './fields';
import { Form } from './classes';

export class App {
  constructor(){
    const form = new Form([
      new InputField('imie', 'Imię', ''),
      new InputField('nazwisko', 'Nazwisko', ''),
      new EmailField('email', 'Email', 'test@exapmle.com'),
      new SelectField('kierunek', 'Wybrany kierunek studiów', '', ['Informatyka', 'Zarządzanie']),
      new CheckboxField('elearning', 'Czy preferujesz e-learning?', ''),
      new TextAreaField('uwagi', 'Uwagi', ''),
    ])
    
    form.render('#app');

    const valuesDiv = document.createElement('div');
    valuesDiv.id = 'values';
    document.querySelector('#app').appendChild(valuesDiv);

    const getValuesButton = document.createElement('button');
    getValuesButton.addEventListener('click', (e) => {
      const values = form.getValue();
      valuesDiv.innerHTML = '';

      for(let i = 0; i < values.length; i++){
        valuesDiv.innerHTML += values[i] + '<br>';
      }
    })
    getValuesButton.innerHTML = 'Prześlij';
    document.querySelector('#app').appendChild(getValuesButton);
  }
}