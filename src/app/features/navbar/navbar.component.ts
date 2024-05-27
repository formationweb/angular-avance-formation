import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private userService = inject(UserService)
  propSearch: FormControl<string> = new FormControl()
  form = new FormGroup({
    search: this.propSearch
  })
  title = 'Mon App'

  ngOnInit(): void {
      this.propSearch.valueChanges
      
      .subscribe((str) => {
        this.userService.setSearch(str)
      })
  }

  doSearch() {
    console.log(this.form.value)
  }
}
