import { toast } from 'react-toastify';
import { publishNew } from '../firebase/publishActionsAdd';
import Publication from '../logics/Publication';
import {
  getPublicNews as getAllNews,
  getAmountDocs as getAllDocs,
  getAmountPages as getAllPages,
} from '../firebase/publishActionsGet';

const toastMessage = () =>
  toast.loading('Enviando...', { toastId: 'showMessage' });

export function publish(published) {
  const compMessage = toastMessage();
  // debugger;

  published.body = setSpaceToPublish(published.body);

  publishNew(published)
    .then((status) => sucessAdded(compMessage))
    .catch((e) => {
      errorMessage(compMessage);
      console.log(e.message);
    });
}

export async function getPublicNews(startTo) {
  const data = await getAllNews(startTo);

  return data.map((doc) => {
    doc.body = setSpaceToShow(doc.body);
    return new Publication(doc.owner, doc.title, doc.body, 0, doc.public);
  });
}

//get tne number of total pages
export async function getTotalPages() {
  return getAllPages();
}

export async function getTotalDocs() {
  return getAllDocs();
}

//Configs
const configSucessAddedMessage = {
  type: toast.TYPE.SUCCESS,
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  draggable: false,
  progress: undefined,
  isLoading: false,
};

const sucessAdded = (component) => {
  toast.update(component, {
    render: 'Publicacion exitosa!',
    ...configSucessAddedMessage,
  });
};

const update_wanm = {
  position: 'top-right',
  type: toast.TYPE.ERROR,
  closeOnClick: true,
  draggable: false,
  progress: undefined,
  autoClose: 3000,
  isLoading: false,
};

const errorMessage = (component) => {
  toast.update(component, { render: 'Fallo al publicar', ...update_wanm });
};

//Adjust the data.
const setSpaceToPublish = (text = '') => {
  const regex = /\s{2}|\n/gm;
  return text.replace(regex, '<br/>');
};

const setSpaceToShow = (text) => {
  const regex = /\<br\/\>/gm;
  return text.replace(regex, '\n');
};
