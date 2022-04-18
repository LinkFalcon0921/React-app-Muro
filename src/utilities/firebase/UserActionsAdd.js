import { firestore, auth } from './connection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

//Create the user
export async function createUser(userName = '', email = '', password = '') {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (credential) => {
      // console.log(credential);
      await addUser(userName, email);

      return true;
    })
    .catch((e) => {
      return [false, e.code];
    });
}

async function addUser(userName = '', email = '') {
  const collectionUser = collection(firestore, 'Users');

  addDoc(collectionUser, {
    userName: userName,
    email: email,
  });
}
