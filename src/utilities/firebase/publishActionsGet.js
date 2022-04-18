import { firestore } from './connection';
import Publication from '../logics/Publication';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAt,
  documentId,
} from 'firebase/firestore';

const publicQuery = (collectionNews, nPos) => {
  if (nPos) {
    const pos = (nPos * limitCount).toString();
    return query(
      collectionNews,
      orderBy(documentId()),
      where('public', '==', true),
      startAt(pos),
      limit(limitCount)
    );
  } else {
    return query(
      collectionNews,
      where('public', '==', true),
      orderBy('created'),
      limit(limitCount)
    );
  }
};

const queryPages = (collectionNews) => {
  return query(collectionNews, where('public', '==', true), orderBy('created'));
};

const queryCount = (collectionNews) => {
  return query(collectionNews, orderBy(documentId()));
};

//Change next
const privateQuery = (collectionNews) => {
  return query(collectionNews, where('public', '==', false));
};

const limitCount = 4;

export async function getPublicNews(startTo) {
  const collectionNews = collection(firestore, 'News');

  //query
  const get = publicQuery(collectionNews, startTo);
  //do the query
  return getDocs(get).then((values) => {
    //mapeo a clase Publicacion
    return values.docs.map((docs) => {
      //convertion
      const data = docs.data();
      return new Publication(data.owner, data.title, data.body, 0, data.public);
    });
  });
}

export async function getAmountPages() {
  const collectionNews = collection(firestore, 'News');

  const get = queryPages(collectionNews);
  // debugger;

  return getDocs(get).then((query) => {
    return (
      Math.floor(query.docs.length / limitCount) +
      (query.docs.length % 4 > 0 ? 1 : 0)
    );
  });
}

export async function getAmountDocs() {
  const collectionNews = collection(firestore, 'News');

  debugger;
  const get = queryCount(collectionNews);

  return getDocs(get).then((query) => {
    return query.docs.length;
  });
}
