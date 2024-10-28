import { NextResponse } from 'next/server';
import { Task } from '@/types';
import { getStoredTasks, setStoredTasks } from '@/lib/localStorage';

export async function GET() {
  const tasks = getStoredTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    const task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = await request.json();
    const tasks = getStoredTasks();
    
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    setStoredTasks(tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}