import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from 'models/shared/app-error';
import { NotFoundError } from 'models/shared/not-found';
import { BadInput } from 'models/shared/bad-input';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) {

    }


  getAllData(url){
    return this.http.get(url)
            .pipe(map(resource => resource.json()),
                  catchError(this.handleError));
  }

  sendData(url, data?) {
    return this.http.post(url, { data})
            .pipe(catchError(this.handleError));
  }

  updateData(url,data, id?) {
    return this.http.patch(url, {data, id})
            .pipe(catchError(this.handleError));
  }

  getSpecificData(url) {
    return this.http.get(url)
            .pipe(map(resource => resource.json()),
                  catchError(this.handleError));
  }

  getSpecificDataWithID(url,id) {
    return this.http.post(url, {"id": id})
            .pipe(map(resource => resource.json()),
                  catchError(this.handleError));
  }

  handleError(error: Response) {
      if(error.status === 404 ) return throwError(new NotFoundError());
      if(error.status === 400 ) return throwError(new BadInput(error.json()));
      return throwError(new AppError(error));

  }

}
