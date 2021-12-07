import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ThemePalette } from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { User } from '../models/user.model';
import { City } from '../models/city.model';
import { UserService } from '../services/user.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

interface Permission {
  viewValue: string;
}

// class User {
//   constructor(
//     public ppic: string = '',
//     public active: string = '',
//     public name: string = '',
//     public email: string = '',
//   ) {}
// }


@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out',
                    style({ height: 900, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 900, opacity: 1 }),
            animate('0.3s ease-in',
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
  styles: [],
})
export class AdminpanelComponent implements OnInit {

  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;

  id: number;
  editMode = false;
  // userForm: FormGroup;


  users: User[] = [];
  cities: City[] = [];
  subscription: Subscription;
  citySubscription: Subscription;

  task: Task = {
    name: 'Select Alert Categories',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Device', completed: false, color: 'primary' },
      { name: 'Site Equipment', completed: false, color: 'primary' },
      { name: 'Central', completed: false, color: 'primary' },
      { name: 'Security', completed: false, color: 'primary' },
    ],
  };

  permissions: Permission[] = [
    { viewValue: 'Select' },
    { viewValue: 'R' },
    { viewValue: 'W' },
    { viewValue: 'R/W' },
  ];

  // cities: City[] = [
  //   { value: 'Fremont, CA' },
  //   { value: 'NYC, NY' },
  //   { value: 'Berlin, DE' },
  //   { value: 'Austin, TX' },
  //   { value: 'Bengaluru, IN' },
  // ];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  // userForm = new FormGroup(
  //   {
  //     name: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z ]*$'),
  //     ]),
  //     email: new FormControl('', [
  //       // Validators.required,

  //       Validators.pattern("^[a-zA-Z0-9+_.]+@[a-zA-Z]+[.]+[a-zA-Z]+$"),

  //     ]),
  // )

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.subscription = this.userService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.citySubscription = this.userService.citiesSubject.subscribe(
      (cities: City[]) => {
        this.cities = cities;
      }
    )

    this.assignUsersCities();

    this.setUpCities();

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      // this.initForm();
    });
  }

  assignUsersCities() {
    this.users = this.users.map(user => {
      const cities1 = [];
      this.cities.forEach(city => {
        const index = city.users.findIndex(userCity => user.id === userCity.userId)
        if (index >= 0){
          cities1.push({
            cityId: city.id,
            name: city.name,
            accessLevel: city.users[index].accessLevel,
          })
        }
      })
      user.cities = cities1;
      console.log(user, user.cities);
      return user;
    })
  }

  // Variables
  toggle: any;
  editObject: any;
  siteViewStyle: string = "false";
  userViewStyle: string = "true"

  // Boolean Triggers
  AddNew: boolean = false;
  EditUser: boolean = false;
  userViewToggle: boolean = true;
  siteViewToggle: boolean = false;
  allComplete: boolean = false;

  // Checkbox Triggers
  checked = false;

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }



  // addUser1() {
  //   const id = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
  //   this.users.push({
  //     id: id,
  //     ppic: this.userForm.value.ppic,
  //     active: this.userForm.value.active,
  //     name: this.userForm.value.name,
  //     email: this.userForm.value.email,
  //     emailAlert: this.userForm.value.emailAlert,
  //     deviceAlert: this.userForm.value.deviceAlert,
  //     centralAlert: this.userForm.value.centralAlert,
  //     siteAlert: this.userForm.value.siteAlert,
  //     securityAlert: this.userForm.value.securityAlert,
  //     cities: this.userForm.value.cities,
  //   });

  //   for (let i = 0; i < this.cities.length; i++) {
  //     if (this.userForm.value.cities[i] > 0) {
  //       this.cities[i].users.push({
  //         userId: id,
  //         accessLevel: parseInt(this.userForm.value.cities[i]),
  //       });
  //     }
  //   }
  // }

  getControl(cityIndex) {
    const cities = this.userForm.get('cities') as FormArray;
    const control = cities.controls[cityIndex] as FormControl;
    return control;
  }

  onSubmit() {
      // this.userService.addUser(this.userForm.value);
      const id =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
      this.users.push({
        id: id,
        ppic: this.userForm.value.ppic,
        active: this.userForm.value.active,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        cities: this.userForm.value.cities,
      })
      for (let i = 0; i < this.cities.length; i++) {
        console.log("forloop");
        if (this.userForm.value.cities[i] > 0) {
          this.cities[i].users.push({
            userId: id,
            accessLevel: this.userForm.value.cities[i],
          });
        }
      }
      console.log(this.cities, this.users)
    }

  getControlEdit(cityIndex) {
    const cities = this.editForm.get('cities') as FormArray;
    const control = cities.controls[cityIndex] as FormControl;
    return control;
  }

  onEdit(i: number) {
    console.log(i);
    console.log(this.userService.getUser(0));
    const user = this.userService.getUser(i);
    const city = this.userService.getCity(i);
    console.log(user, city);
    // this.({
    //   name: this.editForm.value.name,
    //   email: this.editForm.value.email,
    //   cities: this.editForm.value.cities,
    // })
    let id = i;
    user.name = this.editForm.value.name;
    user.email = this.editForm.value.email;
    user.cities = this.editForm.value.cities;
    for (let i = 0; i < this.cities.length; i++) {
      console.log("forloop");
      if (this.editForm.value.cities[i] > 0) {
        this.cities[i].users.push({
          userId: id,
          accessLevel: this.editForm.value.cities[i],
        });
      }
    }
    console.log(this.cities, this.users)
  }

  editSubmit(i: number) {
    console.log(i, "yes")
      this.userService.updateUser(i, this.userForm.value);
      console.log(i)
  }


  editClick(i: number) {
    this.EditUser = !this.EditUser;
    this.editObject = this.userService.getUser(i)
    console.log(this.editObject)
    console.log(i)
  }

  openDialog(i) {
    this.dialog.open(this.secondDialog, {panelClass: 'my-class', data: {i: i}});
  }

  confirmDelete(i: number) {
    this.editObject = this.userService.deleteUser(i)
  }

  confirmDelCity(i: number) {
    this.editObject = this.userService.deleteCity(i)
  }

  // temp testing
  getUserById(i: number) {
    this.editObject = this.userService.getUser(i);
  }

  test() {
    var o = 0;
    o = o+2;
    console.log(o);
    let spliceduser = this.users.splice(3, 1)
    console.log(spliceduser);
    spliceduser.forEach((suser) => {
      // var suid = suser.id
      console.log(suser.cities)
      suser.cities.forEach((city) => {
        // console.log(city)
        // city.users.forEach((citiusers) => {
        //   console.log(citiusers);
        // })
      })
    })
    // this.users.forEach((user, index) => {
      // console.log(index);
      // console.log("id in array = ", user.id);
      // console.log(user);

    // });
  }

  testc() {
    // this.cities.forEach((city, index) => {
    //   console.log(index);
    //   console.log(city);
    //   city.users.forEach((user, index) => {
    //     console.log(index)
    //     console.log(user.id);
    //     console.log(user);
    //   })
    //   var a = this.cities.splice(0, 1);
    //   console.log(a)
    // })
    // var cit = this.userService.getCity(0);
    this.assignUsersCities();
  }
  //
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cities: new FormArray([]),
  });

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cities: new FormArray([]),
  })

  setUpCities() {
    const cities = this.userForm.get('cities') as FormArray;
    for (let i=0; i < this.cities.length; i++) {
      cities.push(new FormControl(0));
    }
  }

  userView() {
    this.userViewToggle = true;
    this.siteViewToggle = false;
    this.userViewStyle = "true";
    this.siteViewStyle = "false";
    // console.log(a)
  }

  siteView() {
    this.siteViewToggle = true;
    this.userViewToggle = false;
    this.siteViewStyle = "true";
    this.userViewStyle = "false";
    // console.log(a)
  }

  // private initForm() {
  //   let userName = '';
  //   let userEmail = '';
  //   let userAccessLevel = '';
  //   // let accessLEVEL = '';

  //   if (this.editMode) {
  //     const user = this.userService.getUser(this.id);
  //     const city = this.userService.getCity(this.id);
  //     userName = user.name;
  //     userEmail = user.email;
      // userAccessLevel = city.forEach((scity) => {
      //   scity.accessLevel;
      // })
      // accessLEVEL = city.map(item => item.accessLevel)
  //   }

  //   this.userForm = new FormGroup({
  //     name: new FormControl(userName, Validators.required),
  //     email: new FormControl(userEmail, Validators.required),
  //     cities: new FormArray([]),
      // permissionIndex: new FormControl(userAccessLevel, Validators.required),
      // accessLevel: new FormControl(accessLEVEL),
    // });
  // }
}
