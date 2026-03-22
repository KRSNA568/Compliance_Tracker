import React, { useState, useEffect } from 'react';
import { getClients, getTasks, createTask, updateTaskStatus, createClient, updateClient, deleteClient, updateTask, deleteTask } from './api';
import Sidebar from './components/Sidebar';
import TaskBoard from './components/TaskBoard';

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      fetchTasks(selectedClient.id, statusFilter, categoryFilter);
    }
  }, [selectedClient, statusFilter, categoryFilter]);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getClients();
      setClients(data);
      if (data.length > 0) {
        setSelectedClient(data[0]);
      }
    } catch (err) {
      setError('Failed to load clients. Retrying...');
      // Simple retry logic could be added here
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async (clientId, status, category) => {
    try {
      setIsLoading(true);
      const params = {};
      if (status) params.status = status;
      if (category) params.category = category;
      const data = await getTasks(clientId, params);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      setTasks(originalTasks); // Rollback optimistic update
    }
  };

  const handleAddClient = async (payload) => {
    const newClient = await createClient(payload);
    setClients(prev => [...prev, newClient].sort((a, b) => a.company_name.localeCompare(b.company_name)));
    setSelectedClient(newClient);
  };

  const handleEditClient = async (clientId, payload) => {
    const updated = await updateClient(clientId, payload);
    setClients(prev => prev.map(c => c.id === clientId ? updated : c).sort((a, b) => a.company_name.localeCompare(b.company_name)));
    if (selectedClient?.id === clientId) setSelectedClient(updated);
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm('Are you sure you want to delete this client and all their tasks?')) return;
    await deleteClient(clientId);
    const newClients = clients.filter(c => c.id !== clientId);
    setClients(newClients);
    if (selectedClient?.id === clientId) {
      setSelectedClient(newClients.length > 0 ? newClients[0] : null);
      setTasks([]);
    }
  };

  const handleAddTask = async (payload) => {
    const newTask = await createTask(selectedClient.id, payload);
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = async (taskId, payload) => {
    const updated = await updateTask(taskId, payload);
    setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <button onClick={fetchClients} className="px-4 py-2 bg-primary text-white rounded-md">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface relative overflow-hidden">
      <Sidebar 
        clients={clients} 
        selectedClient={selectedClient} 
        onSelectClient={(c) => { setSelectedClient(c); setIsSidebarOpen(false); }}
        onAddClient={handleAddClient}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 flex flex-col h-full bg-surface_container_low lg:rounded-tl-[2rem] shadow-[-10px_0_40px_rgba(19,27,46,0.03)] lg:border-l border-white/50 w-full relative z-10 w-full min-w-0">
        <header className="lg:hidden flex items-center p-4 border-b border-surface_container_high/50 bg-surface_container_lowest">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 mr-3 bg-surface_container_low rounded-lg focus:outline-none">
            <svg className="w-5 h-5 text-on_surface" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <h1 className="text-lg font-heading font-bold text-on_surface tracking-tight">Compliance<span className="text-primary">Suite</span></h1>
        </header>

        <TaskBoard 
          client={selectedClient} 
          tasks={tasks} 
          isLoading={isLoading}
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onStatusFilterChange={setStatusFilter}
          onCategoryFilterChange={setCategoryFilter}
          onStatusChange={handleStatusChange}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
