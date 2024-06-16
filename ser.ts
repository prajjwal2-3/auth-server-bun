const password = "ye crack nahi ho paega";

const hash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 4, // number between 4-31
  });

console.log(hash.toString())