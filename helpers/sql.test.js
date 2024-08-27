const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');
const Test = require('supertest/lib/test');

describe('sqlForPartialUpdate', () => {
  test('work: single field update', () => {
    const dataToUpdate = { firstName: 'Aliya' };
    const jsToSql = { firstName: 'first_name' };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ['Aliya']
    });
  });

  test('work: multiple fields update', () => {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };
    const jsToSql = { firstName: 'first_name', age: 'age' };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ['Aliya', 32]
    });
  });
})

