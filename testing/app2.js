const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const users = [
  {email: 'test@test.com', id: 1, name: 'test', verified: false},
  {email: 'test2@test.com', id: 2, name: 'test2', verified: true},
  {email: 'test3@test.com', id: 3, name: 'test3', verified: false},

];

const getNewUser = async id => {
  await delay(1000);
  const user = users.find(user => user.id === id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;

};

const mapObjectArray = (a, cb) => {
  const result = [];

  for(const [k, v] of Object.entries(a)) {
    result.push(cb(k, v, a));
  }

  return result;
};

module.exports = {
  getNewUser,
  mapObjectArray
};
