import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post <userLogin> ('https://localhost:8080/usuarios/logar', usuarioLogin)    
  }

  cadastrar (usuario: User):Observable<User> {
    return this.http.post <User> ('htttp://localhost:8080/usuarios/cadastrar', usuario)
  }
}
