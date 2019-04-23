import { TestScheduler } from 'rxjs/testing';

const getScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

export { getScheduler };
