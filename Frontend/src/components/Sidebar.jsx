import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import AddClientModal from './AddClientModal';

export default function Sidebar({ clients, selectedClient, onSelectClient, onAddClient }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="w-72 bg-surface h-full flex flex-col pt-8 pb-4">
      <div className="px-8 mb-8">
        <h1 className="text-xl font-heading font-extrabold text-on_surface tracking-tight">Compliance<span className="text-primary">Suite</span></h1>
        <p className="text-xs text-on_surface_variant tracking-widest uppercase mt-1">Executive Ledger</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-2">
        {clients.map(client => {
          const isActive = selectedClient?.id === client.id;
          return (
            <button
              key={client.id}
              onClick={() => onSelectClient(client)}
              className={`w-full group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer
                ${isActive 
                  ? 'bg-primary_fixed text-on_primary_fixed_variant' 
                  : 'text-on_surface_variant hover:bg-surface_container hover:text-on_surface'}`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <Building2 className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-primary' : 'text-outline'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? 'font-semibold' : ''}`}>
                  {client.company_name}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="px-8 mt-auto pt-6 border-t border-surface_container_high space-y-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center px-4 py-2 border border-outline_variant/40 hover:border-primary/50 text-primary font-semibold rounded-xl text-sm transition-colors bg-surface_container_lowest shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
        <p className="text-xs text-outline space-x-1">
          <span>v2.4.0</span>
          <span>•</span>
          <span>System Active</span>
        </p>
      </div>

      {isModalOpen && (
        <AddClientModal 
          onClose={() => setIsModalOpen(false)}
          onAddClient={async (payload) => {
            await onAddClient(payload);
            setIsModalOpen(false);
          }}
        />
      )}
    </aside>
  );
}
