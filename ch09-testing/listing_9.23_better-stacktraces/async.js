//define an asynchronous function
module.exports = () => {
  setTimeout(() => {
    throw new Error();
  })
};
