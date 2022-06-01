import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { userLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit () {
    window.scroll(0,0)

  }

  confirmaSenha (event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuarioo (event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar ( ) {
    this.user.tipo = this.tipoUsuario
    if (this.user.senha !=  this.confirmarSenha) {
      alert ('As senhas estão diferentes')
    }
    else {
      this.authService.cadastrar(this.user).subscribe((resp:User)=> {
        this.user = resp
        this.router.navigate(['login'])
        alert ('Usuario cadastrado com sucesso')
      })
    }
  }
}
