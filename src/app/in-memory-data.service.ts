import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService 
{
  createDb() {
    /*const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};*/
    const UserList = [
      {
        id: 11,UserID: 11, UserFirstName: 'Mr. Nice', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 12,UserID: 12, UserFirstName: 'Narco', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 13,UserID: 13, UserFirstName: 'Bombasto', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 14,UserID: 14, UserFirstName: 'Celeritas', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 15,UserID: 15, UserFirstName: 'Magneta', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 16,UserID: 16, UserFirstName: 'RubberMan', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 17,UserID: 17, UserFirstName: 'Dynama', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 18,UserID: 18, UserFirstName: 'Dr IQ', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 19,UserID: 19, UserFirstName: 'Magma', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      },
      {
        id: 20,UserID: 20, UserFirstName: 'Tornado', UserLastName: 'Hegab', UserNickName: "M_Hegab", UserEmail: "mh@h.com",
          UserPassword: 'cccccccc', UserIsBlocked: false, UserPhoto: 'vvvvvvvv', FKRoleID: 1
      }
  ];
  return {UserList};
  }

  
}
