INSERT INTO ROL(nombre_rol) VALUES ('administrador');
INSERT INTO ROL(nombre_rol) VALUES('estudiante');
INSERT INTO ROL(nombre_rol) VALUES ('catedratico');
INSERT INTO ROL(nombre_rol) VALUES ('conserje');
INSERT INTO ROL(nombre_rol) VALUES ('miembro junta');
INSERT INTO ROL(nombre_rol) VALUES ('secretaria');
INSERT INTO ROL(nombre_rol) VALUES ('auxiliar');
INSERT INTO USUARIO(documento_identificacion, registro_universitario, nombre_usuario, correo, clave_acceso, id_rol, estado) VALUES (1234, 0000, 'administrador', 'oscarol14394@gmail.com', '1234', 1, 1);
INSERT INTO facultad(nombre_facultad,descripcion) VALUES('Ingenieria', 'Carrera1');
INSERT INTO carrera(nombre_carrera,descripcion,id_facultad) VALUES ('Ingenieria en sistemas', 'carrera1 ingeniera', 1);
INSERT INTO facultad(nombre_facultad, descripcion) VALUES('Veterinaria', 'Carrera2');
INSERT INTO carrera(nombre_carrera, descripcion,id_facultad) VALUES ('Medicina veterinaria', 'carrera1 veterinaria', 2);
INSERT INTO carrera(nombre_carrera,descripcion,id_facultad) VALUES ('Ingenieria mecanica', 'carrera2 ingenieria', 1);
commit;
select distinct registro_universitario from usuario where registro_universitario != 0000;
select rol.id_rol, rol.nombre_rol from usuario, rol where usuario.id_rol = rol.id_rol and usuario.registro_universitario = 3656596;
select * from usuario;
select * from asignar_carrera;
select nombre_usuario from usuario, asignar_carrera where usuario.documento_identificacion = asignar_carrera.documento_identificacion and usuario.id_rol = asignar_carrera.id_rol;
select foto from usuario where nombre_usuario = 'Oscar';

INSERT INTO asignar_ciencia_carrera(id_ciencia,id_carrera,estado)VALUES(1, 1, 1);
INSERT INTO asignar_ciencia_carrera(id_ciencia,id_carrera,estado)VALUES(2, 1, 1);
INSERT INTO asignar_ciencia_carrera(id_ciencia,id_carrera,estado)VALUES(3, 3, 0);
INSERT INTO asignar_ciencia_carrera(id_ciencia,id_carrera,estado)VALUES(4, 3, 0);
alter table ciencia
drop column id_carrera;
commit;
update usuario
set estado = 1, sesion = 0
where documento_identificacion = 12345;
select * from asignar_ciencia_carrera;
select ciencia.id_ciencia, ciencia.nombre_ciencia from ciencia, asignar_ciencia where ciencia.id_ciencia = asignar_ciencia.id_ciencia and asignar_ciencia.id_ciencia = 1 and asignar_ciencia.id_ciencia = 4 and asignar_ciencia.documento_identificacion = 66363 and id_rol = 3;
select * from ciencia;
SELECT
    *
FROM usuario;
SELECT * FROM galeria_respuesta;
select * from respuesta_tem;
select ciencia.id_ciencia, ciencia.nombre_ciencia
from ciencia, asignar_ciencia, asignar_ciencia_carrera
where ciencia.id_ciencia = asignar_ciencia.id_ciencia = asignar_ciencia_carrera.id_ciencia
and asignar_ciencia.documento_identificacion = 66363
and asignar_ciencia.estado = 1
select * from rol;
commit
select distinct documento_identificacion from respuesta_tem where id_rol = 2
select * from respuesta_tem;
select * from rol;
/**** consultas */
select usuario.foto, usuario.nombre_usuario, total 
from
(select documento_identificacion, id_rol, Count(*) as total from respuesta_tem where id_rol = 2 group by documento_identificacion, id_rol order by total desc) nueva , usuario 
where rownum < 4 
and usuario.documento_identificacion = nueva.documento_identificacion 
and usuario.id_rol = nueva.id_rol;
