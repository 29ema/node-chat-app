const expect= require('expect');
const {Users}= require('./users');


var users=new Users();

beforeEach(()=>{
    users.users=[{ //mbishkruaj arrayn para exe te cdo testi
        id:'1',
        name:'Mike',
        room:'Node Course'
    },{
        id:'2',
        name:'Ann',
        room:'React Course'
    },{
        id:'3',
        name:'Alise',
        room:'Node Course'
    }
 ]
});

describe('Users',()=>{
    it('should add new user',()=>{
        var users= new Users();
        var user={
            id:'123',
            name:'Andrew',
            room:'The Office Fans'
        };
        var resUser= users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
        // expect(users.users.length).toEqual(4); do jet kaq kur te kemi get users, qe tmos krijohet objekt i ri me lart new Users()
    });

    it('should remove a user',()=>{
        var id= '1';
        var res=users.removeUser(id);
        expect(res.name).toEqual('Mike');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user',()=>{
        var id= '8';
        var res=users.removeUser(id);
        expect(res).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user',()=>{
        var res=users.getUser('1');
        expect(res.name).toBe('Mike');
    });

    it('should not find user',()=>{
        var res=users.getUser('9');
        expect(res).toNotExist();
    });

    it('should return names for node course',()=>{
        var userList= users.getUserList('Node Course');
        expect(userList.length).toEqual(2);
        expect(userList).toEqual(['Mike','Alise']);
   });

    it('should return names for react course',()=>{
        var userList= users.getUserList('React Course');
        expect(userList.length).toEqual(1);
        expect(userList).toEqual(['Ann']);

    });

    it('should get list of users',()=>{
        var res=users.getUserList('Node Course');
        expect(res.length).toEqual(2);
    });

});