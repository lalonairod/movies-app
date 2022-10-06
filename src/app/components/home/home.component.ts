import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieComponent } from '../movie/movie.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actionMovies: any[] = []
  comedyMovies: any[] = []
  dramaMovies: any[] = []

  constructor(public dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getHorrorMovies().subscribe({
      next: (res => {
        this.actionMovies = res
      })
    })
    
    this.dataService.getAnimatedMovies().subscribe({
      next: (res => {
        // console.log(res);
        this.comedyMovies = res
      })
    })
    
    this.dataService.getMysteryMovies().subscribe({
      next: (res => {
        // console.log(res);
        this.dramaMovies = res
      })
    })
  }

  openModal(id: number){
    const modalConfig = new MatDialogConfig()
    modalConfig.width = '80vw'
    modalConfig.height = '95vh'
    modalConfig.data = id
    modalConfig.hasBackdrop = true
    modalConfig.panelClass = 'modalBg'
    this.dialog.open(MovieComponent, modalConfig)
  }


}
