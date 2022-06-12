import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  tema: Tema = new Tema ()
  listaTemas: Tema[]
  idTema: number

  postagem: Postagem = new Postagem()
  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == ""){
      alert ('Sua sessão expirou! Faça o login')
      this.router.navigate(['/login'])

    }
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
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

  findByIdPostagem (id: number) {
    this.postagemService.getByIdPostagem(id).subscribe({
      next: (resp: Postagem) => {
        this.postagem = resp
      }
    })
  }

  atualizar () {
    this.tema.id
    this.postagem.tema
    
    this.postagemService.putPostagem(this.postagem).subscribe({
      next: (resp: Postagem) => {
        this.postagem = resp
        alert ('Postagem atualizada com sucesso')
        this.router.navigate(['/home'])
      }
    })
  }


}
