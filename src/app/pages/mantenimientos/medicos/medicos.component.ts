import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;
  
  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService,  private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();

     this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe( img => this.cargarMedicos() );
  } 
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargarMedicos()
    .subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  buscar( termino: string ) {
    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar( 'medicos', termino )
    .subscribe( (resp :any) => {
      console.log(resp)
      this.medicos = resp;
    });
  }
  borrarMedico( medico: Medico ) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.medicoService.borrarMedico( medico._id || '' )
          .subscribe( resp => {
            
            this.cargarMedicos();
            Swal.fire(
              'Médico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })
  }
  abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img );

  }


}
