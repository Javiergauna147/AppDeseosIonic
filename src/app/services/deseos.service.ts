import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  public listas: Lista[] = [];

  constructor() {

    const lista1 = new Lista('Recolectar al gato');
    const lista2 = new Lista('Comprar comida del gato');

    this.listas.push(lista1, lista2);

  }
}
