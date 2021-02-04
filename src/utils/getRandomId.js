const getRandomId = () => {
  const date = +new Date();
  const random = Math.random().toString().substr(2);
  return date + random;
}

export default getRandomId;