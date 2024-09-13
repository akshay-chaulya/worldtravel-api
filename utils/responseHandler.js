const responseHandler = (res, obj = {}) => {
  res.json({
    success: true,
    ...obj,
  });
};

export default responseHandler;
