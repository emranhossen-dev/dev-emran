import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'messages.json');

// Supabase PostgreSQL Pool initialization
const databaseUrl = process.env.DATABASE_URL;
let pool: Pool | null = null;

if (databaseUrl && !databaseUrl.includes('[YOUR-PASSWORD]')) {
  try {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    });

    // Auto-create messages table in Supabase PostgreSQL
    pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        read BOOLEAN DEFAULT FALSE
      );
    `).catch((err) => console.error('Supabase DB table init error:', err));
  } catch (err) {
    console.error('Failed to initialize Supabase Pool:', err);
    pool = null;
  }
}

// Ensure local fallback JSON file exists
function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Fetch all messages (Supabase Postgres or local file fallback)
export async function getMessages(): Promise<MessageItem[]> {
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
      return res.rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        subject: row.subject,
        message: row.message,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
        read: Boolean(row.read),
      }));
    } catch (err) {
      console.error('Supabase query error, falling back to local storage:', err);
    }
  }

  ensureDataFile();
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save a new message
export async function saveMessage(msg: Omit<MessageItem, 'id' | 'createdAt' | 'read'>): Promise<MessageItem> {
  const id = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const createdAt = new Date().toISOString();

  if (pool) {
    try {
      await pool.query(
        'INSERT INTO messages (id, name, email, subject, message, created_at, read) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [id, msg.name, msg.email, msg.subject || 'Portfolio Inquiry', msg.message, createdAt, false]
      );
      return { id, name: msg.name, email: msg.email, subject: msg.subject, message: msg.message, createdAt, read: false };
    } catch (err) {
      console.error('Supabase insert error, falling back to local file:', err);
    }
  }

  ensureDataFile();
  const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
  const newMessage: MessageItem = {
    id,
    name: msg.name,
    email: msg.email,
    subject: msg.subject || 'Portfolio Inquiry',
    message: msg.message,
    createdAt,
    read: false,
  };

  messages.unshift(newMessage);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
  return newMessage;
}

// Delete a message by ID
export async function deleteMessage(id: string): Promise<boolean> {
  if (pool) {
    try {
      const res = await pool.query('DELETE FROM messages WHERE id = $1', [id]);
      if ((res.rowCount ?? 0) > 0) return true;
    } catch (err) {
      console.error('Supabase delete error:', err);
    }
  }

  ensureDataFile();
  const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
  const filtered = messages.filter((m: MessageItem) => m.id !== id);
  if (filtered.length !== messages.length) {
    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
  return false;
}

// Mark message as read
export async function markAsRead(id: string): Promise<boolean> {
  if (pool) {
    try {
      const res = await pool.query('UPDATE messages SET read = TRUE WHERE id = $1', [id]);
      if ((res.rowCount ?? 0) > 0) return true;
    } catch (err) {
      console.error('Supabase update error:', err);
    }
  }

  ensureDataFile();
  const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
  const msg = messages.find((m: MessageItem) => m.id === id);
  if (msg) {
    msg.read = true;
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
    return true;
  }
  return false;
}
