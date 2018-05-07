const expect = require('expect');
const { Users } = require('./users');

describe('Users', () =>  {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Marcus',
                room: 'Node Course'
            },
            {
                id: 2,
                name: 'Coz',
                room: 'GoT'
            },
            {
                id: 3,
                name: 'Brenna',
                room: 'Node Course'
            },            
        ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Brenna',
            room: 'GoT'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {

    });

    it('should not remove a user', () => {
        
    });

    it('should find user', () => {
        var userId = 1;
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
      });
    

    it('should not find user', () => {
        var id = 4;
        var user = users.getUser(id);
        expect(user).toNotExist(); 
    });

    it('should return users from Node Course room', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Marcus', 'Brenna']);
    });

    it('should return users from GoT room', () => {
        var userList = users.getUserList('GoT');

        expect(userList).toEqual(['Coz']);
    });
});