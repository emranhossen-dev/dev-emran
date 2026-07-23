import { NextRequest, NextResponse } from 'next/server';
import { getMessages, saveMessage, deleteMessage, markAsRead } from '@/lib/db';

// POST: Save visitor message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const saved = await saveMessage({ name, email, subject, message });
    return NextResponse.json({ success: true, message: 'Message sent successfully!', data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}

// GET: Fetch all messages for admin
export async function GET(req: NextRequest) {
  try {
    const messages = await getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// DELETE: Remove a message by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const deleted = await deleteMessage(id);
    if (deleted) {
      return NextResponse.json({ success: true, message: 'Message deleted' });
    }
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}

// PATCH: Mark message as read
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const updated = await markAsRead(id);
    if (updated) {
      return NextResponse.json({ success: true, message: 'Message marked as read' });
    }
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}
