const add = (a, b) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) throw new Error("Numbers must be non-negative");
      resolve(a + b);
    }, 2000);
  });

const doWork = async () => {
  const sum = await add(55, 65);
  const sum2 = await add(55, sum);
  const sum3 = await add(sum2, 65);
  return sum3;
};

doWork()
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
