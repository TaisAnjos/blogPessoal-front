import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { userLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {  }

  entrar (usuarioLogin: userLogin):Observable<userLogin> {
    return this.http.post <userLogin> ('http://localhost:8080/usuarios/logar', usuarioLogin)    
  }

  cadastrar (usuario: User):Observable<User> {
    return this.http.post <User> ('http://localhost:8080/usuarios/cadastrar', usuario)
  }

  getByIdUser (id: number):Observable<User> {
    return this.http.get<User>(`http://localhost:8080/usuarios/${id}`)
  }

  logado () {
    let ok = false;

    if (environment.token != "") {
      return true;
    }

    return ok;
  }
}
