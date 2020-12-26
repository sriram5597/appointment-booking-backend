exports.greeting = (req, res) => {
  const resp = {
    message: 'Hello World',
  };

  return res.status(200).json(resp);
};
