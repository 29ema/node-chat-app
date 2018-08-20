const expect=require('expect');
const {isRealString}= require('./validation');

describe('isRealString', ()=>{

    it('should reject non-string values',()=>{
        var str=123;
        var result= isRealString(str);
        expect(result).toBe(false);
        
        //make sure returns bolean- isRealString
    });

    it('should reject strings with only spaces',()=>{
        var str="     ";

        var result= isRealString(str);
        expect(result).toBe(false);

    });

    it('should allow string with non-space characters',()=>{
        var str="  abc   ";
        var result= isRealString(str);
        expect(result).toBe(true);

    });
});