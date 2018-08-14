const expect=require('expect');
const {generateMessage}= require('../utils/message');


describe('generateMessage', ()=>{



    it('should generate the correct message object',()=>{
        var from= 'Jen';
        var text= "Some msg";
        var message=generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toInclude({from,text});
    });
});