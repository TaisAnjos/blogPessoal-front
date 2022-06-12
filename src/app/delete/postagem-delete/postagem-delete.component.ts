import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == " "){
      alert ('Sua sessão expirou! Faça o login')
      this.router.navigate(['/login'])

    }
    this.idPostagem= this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem (id: number) {
    this.postagemService.getByIdPostagem(id).subscribe({
      next: (resp: Postagem) => {
        this.postagem = resp
      }
    })
  }

  apagar () {
    this.postagemService.deletePostagem(this.idPostagem).subscribe(()=>{
        alert ('Postagem apagada com sucesso!')
        this.router.navigate(['/home'])
    })
  }
}