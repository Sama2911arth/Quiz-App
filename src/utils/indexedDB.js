import { openDB } from "idb";

const DB_NAME = "quizAppDB";
const STORE_NAME = "quizHistory";

export async function saveQuizResult(score, total) {
    //Function to save quiz results in 
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        },
    });
    await db.add(STORE_NAME, { score, total, timestamp: new Date().toISOString() });
}

//function to retrieve quiz results
export async function getQuizHistory() {
    const db = await openDB(DB_NAME, 1);
    return await db.getAll(STORE_NAME);
}
