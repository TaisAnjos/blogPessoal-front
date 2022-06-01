import { User } from "./User";

export class Postagem{
    public id: number;
    public titulo: string;
    public texto: string;
    public date: Date;
    public tema: string;
    public usuario: User; 
}