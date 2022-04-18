import { firestore } from './connection';
import { doc, setDoc } from 'firebase/firestore';
import { getAmountDocs } from './publishActionsGet';

/** Publicar news */
export async function publishNew(published) {
  const id = (await getAmountDocs()).toString();
  debugger;

  const collectionNews = doc(firestore, 'News', id);

  // debugger;
  return setDoc(collectionNews, published);
}
