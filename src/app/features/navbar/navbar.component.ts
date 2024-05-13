import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  propSearch: FormControl<string> = new FormControl()
  form = new FormGroup({
    search: this.propSearch
  })
  title = 'Mon App'

  ngOnInit(): void {
      this.propSearch.valueChanges
      .pipe(
          filter(str => str.length > 3 ),
          map((str) => str.toUpperCase()),
          debounceTime(500),
          distinctUntilChanged()
          // tap((str) => {
          //   console.log('-->debug', str)
          // })
      )
      .subscribe((str) => {
        console.log(str)
      })
  }

  doSearch() {
    console.log(this.form.value)
  }
}
