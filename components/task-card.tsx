'use client';

import { Task } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-lg',
      task.status === 'completed' && 'opacity-75'
    )}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <h3 className={cn(
            "font-semibold leading-none tracking-tight",
            task.status === 'completed' && 'line-through'
          )}>
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'in-progress' : 'completed')}
        >
          <CheckCircle className={cn(
            'h-4 w-4',
            task.status === 'completed' ? 'text-green-500' : 'text-gray-400'
          )} />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}