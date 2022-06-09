import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User ()
  idUser = environment.id
  tema: Tema = new Tema ()
  postagem: Postagem = new Postagem()
  listaTemas: Tema[]
  listaPostagens: Postagem[]
  idTema: number

  constructor(
    private router: Router,
    private  postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (environment.token == ""){
      alert ('Sua sessão expirou! Faça o login')
      this.router.navigate(['/login'])
    }

    this.findAllTemas()
    this.getAllPostagens()
  }

  findAllTemas () {
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  findByIdTema () {
    this.temaService.getByIdTema(this.idTema).subscribe({
      next: (resp: Tema) => {
        this.tema = resp
      }
    }
    )
  }

  getAllPostagens () {
    this.postagemService.getAllPostagens().subscribe ({
      next: (resp: Postagem[]) => {
        this.listaPostagens = resp
      }
    })
  }

  findByIdUser () {
    this.authService.getByIdUser(this.idUser).subscribe({
      next: (resp: User) => {
        this.user = resp
      }
    })
  }

  publicar () {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe({
      next: (resp: Postagem) => {
        this.postagem = resp
        alert ('Postagem realizada com sucesso!')
        this.postagem = new Postagem()
        this.getAllPostagens ()
      }
    })
  }
}
