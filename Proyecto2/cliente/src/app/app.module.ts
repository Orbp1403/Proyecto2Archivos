import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccesdeniedComponent } from './components/accesdenied/accesdenied.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { CrearfacultadComponent } from './components/crearfacultad/crearfacultad.component';
import { CrearusuarioComponent } from './components/crearusuario/crearusuario.component';
import { ModificarusuarioComponent } from './components/modificarusuario/modificarusuario.component';
import { MostrarusuarioComponent } from './components/mostrarusuario/mostrarusuario.component';
import { EliminarusuarioComponent } from './components/eliminarusuario/eliminarusuario.component';
import { ModificarfacultadComponent } from './components/modificarfacultad/modificarfacultad.component';
import { MostrarfacultadComponent } from './components/mostrarfacultad/mostrarfacultad.component';
import { EliminarfacultadComponent } from './components/eliminarfacultad/eliminarfacultad.component';
import { CrearcarreraComponent } from './components/crearcarrera/crearcarrera.component';
import { ModificarcarreraComponent } from './components/modificarcarrera/modificarcarrera.component';
import { MostrarcarreraComponent } from './components/mostrarcarrera/mostrarcarrera.component';
import { EliminarcarreraComponent } from './components/eliminarcarrera/eliminarcarrera.component';
import { CrearcienciaComponent } from './components/crearciencia/crearciencia.component';
import { ModificarcienciaComponent } from './components/modificarciencia/modificarciencia.component';
import { MostrarcienciaComponent } from './components/mostrarciencia/mostrarciencia.component';
import { EliminarcienciaComponent } from './components/eliminarciencia/eliminarciencia.component';
import { CrearrolComponent } from './components/crearrol/crearrol.component';
import { ModificarrolComponent } from './components/modificarrol/modificarrol.component';
import { MostrarrolComponent } from './components/mostrarrol/mostrarrol.component';
import { EliminarrolComponent } from './components/eliminarrol/eliminarrol.component';
import { HttpClient } from 'selenium-webdriver/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { PieComponent } from './components/pie/pie.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { EditarcuentaComponent } from './components/editarcuenta/editarcuenta.component';
import { BarraconectadosComponent } from './components/barraconectados/barraconectados.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { NuevotemaComponent } from './components/nuevotema/nuevotema.component';
import { MostrartemaComponent } from './components/mostrartema/mostrartema.component';
import { MostrarrespuestaComponent } from './components/mostrarrespuesta/mostrarrespuesta.component';
import { CrearrespuestaComponent } from './components/crearrespuesta/crearrespuesta.component';
import { ClausurartemaComponent } from './components/clausurartema/clausurartema.component';
import { ReportesComponent } from './components/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    AccesdeniedComponent,
    PaginaPrincipalComponent,
    EncabezadoComponent,
    CrearfacultadComponent,
    CrearusuarioComponent,
    ModificarusuarioComponent,
    MostrarusuarioComponent,
    EliminarusuarioComponent,
    ModificarfacultadComponent,
    MostrarfacultadComponent,
    EliminarfacultadComponent,
    CrearcarreraComponent,
    ModificarcarreraComponent,
    MostrarcarreraComponent,
    EliminarcarreraComponent,
    CrearcienciaComponent,
    ModificarcienciaComponent,
    MostrarcienciaComponent,
    EliminarcienciaComponent,
    CrearrolComponent,
    ModificarrolComponent,
    MostrarrolComponent,
    EliminarrolComponent,
    InicioComponent,
    PieComponent,
    CuentaComponent,
    EditarcuentaComponent,
    BarraconectadosComponent,
    MensajesComponent,
    NuevotemaComponent,
    MostrartemaComponent,
    MostrarrespuestaComponent,
    CrearrespuestaComponent,
    ClausurartemaComponent,
    ReportesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'inicio', component: InicioComponent},
      {path: '', component: PaginaPrincipalComponent},
      {path: 'crear_usuario', component: CrearusuarioComponent},
      {path: 'modificar_usuario', component: ModificarusuarioComponent},
      {path: 'mostrar_usuario', component: MostrarusuarioComponent},
      {path: 'eliminar_usuario', component: EliminarusuarioComponent},
      {path: 'crear_facultad', component: CrearfacultadComponent},
      {path: 'modificar_facultad', component: ModificarfacultadComponent},
      {path: 'mostrar_facultad', component: MostrarfacultadComponent},
      {path: 'eliminar_facultad', component: EliminarfacultadComponent},
      {path: 'crear_carrera', component: CrearcarreraComponent},
      {path: 'modificar_carrera', component: ModificarcarreraComponent},
      {path: 'mostrar_carrera', component: MostrarcarreraComponent},
      {path: 'eliminar_carrera', component: EliminarcarreraComponent},
      {path: 'crear_ciencia', component: CrearcienciaComponent},
      {path: 'modificar_ciencia', component: ModificarcienciaComponent},
      {path: 'mostrar_ciencia', component: MostrarcienciaComponent},
      {path: 'eliminar_ciencia', component: EliminarcienciaComponent},
      {path: 'crear_rol', component: CrearrolComponent},
      {path: 'modificar_rol', component: ModificarrolComponent},
      {path: 'mostrar_rol', component: MostrarrolComponent},
      {path: 'eliminar_rol', component: EliminarrolComponent},
      {path: 'acces_denied', component: AccesdeniedComponent},
      {path: 'cuenta', component: CuentaComponent},
      {path: 'editarcuenta', component: EditarcuentaComponent},
      {path : 'mensaje', component: MensajesComponent},
      {path: 'tema', component: NuevotemaComponent},
      {path: 'mostrartema/:idtema', component: MostrartemaComponent},
      {path: 'clausurartema/:idtema', component: ClausurartemaComponent},
      {path: 'reportes/:tipo_re', component: ReportesComponent}
    ],
    {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
