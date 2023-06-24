const {mapObjectArray, getNewUser} = require('./app2');

describe("mapObjectArray", () => {
  test("maps values to new array", () => {
    const result = mapObjectArray({age: 33, height: 178}, (k, v) => {
      return v + 5;
    });

    // expect is an assertion library that lets us make assertions about our code
    // https://jestjs.io/docs/en/expect
    expect(result).toEqual([38, 183]);
    });

  test("callback gets called", () => {

    // mockCallback is a mock function that we can use to assert that it was called
    // and how many times it was called and with what arguments it was called
    // https://jestjs.io/docs/en/mock-functions
    const mockCallback = jest.fn();
    mapObjectArray({age: 33, height: 178}, mockCallback);

    // The mock function is called twice with the parameters
    // https://jestjs.io/docs/en/mock-function-api#mockfnmockreturnvaluevalue
    expect(mockCallback.mock.calls.length).toBe(2);
  });

});


describe("getNewUser", () => {
  test("returns user", async () => {
    const user = await getNewUser(1);
    expect(user).toEqual({email: 'test@test.com', id: 1, name: 'test', verified: false});

    const user2 = await getNewUser(2);
    expect(user2).toEqual({email: 'test2@test.com', id: 2, name: 'test2', verified: true});

    const user3 = await getNewUser(3);
    // toBeTruthy is a matcher that asserts that the value is truthy
    // https://jestjs.io/docs/en/expect#tobetruthy
    expect(user3).toBeTruthy();
    expect(user3.id).toBe(3);
    expect(user3.name).toBe('test3');
  });

  test("no user found", async () => {

    // expect.assertions lets us assert that a certain number of assertions are called
    // https://jestjs.io/docs/en/expect#expectassertionsnumber
    expect.assertions(2);

    try {
      await getNewUser(4);
    } catch (e) {
      expect(e).toBeTruthy();
    }

    try {
      await getNewUser(5);
    } catch (e) {
      expect(e.message).toBe('User not found');
    }
  });
});
