import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;
  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService ) { }


  ngOnInit(): void {
  }
  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file: any ) : any{
    this.imagenSubir = file.target.files[0];
    if ( !file.target.files[0] ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file.target.files[0] );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }


    return true;

  }

  subirImagen() {

    const id   = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

        console.log(img)
        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  // }
  }
}
