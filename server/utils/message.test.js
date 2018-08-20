const expect=require('expect');
const {generateMessage, generateLocationMessage}= require('../utils/message');


describe('generateMessage', ()=>{
    
    it('should generate the correct message object',()=>{
        var from= 'Jen';
        var text= "Some msg";
        var message=generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate the correct location object',()=>{
        var from= 'Deb';
        var lat="41.331294799999995";
        var lng="19.824663299999997";
        var url= `http://www.google.com/maps?q=${lat},${lng}`
        var message=generateLocationMessage(from,lat,lng);

        expect(message.url).toBe(url);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toInclude({from,url});
    });
});