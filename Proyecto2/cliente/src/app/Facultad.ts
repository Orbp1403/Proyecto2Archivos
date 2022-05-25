export class infoFacultad{
    id_facultad     : number;
    nombre_fac      : string;
}

export class infoCarrera{
    id_carrera      : number;
    nombre_carrera  : string;
}

export class infoCarreraT{
    id_carrera      : number;
    nombre_carrera  : string;
    id_facultad     : number;
}

export class Facultad_G{
    nombre_facultad : string;
    descripcion     : string;
}

export class Carrera_G{
    nombre_carrera  : string;
    descripcion     : string;
}

export class Carrera_N{
    nombre_carrera  : string;
    id_facultad     : number;
    descripcion     : string;
}

export class Ciencia_N{
    nombre_ciencia      : string;
    descripcion_ciencia : string;
    id_carrera          : number;
}

export class infoCiencia{
    id_ciencia  : number;
    nombre_ciencia  : string;
}

export class infoasignarcienciacarrera{
    id_ciencia : number
    id_carrera : number
}