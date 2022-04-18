import { firestore, auth } from './connection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

//Check the user
export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const iu = await getName(email);

      return iu;
    })
    .catch((error) => {
      return [undefined, error.code];
    });
}

export async function isValidName(name) {
  const get = query(
    collection(firestore, 'Users'),
    where('userName', '==', name)
  );

  debugger;

  const nameData = await getDocs(get);

  if (nameData.docs.length == 0) {
    return true;
  }

  return false;
}

async function getName(email) {
  const get = query(
    collection(firestore, 'Users'),
    where('email', '==', email)
  );

  const data = await getDocs(get);

  return data.docs[0].data();
}
