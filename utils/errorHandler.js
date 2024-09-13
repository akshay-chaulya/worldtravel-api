const errorHandler = (res, error) => {
  return res.status(error.status || 500).json({
    message: error.status
      ? error.message
      : "Server error. Please try again later.",
    success: false,
    error: error.error || undefined,
  });
};

export default errorHandler;
