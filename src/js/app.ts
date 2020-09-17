import { InputField, TextAreaField, EmailField, SelectField, CheckboxField } from './fields';
import { Form, DocumentList, Router, LocStorage, FormCreator } from './classes';

export class App {
  constructor(){
    const documentList = new DocumentList();

    switch(window.location.pathname){
      case '/new-document.html':
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
        break;

      case '/document-list.html':
        documentList.getDocumentList();
        documentList.render('#app');
        break;

      case '/edit-document.html':
        const router = new Router();
        const documentForEdit = documentList.getDocument(router.getParam('id'));
        
        documentForEdit.form.render('#app');
        break;

      case '/new-form.html':
        const creator = new FormCreator();
        creator.render('#app');
        break;
    }
  }
}