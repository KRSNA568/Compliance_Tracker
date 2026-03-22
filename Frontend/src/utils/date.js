import { startOfDay, isBefore, parseISO } from 'date-fns';

/**
 * Determines if a task is overdue based on strict UTC-midnight rules.
 * @param {string} dueDate - ISO date string (YYYY-MM-DD)
 * @param {string} status - Task status ('Pending', 'In Progress', 'Completed')
 * @returns {boolean} True if overdue
 */
export const isOverdue = (dueDate, status) => {
  if (status === 'Completed') return false;
  if (!dueDate) return false;

  // We only compare the DATE part. Timezone of the user should not make a date "overdue" early.
  // Using startOfDay normalizes both to 00:00:00 local time
  const taskDate = startOfDay(parseISO(dueDate));
  const today = startOfDay(new Date());

  return isBefore(taskDate, today);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
