const allowedCategories = ['Tax Filing', 'GST Return', 'ROC Filing', 'Audit', 'Other'];
const allowedPriorities = ['Low', 'Medium', 'High'];
const allowedStatuses = ['Pending', 'In Progress', 'Completed'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidDateString(value) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

function validateCreateTaskPayload(payload) {
  const { title, category, due_date: dueDate, priority } = payload;

  if (!isNonEmptyString(title) || !isNonEmptyString(category) || !isNonEmptyString(dueDate) || !isNonEmptyString(priority)) {
    return 'title, category, due_date and priority are required';
  }

  if (title.length > 150) {
    return 'title must be at most 150 characters';
  }

  if (!allowedCategories.includes(category)) {
    return 'Invalid category value';
  }

  if (!allowedPriorities.includes(priority)) {
    return 'Invalid priority value';
  }

  if (!isValidDateString(dueDate)) {
    return 'Invalid due_date value';
  }

  return null;
}

function validateStatusPayload(payload) {
  const { status } = payload;

  if (!allowedStatuses.includes(status)) {
    return 'Invalid status value';
  }

  return null;
}

module.exports = {
  allowedCategories,
  allowedPriorities,
  allowedStatuses,
  validateCreateTaskPayload,
  validateStatusPayload
};
