import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 hover:bg-red-200',
  medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  low: 'bg-green-100 text-green-800 hover:bg-green-200',
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'capitalize',
        priorityColors[priority]
      )}
    >
      {priority}
    </Badge>
  );
}