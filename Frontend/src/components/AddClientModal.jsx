import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function AddClientModal({ onClose, onAddClient }) {
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('India');
  const [entityType, setEntityType] = useState('Private Limited Company');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!companyName.trim()) {
      setError('Company Name is required.');
      return;
    }
    if (!country.trim()) {
      setError('Country is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddClient({
        company_name: companyName,
        country,
        entity_type: entityType,
      });
    } catch (err) {
      setError('An error occurred while adding the client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse_surface/30 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-md rounded-2xl shadow-[0_20px_60px_rgba(19,27,46,0.15)] overflow-hidden flex flex-col">
        <header className="px-6 py-5 border-b border-surface_container_high/50 flex justify-between items-center bg-surface_container_lowest">
          <h2 className="text-xl font-heading font-bold text-on_surface">New Client</h2>
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
            <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Company Name *</label>
            <input 
              type="text" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest focus:border-primary/30 transition-all placeholder:text-outline_variant"
              placeholder="e.g., Acme Corp"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Entity Type *</label>
            <select 
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest transition-all"
              disabled={isSubmitting}
            >
              <option value="Private Limited Company">Private Limited Company</option>
              <option value="Public Limited Company">Public Limited Company</option>
              <option value="Limited Liability Partnership">Limited Liability Partnership</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on_surface_variant mb-1.5">Country *</label>
            <input 
              type="text" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-surface_container_low border border-outline_variant/40 text-on_surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface_container_lowest focus:border-primary/30 transition-all placeholder:text-outline_variant"
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
            className="px-5 py-2 bg-gradient-to-r from-primary to-primary_container text-white font-semibold rounded-xl text-sm shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Client'}
          </button>
        </footer>
      </div>
    </div>
  );
}
