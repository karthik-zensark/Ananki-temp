import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { User } from '../models/user.model';
import { CityWise } from '../models/cities.model';
import { AccessType } from '../models/access.model';
import { CitiesAll } from '../models/citiesall.model';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersChanged = new Subject<User[]>();

  private cities: City[] = [
    {
      id: 1,
      name: 'Fremont, CA',
      users: [
        {
          accessLevel: 1,
          userId: 1,
        },
      ],
    },
    {
      id: 2,
      name: 'Bengaluru, IN',
      users: [
        {
          accessLevel: 2,
          userId: 2,
        },
      ],
    },
    {
      id: 3,
      name: 'NYC, NY',
      users: [
        {
          accessLevel: 3,
          userId: 3,
        },
      ],
    },
    {
      id: 4,
      name: 'Austin, TX',
      users: [
        {
          accessLevel: 1,
          userId: 5,
        },
        {
          accessLevel: 2,
          userId: 4,
        },
      ],
    },
    {
      id: 5,
      name: 'Berlin, DE',
      users: [
        {
          accessLevel: 1,
          userId: 5,
        },
      ],
    },
  ];

  citiesSubject = new BehaviorSubject<City[]>(this.cities);

  private users: User[] = [
    {
      ppic: '../../assets/CommonAssets/john-fivegee.svg',
      active: '../../assets/CommonAssets/active-dot.svg',
      name: 'Don Fivegee',
      email: 'DonFivegee@ttesla.com',
      // emailAlert: true,
      // deviceAlert: true,
      // centralAlert: false,
      // siteAlert: false,
      // securityAlert: true,
      id: 1,
      cities: [],
    },
    {
      ppic: '../../assets/CommonAssets/guy-gooey.svg',
      active: '../../assets/CommonAssets/active-dot.svg',
      name: 'Guy Gooey',
      email: 'GuyGooey@ttesla.com',
      // emailAlert: true,
      // deviceAlert: true,
      // centralAlert: false,
      // siteAlert: false,
      // securityAlert: true,
      id: 2,
      cities: [],
    },
    {
      ppic: '../../assets/CommonAssets/mary-jane.svg',
      active: '../../assets/CommonAssets/inactive-dot.svg',
      name: 'Mary Jane',
      email: 'MaryJane@ttesla.com',
      // emailAlert: true,
      // deviceAlert: true,
      // centralAlert: false,
      // siteAlert: false,
      // securityAlert: true,
      id: 3,
      cities: [],
    },
    {
      ppic: '../../assets/CommonAssets/guy-gooey.svg',
      active: '../../assets/CommonAssets/active-dot.svg',
      name: 'test',
      email: 'GuyGooey@ttesla.com',
      // emailAlert: true,
      // deviceAlert: true,
      // centralAlert: false,
      // siteAlert: false,
      // securityAlert: true,
      id: 4,
      cities: [],
    },
    {
      ppic: '../../assets/CommonAssets/john-fivegee.svg',
      active: '../../assets/CommonAssets/inactive-dot.svg',
      name: 'Don Fivegee',
      email: 'DonFivegee@ttesla.com',
      // emailAlert: true,
      // deviceAlert: true,
      // centralAlert: false,
      // siteAlert: false,
      // securityAlert: true,
      id: 5,
      cities: [],
    },
    {
      ppic: '../../assets/CommonAssets/john-fivegee.svg',
      active: '../../assets/CommonAssets/inactive-dot.svg',
      name: 'Don Fivegee',
      email: 'DonFivegee@ttesla.com',
      // emailAlert: true,
      // deviceAlert: true,
      // centralAlert: false,
      // siteAlert: false,
      // securityAlert: true,
      id: 6,
      cities: [],
    },
  ];

  usersSubject = new BehaviorSubject<User[]>(this.users);

  constructor() {}

  getUsers() {
    return this.usersSubject.asObservable();
  }

  getCities() {
    return this.citiesSubject.asObservable();
  }

  getUser(index: number) {
    console.log(this.users[index]);
    return this.users[index];
  }

  getCity(index: number) {
    console.log(this.cities[index]);
    return this.cities[index];
  }

  addUser(user: User) {
    user.id = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    this.users.push(user);
    this.usersSubject.next(this.users.slice());
  }

  updateUser(index: number, newUser: User) {
    this.users[index] = newUser;
    this.usersSubject.next(this.users.slice());
  }

  updateCity(index: number, newCity: City) {
    this.cities[index] = newCity;
    this.citiesSubject.next(this.cities.slice());
  }

  deleteUser(index: number) {
    const id = this.users[index].id;
    this.users.splice(index, 1);
    for (let i = 0; i < this.cities.length; i++) {
      const userIndex = this.cities[i].users.findIndex(
        (user) => user.userId === id
      );
      if (userIndex >= 0) {
        this.cities[i].users.splice(userIndex);
      }
    }
    this.usersSubject.next(this.users.slice());

    // var sindex = index+1;
    // this.cities.forEach((city) => {
    //   city.users.forEach((cuser) => {
    //     // console.log(cuser.userId)
    //     var cuserId = cuser.userId;
    //     if (cuserId == sindex) {
    //       console.log(city.users.splice(0, 1))
    //       city.users.splice(0, 1);
    //     }
    //   })
    // })
  }

  deleteCity(index: number) {
    // console.log(this.cities.splice(index, 1))
    console.log("hi")

    this.cities.forEach((city) => {
      console.log("loop1")
      city.users.forEach((cuser) => {
        console.log("loop2")
        var cuserId = cuser.userId;
        if (cuserId == index) {
          console.log(index)
          console.log(city.users.splice(0, 1))
        }
      })
    })
  }
}
