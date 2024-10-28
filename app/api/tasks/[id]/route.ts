import { NextResponse } from 'next/server';
import { getStoredTasks, setStoredTasks } from '@/lib/localStorage';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex((t) => t.id === id);
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    const updatedTask = await request.json();
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updatedTask,
      updatedAt: new Date().toISOString(),
    };

    setStoredTasks(tasks);
    return NextResponse.json(tasks[taskIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter((t) => t.id !== id);
    
    if (filteredTasks.length === tasks.length) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    setStoredTasks(filteredTasks);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}