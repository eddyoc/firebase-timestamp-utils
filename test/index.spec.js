import assert from 'assert';
import moment from 'moment';
import { expect } from 'chai';
import ft from '../index';

const getTimestamp = () => {
  const seconds = moment().unix();
  return { seconds };
};

describe('firebase-timestamp-utils', () => {

  it('.secondsFromNow() should be negative in the past', () => {
    const ts = getTimestamp();
    // console.log(JSON.stringify(ft));
    // console.log(ft.isFuture);
    const secondsFromNow = ft.secondsFromNow(ts);
    // assert(secondsFromNow > -1 && secondsFromNow < 0);
    expect(secondsFromNow).to.be.at.least(-1);
    expect(secondsFromNow).to.be.at.most(0);
  });

  it('.isNow() should fail with zero tolerance', () => {
    const ts = getTimestamp();

    assert.notEqual(ft.isNow(ts), true);
  });

  it('.isNow() should succeed with 2 second tolerance', () => {
    const ts = getTimestamp();

    assert.equal(ft.isNow(ts, 2), true);
  });



  // it('defining a method is simple', function() {
  //   class User {
  //     writesTests() {
  //       return false;
  //     }
  //   }
  //
  //   const notATester = new User();
  //   assert.equal(notATester.writesTests(), false);
  // });
  //
  // it('multiple methods need no commas (opposed to object notation)', function() {
  //   class User {
  //     wroteATest() {
  //       this.everWroteATest = true;
  //     }
  //     isLazy() {
  //       return !this.everWroteATest;
  //     }
  //   }
  //   const tester = new User();
  //   assert.equal(tester.isLazy(), true);
  //   tester.wroteATest();
  //   assert.equal(tester.isLazy(), false);
  // });
  //
  // it('anonymous class', () => {
  //   const classType = typeof class {};
  //   assert.equal(classType, 'function');
  // });

});