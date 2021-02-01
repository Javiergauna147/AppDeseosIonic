import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {


  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;


  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}

  async modificarLista(lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'modificar',
          handler: (data) => {
            console.log(data);
            if( data.titulo.length === 0 ){
              return;
            }
            //modificar lista
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

  listaSeleccionada( lista: Lista ){

    console.log( lista );

    if( this.terminada ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista: Lista ){
    this.deseosService.borrarLista( lista );
  }

}
