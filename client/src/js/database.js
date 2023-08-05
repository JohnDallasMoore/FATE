import { openDB } from 'idb';

const initdb = async () =>
  openDB('fate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('fate')) {
        console.log('fate database already exists');
        return;
      }
      db.createObjectStore('fate', { keyPath: 'id', autoIncrement: true });
      console.log('fate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const fateDb = await openDB('fate', 1);
  const tx = fateDb.transaction('fate', 'readwrite');
  const store = tx.objectStore('fate');
  const request = store.put(content);
  const result = await request;
  console.log('putDb result', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const fateDb = await openDB('fate', 1);
  const tx = fateDb.transaction('fate', 'readonly');
  const store = tx.objectStore('fate');
  const request = store.getAll();
  const result = await request;
  console.log('getDb result', result);
  return result;
}

initdb();
