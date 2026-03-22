import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function EditTaskModal({ task, onClose, onEditTask }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !dueDate) {
      setError('Title and Due Date are required.');
      return;
    }
    if (title.length > 150) {
      setError('Title cannot exceed 150 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onEditTask(task.id, {
        title,
        description,
        category,
        priority,
        due_date: dueDate,
      });
    } catch (err) {
      setError('An error occurred while updating the task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-inverse_surface/30 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-lg rounded-2xl shadow-[0_20px_60px_rgba(19,27,46,0.15)] overflow-hidden flex flex-col">
        <header className="px-6 py-5 border-b border-surface_container_high/50 flex justify-between items-center bg-surface_container_lowest">
          <h2 className="text-xl font-heading font-bold text-on_surface">Edit Task</h2>
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
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Category *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
                className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Description (Optional)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none h-24"
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
            className="px-5 py-2 bg-gradient-to-r from-primary to-primary_container text-white font-semibold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </footer>
      </div>
    </div>
  );
}
