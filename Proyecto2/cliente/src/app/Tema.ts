export class Tema{
    nombre_tema         : string
    descripcion_tema    : string
    documento_identi    : string
    rolusuario          : string
}

export class Temaobtenido{
    nombre_tema     : string
    nombre_usuario  : string
    foto_usuario    : string
    id_tema         : string
}

export class Temaobtenido1{
    nombre_tema         : string
    nombre_usuario      : string
    foto_usuario        : string
    id_tema             : string
    descripcion_tema    : string
}

export class FotoTema{
    fotos_tema  : string
}

export class Respuesta{
    id_respuesta            : string
    foto_usuario            : string
    nombre_usuario          : string
    descripcion_respuesta   : string
    imagenes_respuesta      : FotoTema[]
}

export class Respuestaenviada{
    id_tema                     : string
    documento_identificacion    : string
    id_rol                      : string
    contenido                   : string
}

export class nombretema{
    nombre_tema : string
}

export class cluasurartema{
    id_tema     : string
    descripcion : string
    documento   : string
    idrol       : string
}

export class idcatedraticosrespuesta{
    id_catedratico : string
}

export class tematraido{
    id_tema : string
    nombretema : string
}

export class respuestaporid{
    foto        : string
    nombre_usu  : string
    total       : string
}