// db.js
import { openDB } from "idb";

const dbPromise = openDB("quizApp", 1, {
  upgrade(db) {
    db.createObjectStore("users", { keyPath: "id" });
  },
});

export const addUser = async (user) => {
  const db = await dbPromise;
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users");
  await store.put(user);
  await tx.done;
};

export const getUser = async (userId) => {
  const db = await dbPromise;
  const tx = db.transaction("users", "readonly");
  const store = tx.objectStore("users");
  return store.get(userId);
};
