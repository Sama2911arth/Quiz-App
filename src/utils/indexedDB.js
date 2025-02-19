import { openDB } from "idb";

const DB_NAME = "quizAppDB";
const STORE_NAME = "quizHistory";
const DB_VERSION = 1;

// Helper function to open the database
async function getDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        },
    });
}

// Function to save quiz results
export async function saveQuizResult(score, total) {
    try {
        const db = await getDB();
        await db.add(STORE_NAME, { score, total, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("Error saving quiz result:", error);
    }
}

// Function to retrieve quiz history
export async function getQuizHistory() {
    try {
        const db = await getDB();
        return await db.getAll(STORE_NAME);
    } catch (error) {
        console.error("Error fetching quiz history:", error);
        return [];
    }
}
