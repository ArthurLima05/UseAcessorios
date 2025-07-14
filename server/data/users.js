// Simulação de banco de dados de usuários - em produção, use um banco real
export const users = [];

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export const createUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData,
    createdAt: new Date()
  };
  users.push(newUser);
  return newUser;
};

export const findUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};