export const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    code: err.code || "SERVER_ERR",
    message: err.message || "Something went wrong"
  });
};