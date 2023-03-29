// import Validator from '../dist/validator'
const Validator = require('../dist/validator')

const validator = new Validator()
describe('test validator', () => {
  /*   test('checkEmpty', () => {
      expect(validator.checkEmpty('   ')).toBe(false);
    }); */

  /*   test('checkByRule-mail', () => {
      expect(validator.checkByRule('mail', '12312312@163.com')).toBe(true);
      expect(validator.checkByRule('mail', 'asdasd@qq.com')).toBe(true);
      expect(validator.checkByRule('mail', 'asd123asd@outlook.com')).toBe(true);
      expect(validator.checkByRule('mail', 'a_asd.asd-d@outlook.com')).toBe(true);
      expect(validator.checkByRule('mail', 'a_asd.asd-d@outlook123.com')).toBe(true);
      expect(validator.checkByRule('mail', '_asd@asd.com')).toBe(true);
      expect(validator.checkByRule('mail', 'd.d.asd@asd.com')).toBe(true);
      expect(validator.checkByRule('mail', 'd.da.a@asd.com')).toBe(true);
  
      expect(validator.checkByRule('mail', 'a_asd.asd-d@outlook123.')).toBe(false);
      expect(validator.checkByRule('mail', 'a_asd.asd-d@outlook123.123')).toBe(false);
      expect(validator.checkByRule('mail', 'a_asd.asd-d@.123')).toBe(false);
      expect(validator.checkByRule('mail', 'a_asd.asd-d@asd123')).toBe(false);
      expect(validator.checkByRule('mail', '.asd@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', '-asd@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', '阿松大@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', 'asd阿asd@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', '12阿asd@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', '123%12@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', '123@12@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', '@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', 'asd..asd@asd.com')).toBe(false);
      expect(validator.checkByRule('mail', '123..123@asd.com')).toBe(false);
  
    }); */


  /*   test('checkByRule-nameCh', () => {
      expect(validator.checkByRule('nameCh', '核问题')).toBe(true)
      expect(validator.checkByRule('nameCh', '核问')).toBe(true)
      expect(validator.checkByRule('nameCh', '核')).toBe(false)
  
      expect(validator.checkByRule('nameCh', '啊啊啊123')).toBe(false)
      expect(validator.checkByRule('nameCh', '核啊asd')).toBe(false)
      expect(validator.checkByRule('nameCh', '核啊-')).toBe(false)
      expect(validator.checkByRule('nameCh', '核啊.')).toBe(false)
      expect(validator.checkByRule('nameCh', '核啊@')).toBe(false)
      expect(validator.checkByRule('nameCh', '核a')).toBe(false)
      expect(validator.checkByRule('nameCh', '123')).toBe(false)
      expect(validator.checkByRule('nameCh', 'asd')).toBe(false)
      expect(validator.checkByRule('nameCh', '啊a啊')).toBe(false)
      expect(validator.checkByRule('nameCh', '啊2啊')).toBe(false)
  
  
      expect(validator.checkByRule('nameCh', '阿松大.阿松大')).toBe(true)
      expect(validator.checkByRule('nameCh', '阿松大.阿松大.阿松大')).toBe(true)
    }) */

  test('checkByRule - pw', () => {
    expect(validator.checkByRule('pw', '123123', 1)).toBe(true)
    expect(validator.checkByRule('pw', 'asdasd', 1)).toBe(true)
    expect(validator.checkByRule('pw', '123asd', 1)).toBe(true)

    expect(validator.checkByRule('pw', '23asd', 1)).toBe(false)
    expect(validator.checkByRule('pw', '23 asd', 1)).toBe(false)
    expect(validator.checkByRule('pw', '阿松大123', 1)).toBe(false)

    expect(validator.checkByRule('pw', 'asd123123', 2)).toBe(true)
    expect(validator.checkByRule('pw', 'asd123!@', 2)).toBe(true)
    expect(validator.checkByRule('pw', 'asd123!as', 2)).toBe(true)

    expect(validator.checkByRule('pw', 'asdasdasd', 2)).toBe(false)
    expect(validator.checkByRule('pw', '12345678', 2)).toBe(false)

    expect(validator.checkByRule('pw', 'asd123!@', 3)).toBe(true)
    expect(validator.checkByRule('pw', 'asd123!a', 3)).toBe(true)
    expect(validator.checkByRule('pw', 'asd123123#', 3)).toBe(true)
    expect(validator.checkByRule('pw', 'asd123123(', 3)).toBe(true)
    expect(validator.checkByRule('pw', 'asd123123_', 3)).toBe(true)
    expect(validator.checkByRule('pw', 'asd123123+', 3)).toBe(true)

    expect(validator.checkByRule('pw', 'asd123123', 3)).toBe(false)
    expect(validator.checkByRule('pw', 'asd123112323', 3)).toBe(false)
    expect(validator.checkByRule('pw', '!@123112323', 3)).toBe(false)
    expect(validator.checkByRule('pw', '123123123', 3)).toBe(false)
    expect(validator.checkByRule('pw', 'asdasdasd', 3)).toBe(false)
    expect(validator.checkByRule('pw', '!!!!!!!!', 3)).toBe(false)
    expect(validator.checkByRule('pw', '!!!!!!  !', 3)).toBe(false)
    expect(validator.checkByRule('pw', '123阿松大123asd@', 3)).toBe(false)


  })

});