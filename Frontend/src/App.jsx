import React, { useState, useEffect } from 'react';
import { getClients, getTasks, createTask, updateTaskStatus, createClient } from './api';
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

  const handleAddTask = async (payload) => {
    const newTask = await createTask(selectedClient.id, payload);
    setTasks([...tasks, newTask]);
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
    <div className="flex h-screen bg-surface">
      <Sidebar 
        clients={clients} 
        selectedClient={selectedClient} 
        onSelectClient={setSelectedClient}
        onAddClient={handleAddClient}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden bg-surface_container_low rounded-tl-2xl shadow-[-10px_0_40px_rgba(19,27,46,0.03)] border-l border-white/50">
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
        />
      </main>
    </div>
  );
}

export default App;
