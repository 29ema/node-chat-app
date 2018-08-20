
[{
    id: 'vzbf',
    name:"Evelyn",
    room:"The room Fans"
}]

class Users {
  constructor () {
    this.users = []; 
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  getUserList(room){
    var users= this.users.filter((user)=>user.room===room);
    var namesArray=users.map((user)=> user.name)
    return namesArray;  //returns an array of strings w names of users
  }
  removeUser(id){

    var user= this.getUser(id);

    if(user){
      this.users=this.users.filter((user)=>user.id!==id); //e fshi user
    }
    return user;
  }
  getUser(id){
    return this.users.filter((user)=> user.id===id)[0];

  //   implementim ndryshe:
  //   var idArray=this.users.map((user)=> user.id);
  //   var i =idArray.indexOf(id);
  //   if(i>=0)
  //       return this.users[i]; //returns object
  }
}

module.exports = {Users};








