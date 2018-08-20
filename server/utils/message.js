const moment = require ('moment');

var generateMessage=(from,text)=>{

    return {
        from,
        text,
        createdAt:moment(new Date()).valueOf()
    };
};

var generateLocationMessage=(from,lat,lng)=>{
    return {
        from,
        url: `http://www.google.com/maps?q=${lat},${lng}`,
        createdAt:moment(new Date()).valueOf()
    };
};

module.exports={generateMessage,generateLocationMessage}