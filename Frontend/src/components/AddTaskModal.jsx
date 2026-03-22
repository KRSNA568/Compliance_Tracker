import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function AddTaskModal({ onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Tax Filing');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (title.length > 150) {
      setError('Title cannot exceed 150 characters.');
      return;
    }
    if (!dueDate) {
      setError('Due Date is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddTask({
        title,
        description,
        category,
        priority,
        due_date: dueDate,
      });
    } catch (err) {
      setError('An error occurred while creating the task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse_surface/30 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-lg rounded-2xl shadow-[0_20px_60px_rgba(19,27,46,0.15)] overflow-hidden flex flex-col">
        <header className="px-6 py-5 border-b border-surface_container_high/50 flex justify-between items-center bg-surface_container_lowest">
          <h2 className="text-xl font-heading font-bold text-on_surface">New Compliance Task</h2>
          <button onClick={onClose} className="p-2 text-on_surface_variant hover:text-error hover:bg-error_container/50 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="bg-error_container/50 border border-error/20 text-on_error_container p-3 rounded-xl text-sm flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 shrink-0 opacity-80" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Task Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest focus:border-primary/30 transition-all placeholder:text-outline_variant"
              placeholder="e.g., Annual ROC Filing"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Category *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest transition-all"
                disabled={isSubmitting}
              >
                <option value="Tax Filing">Tax Filing</option>
                <option value="GST Return">GST Return</option>
                <option value="ROC Filing">ROC Filing</option>
                <option value="Audit">Audit</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Priority *</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest transition-all"
                disabled={isSubmitting}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Due Date *</label>
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Description (Optional)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest transition-all resize-none h-24"
              placeholder="Add narrative or operational details..."
              disabled={isSubmitting}
            />
          </div>
        </form>

        <footer className="px-6 py-4 border-t border-surface_container_high/50 bg-surface_container flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2 text-on_surface font-medium hover:bg-surface_container_high rounded-xl text-sm transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2 bg-gradient-to-r from-primary to-primary_container text-white font-semibold rounded-xl text-sm shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isSubmitting ? 'Saving...' : 'Add Task'}
          </button>
        </footer>
      </div>
    </div>
  );
}
