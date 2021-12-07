import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {

  editObject: any;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  confirmDelete(i: number) {
    this.editObject = this.userService.deleteUser(i)
  }

}
