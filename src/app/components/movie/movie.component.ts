import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @ViewChild('imagen') imagen!: ElementRef
  @ViewChild('add') add!: ElementRef
  @ViewChild('like') like!: ElementRef

  movie: any
  liked: boolean = false

  constructor(
    public dialogRef: MatDialogRef<MovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getMovieInfo(this.data).subscribe({
      next: (res => {
        // console.log(res);
        this.movie = res
      }),
      error: (err => {
        console.error(err);
      }),
      complete: () => {
        if(this.dataService.getLikedMovies().indexOf(this.data) >= 0){
          this.liked = true
        }
      }
    })
    
  }

  likeMovie(id: number){
    if(this.dataService.addLikedMovies(id)){
      this.liked = true
      return true
    }else {
      this.liked = false
      return false
    }
  }

  close(){
    this.dialogRef.close()
  }


}
