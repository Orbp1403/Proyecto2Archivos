export class Login{
    user    : string;
    pass    : string;
    tipo    : number;
}

export class UserLog{
    user    : string;
    rol     : string;
    estado  : number;
}

export class Roles{
    id      : number;
    nombre_r: string;
}

export class UsuarioR{
    documento_personal  : number;
    registro            : number;
    nombre              : string;
    password            : string;
    correo              : string;
    telefono            : number;
    facultad            : number;
    carrera             : number;
    archivo             : string;
    tipo                : number;
}

export class UsuarioRAdmin{
    documento_personal  : number;
    registro            : number;
    nombre              : string;
    password            : string;
    correo              : string;
    telefono            : number;
    archivo             : string;
    tipo                : number;
}

export class UsuarioCatedratico{
    documento_personal  : number;
    registro            : number;
    nombre              : string;
    password            : string;
    correo              : string;
    telefono            : number;
    facultad            : number;
    carrera             : number;
    ciencia             : number;
    archivo             : string;
    tipo                : number;
}

export class UsuarioActualizar{
    nombre      : string;
    pass        : string;
    correo      : string;
    telefono    : number;
    archivo     : string;
}

export class ArchivoImagen{
    name    : string;
    base64  : string;
}

export class Registros_Uni{
    registro    : number;
}

export class RoleN{
    nombre_rol  : string;
    descripcion : string;
}

export class RolG{
    id_rol      : number;
    nombre_rol  : string;
    descripcion : string;
}

export class UsuarioActivo{
    registro_universitario  : number;
    foto                    : string;
    nombre_usuario          : string;
    id_rol                  : string;
    documento               : string;
}

export class Conversacion{
    registro1   : string;
    registro2   : string;
    rol1        : string;
    rol2        : string;
}

export class Mensaje{
    usuario : string;
    mensaje : string;
    rol     : string;
}