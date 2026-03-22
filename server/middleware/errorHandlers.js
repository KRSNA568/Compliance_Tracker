function notFoundHandler(req, res) {
  return res.status(404).json({ error: 'Route not found' });
}

function globalErrorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const message = error?.message || 'Internal Server Error';
  return res.status(500).json({ error: message });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
