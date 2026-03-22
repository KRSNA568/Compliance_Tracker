import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2 } from 'lucide-react';
import AddClientModal from './AddClientModal';
import EditClientModal from './EditClientModal';

export default function Sidebar({ clients, selectedClient, onSelectClient, onAddClient, onEditClient, onDeleteClient, isOpen, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  return (
    <aside className={`fixed lg:relative z-40 bg-surface h-full flex flex-col pt-8 pb-4 transition-transform duration-300 w-72 lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
      <div className="px-8 mb-8">
        <h1 className="text-xl font-heading font-extrabold text-on_surface tracking-tight">Compliance<span className="text-primary">Suite</span></h1>
        <p className="text-xs text-on_surface_variant tracking-widest uppercase mt-1">Executive Ledger</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-2">
        {clients.map(client => {
          const isActive = selectedClient?.id === client.id;
          return (
            <div
              key={client.id}
              className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left
                ${isActive 
                  ? 'bg-primary_fixed text-on_primary_fixed_variant' 
                  : 'text-on_surface_variant hover:bg-surface_container hover:text-on_surface'}`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <button onClick={() => onSelectClient(client)} className="flex-1 min-w-0 flex items-center cursor-pointer">
                <Building2 className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-primary' : 'text-outline'}`} />
                <p className={`text-sm font-medium truncate pr-2 ${isActive ? 'font-semibold' : ''}`}>
                  {client.company_name}
                </p>
              </button>

              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingClient(client)} className="p-1.5 text-on_surface_variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => onDeleteClient(client.id)} className="p-1.5 text-on_surface_variant hover:text-error hover:bg-error/10 rounded-md transition-colors ml-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
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

      {editingClient && (
        <EditClientModal 
          client={editingClient}
          onClose={() => setEditingClient(null)}
          onEditClient={async (id, payload) => {
            await onEditClient(id, payload);
            setEditingClient(null);
          }}
        />
      )}
    </aside>
  );
}
