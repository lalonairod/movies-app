import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private horrorMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key='+environment.api_key+'&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=27'
  private animationMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key='+environment.api_key+'&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=16'
  private mysteryMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key='+environment.api_key+'&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=9648'

  private movieInfo: string = 'https://api.themoviedb.org/3/movie/{{id}}?api_key='+environment.api_key+'&language=es-MX'

  constructor(public http: HttpClient) { }

  getHorrorMovies(): Observable<any>{
    return this.http.get(this.horrorMovies).pipe(
      map((res: any) => {
        let response: any[] = []
        res.results.forEach((el: any) => {
          let newRes = {
            id: el.id,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        
        return response
      })
    )
  }

  getAnimatedMovies(): Observable<any>{
    return this.http.get(this.animationMovies).pipe(
      map((res: any) => {
        let response: any[] = []
        res.results.forEach((el: any) => {
          let newRes = {
            id: el.id,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        
        return response
      })
    )
  }

  getMysteryMovies(): Observable<any>{
    return this.http.get(this.mysteryMovies).pipe(
      map((res: any) => {
        let response: any[] = []
        res.results.forEach((el: any) => {
          let newRes = {
            id: el.id,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        
        return response
      })
    )
  }

  getMovieInfo(id: number): Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX`).pipe(
      map((res: any) => {
        let newRes = {
          poster: res.poster_path,
          genres: res.genres,
          date: res.release_date,
          title: res.title,
          overview: res.overview,
          background: res.backdrop_path
        }
        return newRes
      })
    )
  }

  getLikedMovies(): number[]{
    if(localStorage.getItem('likedMovies')){
      return JSON.parse(localStorage.getItem('likedMovies')!)
    }else return []
  }

  addLikedMovies(id: number){
    let likedMovies: any[] = this.getLikedMovies()

    if(likedMovies.indexOf(id) >= 0){
      let index = likedMovies.indexOf(id)
      likedMovies.splice(index, 1)
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
      return false

    }else {
      likedMovies.push(id)
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
      return true
    }
  }

}
