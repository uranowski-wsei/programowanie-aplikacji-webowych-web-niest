import { DocumentList, Router, LocStorage, FormCreator } from './classes';

export class App {
  constructor(){
    const documentList = new DocumentList();
    const creator = new FormCreator();
    const router = new Router();

    switch(window.location.pathname){
      case '/new-document.html':
        const storage = new LocStorage();
        const form = storage.loadForm(router.getParam('id'));
        
        form.render('#app');
        break;

      case '/document-list.html':
        documentList.getDocumentList();
        documentList.render('#app');
        break;

      case '/form-list.html':
        creator.renderFormList('#app');
        break;

      case '/edit-document.html':
        const documentForEdit = documentList.getDocument(router.getParam('id'));
        documentForEdit.form.render('#app');
        break;

      case '/new-form.html':
        creator.render('#app');
        break;
    }
  }
}