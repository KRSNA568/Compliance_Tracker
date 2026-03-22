import React, { useState } from 'react';
import Filters from './Filters';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { PackageOpen } from 'lucide-react';

export default function TaskBoard({
  client,
  tasks,
  isLoading,
  statusFilter,
  categoryFilter,
  onStatusFilterChange,
  onCategoryFilterChange,
  onStatusChange,
  onAddTask
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!client) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <p className="text-on_surface_variant text-lg">Select a client from the ledger to view their compliance tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-surface_container_low p-10 overflow-y-auto">
      <header className="flex justify-between items-end mb-10 pb-6 border-b border-surface_container_high/50">
        <div>
          <h2 className="text-display-sm text-on_surface font-heading font-bold">{client.company_name}</h2>
          <p className="text-on_surface_variant mt-2 text-sm">{client.entity_type} • {client.country}</p>
        </div>

        <Filters 
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onStatusFilterChange={onStatusFilterChange}
          onCategoryFilterChange={onCategoryFilterChange}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </header>

      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-surface_container rounded-2xl w-full"></div>
          <div className="h-32 bg-surface_container rounded-2xl w-full"></div>
          <div className="h-32 bg-surface_container rounded-2xl w-full"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-surface_container_highest/20 rounded-3xl border border-outline_variant/20 p-12">
           <PackageOpen className="w-16 h-16 text-primary_fixed_dim mb-6 drop-shadow-lg" />
           <h3 className="text-xl font-heading font-semibold text-on_surface mb-2">The ledger is empty.</h3>
           <p className="text-on_surface_variant text-sm mb-8 text-center max-w-sm">
             We couldn't find any tasks matching your criteria. Double-check your filters or add a new compliance task.
           </p>
           { (statusFilter || categoryFilter) && (
              <button 
                onClick={() => { onStatusFilterChange(''); onCategoryFilterChange(''); }}
                className="text-primary font-medium hover:underline text-sm"
              >
                Clear all filters
              </button>
           )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onStatusChange={onStatusChange} 
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <AddTaskModal 
          onClose={() => setIsModalOpen(false)} 
          onAddTask={(payload) => {
            onAddTask(payload);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
