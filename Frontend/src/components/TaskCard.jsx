import React from 'react';
import { isOverdue, formatDate } from '../utils/date';
import { Clock } from 'lucide-react';

const priorityColors = {
  Low: 'bg-surface_dim text-on_surface_variant',
  Medium: 'bg-primary_fixed text-on_primary_fixed',
  High: 'bg-error_container text-on_error_container',
};

const statusColors = {
  Pending: 'bg-surface_container_high text-on_surface',
  'In Progress': 'bg-secondary_fixed text-on_secondary_fixed',
  Completed: 'bg-tertiary_container text-on_tertiary_container',
};

export default function TaskCard({ task, onStatusChange }) {
  const overdue = isOverdue(task.due_date, task.status);

  return (
    <div className={`group relative bg-surface_container_lowest rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[-5px_15px_40px_rgba(19,27,46,0.06)] 
      ${overdue ? 'ring-1 ring-error/40 border-l-4 border-l-error' : 'border border-outline_variant/30'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">{task.category}</span>
          <h3 className="text-lg font-heading font-bold text-on_surface pr-4">{task.title}</h3>
        </div>
        
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-on_surface_variant line-clamp-2 min-h-[40px] mb-6">
        {task.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-surface_container_high/50">
        <div className={`flex items-center text-sm font-medium ${overdue ? 'text-error font-bold' : 'text-on_surface_variant'}`}>
          <Clock className="w-4 h-4 mr-2 opacity-70" />
          {formatDate(task.due_date)}
        </div>

        <select 
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className={`appearance-none bg-surface_container_lowest border border-outline_variant/50 hover:border-outline/80 px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 transition-all ${statusColors[task.status]}`}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
