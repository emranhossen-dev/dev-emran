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
  folder?: 'inbox' | 'sent' | 'draft' | 'trash';
}

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'messages.json');

// Singleton Pool Instance
let globalPool: Pool | null = null;

function getPool(): Pool | null {
  const databaseUrl = process.env.DATABASE_URL;

  if (!globalPool && databaseUrl) {
    try {
      globalPool = new Pool({
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      });

      // Ensure messages table and folder column exist in Supabase
      globalPool.query(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          read BOOLEAN DEFAULT FALSE,
          folder TEXT DEFAULT 'inbox'
        );
        ALTER TABLE messages ADD COLUMN IF NOT EXISTS folder TEXT DEFAULT 'inbox';
      `).catch((err) => console.error('[Supabase Init Error]:', err.message));
    } catch (err) {
      console.error('[Supabase Connection Error]:', err);
      globalPool = null;
    }
  }

  return globalPool;
}

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Fetch all messages (Supabase Cloud DB prioritized)
export async function getMessages(): Promise<MessageItem[]> {
  const pool = getPool();
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
      return res.rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        subject: row.subject || 'Portfolio Inquiry',
        message: row.message,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
        read: Boolean(row.read),
        folder: (row.folder || 'inbox') as 'inbox' | 'sent' | 'draft' | 'trash',
      }));
    } catch (err) {
      console.error('[Supabase Fetch Error, using fallback]:', err);
    }
  }

  ensureDataFile();
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.map((m: any) => ({ ...m, folder: m.folder || 'inbox' }));
  } catch {
    return [];
  }
}

// Save a new message (inbox, sent, draft)
export async function saveMessage(
  msg: Omit<MessageItem, 'id' | 'createdAt' | 'read'> & { folder?: 'inbox' | 'sent' | 'draft' | 'trash' }
): Promise<MessageItem> {
  const id = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const createdAt = new Date().toISOString();
  const folder = msg.folder || 'inbox';
  const pool = getPool();

  if (pool) {
    try {
      await pool.query(
        'INSERT INTO messages (id, name, email, subject, message, created_at, read, folder) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [id, msg.name, msg.email, msg.subject || 'Portfolio Inquiry', msg.message, createdAt, folder === 'sent', folder]
      );
      return { id, name: msg.name, email: msg.email, subject: msg.subject, message: msg.message, createdAt, read: folder === 'sent', folder };
    } catch (err) {
      console.error('[Supabase Insert Error, saving locally]:', err);
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
    read: folder === 'sent',
    folder,
  };

  messages.unshift(newMessage);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
  return newMessage;
}

// Delete a message by ID
export async function deleteMessage(id: string): Promise<boolean> {
  const pool = getPool();
  if (pool) {
    try {
      await pool.query('DELETE FROM messages WHERE id = $1', [id]);
    } catch (err) {
      console.error('[Supabase Delete Error]:', err);
    }
  }

  ensureDataFile();
  const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
  const filtered = messages.filter((m: MessageItem) => m.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}

// Mark message as read
export async function markAsRead(id: string): Promise<boolean> {
  const pool = getPool();
  if (pool) {
    try {
      await pool.query('UPDATE messages SET read = TRUE WHERE id = $1', [id]);
    } catch (err) {
      console.error('[Supabase Update Error]:', err);
    }
  }

  ensureDataFile();
  const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
  const msg = messages.find((m: MessageItem) => m.id === id);
  if (msg) {
    msg.read = true;
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
  }
  return true;
}
