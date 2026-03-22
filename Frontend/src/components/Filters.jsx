import React from 'react';
import { Plus } from 'lucide-react';

export default function Filters({
  statusFilter,
  categoryFilter,
  onStatusFilterChange,
  onCategoryFilterChange,
  onOpenModal
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="appearance-none bg-surface_container_lowest/80 backdrop-blur-md border border-outline_variant/50 hover:border-outline/80 px-4 py-2 pr-8 rounded-xl text-sm font-medium text-on_surface_variant outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on_surface_variant">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div className="relative">
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="appearance-none bg-surface_container_lowest/80 backdrop-blur-md border border-outline_variant/50 hover:border-outline/80 px-4 py-2 pr-8 rounded-xl text-sm font-medium text-on_surface_variant outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="Tax Filing">Tax Filing</option>
          <option value="GST Return">GST Return</option>
          <option value="ROC Filing">ROC Filing</option>
          <option value="Audit">Audit</option>
          <option value="Other">Other</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on_surface_variant">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <button
        onClick={onOpenModal}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary_container text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200"
      >
        <Plus className="w-4 h-4 mr-1.5" />
        Add Task
      </button>
    </div>
  );
}
