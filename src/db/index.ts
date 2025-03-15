import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { join } from 'path';

// Initialize the SQLite database
const sqlite = new Database(join(process.cwd(), 'loan-data.db'));

// Create the Drizzle ORM instance
export const db = drizzle(sqlite, { schema });

// Function to initialize the database (create tables if they don't exist)
export function initDatabase() {
  // Create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_term INTEGER NOT NULL,
      interest_rate REAL NOT NULL,
      interest_payment_frequency TEXT NOT NULL,
      interest_accrual_frequency TEXT NOT NULL,
      loan_type TEXT NOT NULL DEFAULT 'bullet',
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS drawdowns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (loan_id) REFERENCES loans(id)
    );
  `);
  
  console.log('Database initialized');
}

// Initialize the database on import
initDatabase(); 