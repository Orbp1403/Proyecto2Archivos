CREATE TABLE ROL(
    id_rol INT,
    nombre_rol VARCHAR2(100),
    estado INT,
    descripcion VARCHAR2(1000),
    PRIMARY KEY (id_rol)
);

CREATE SEQUENCE Srol
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_Rol
BEFORE INSERT ON ROL
FOR EACH ROW
BEGIN
SELECT Srol.NEXTVAL INTO :NEW.id_rol FROM dual;
END;

CREATE TABLE USUARIO(
    documento_identificacion INT,
    registro_universitario INT,
    nombre_usuario VARCHAR2(100),
    foto VARCHAR2(1000),
    correo VARCHAR2(1000),
    telefono INT,
    clave_acceso VARCHAR(20),
    id_rol INT NOT NULL,
    estado INT,
    sesion INT,
    CONSTRAINT PK_USUARIO
    PRIMARY KEY(documento_identificacion, id_rol),
    CONSTRAINT FK_TIPO
    FOREIGN KEY(id_rol)
    REFERENCES ROL(id_rol)
);

CREATE TABLE FACULTAD(
    id_facultad INT,
    nombre_facultad VARCHAR2(100),
    descripcion VARCHAR2(200),
    estado INT,
    PRIMARY KEY(id_facultad)
);

CREATE SEQUENCE Sfacultad
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_facultad
BEFORE INSERT ON FACULTAD
FOR EACH ROW
BEGIN
SELECT Sfacultad.NEXTVAL INTO :NEW.id_facultad FROM dual;
END;

CREATE TABLE CARRERA(
    id_carrera INT,
    nombre_carrera VARCHAR2(100),
    descripcion VARCHAR2(200),
    id_facultad INT,
    estado INT,
    CONSTRAINT PKCARRERA
    PRIMARY KEY(id_carrera),
    CONSTRAINT FK_FACULTAD_C
    FOREIGN KEY(id_facultad)
    REFERENCES FACULTAD(id_facultad)
);

CREATE SEQUENCE Scarrera
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_carrera
BEFORE INSERT ON CARRERA
FOR EACH ROW
BEGIN 
SELECT Scarrera.NEXTVAL INTO :NEW.id_carrera FROM dual;
END;

CREATE TABLE CIENCIA(
    id_ciencia INT,
    nombre_ciencia VARCHAR2(100),
    descripcion_ciencia VARCHAR(200),
    id_carrera INT,
    estado INT,
    CONSTRAINT PK_CIENCIA
    PRIMARY KEY(id_ciencia),
    CONSTRAINT FK_CIENCIA_CAR
    FOREIGN KEY(id_carrera)
    REFERENCES CARRERA(id_carrera)
);

CREATE SEQUENCE Sciencia
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_ciencia
BEFORE INSERT ON CIENCIA
FOR EACH ROW
BEGIN 
SELECT Sciencia.NEXTVAL INTO :NEW.id_ciencia FROM dual;
END;

CREATE TABLE ASIGNAR_CIENCIA_CARRERA(
    id_asignar_ci_ca INT,
    id_ciencia INT,
    id_carrera INT,
    estado INT,
    PRIMARY KEY(id_asignar_ci_ca),
    FOREIGN KEY(id_ciencia)
    REFERENCES CIENCIA(id_ciencia),
    FOREIGN KEY(id_carrera)
    REFERENCES CARRERA(id_carrera)
);

CREATE SEQUENCE Sasignar_ci_ca
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asigncarcica
BEFORE INSERT ON ASIGNAR_CIENCIA_CARRERA
FOR EACH ROW
BEGIN
SELECT Sasignar_ci_ca.NEXTVAL INTO :NEW.id_asignar_ci_ca FROM DUAL;
END;

CREATE TABLE ASIGNAR_CARRERA(
    id_asignar_carrera INT,
    documento_identificacion INT,
    id_carrera INT,
    id_rol INT,
    estado INT,
    CONSTRAINT PK_ASIGNARC
    PRIMARY KEY(id_asignar_carrera),
    CONSTRAINT FK_ASIGNARC_US
    FOREIGN KEY(documento_identificacion,id_rol)
    REFERENCES USUARIO(documento_identificacion, id_rol),
    CONSTRAINT FK_ASIGNARC_C
    FOREIGN KEY(id_carrera)
    REFERENCES CARRERA(id_carrera)
);

CREATE SEQUENCE Sasignarcar
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asignarcar
BEFORE INSERT ON ASIGNAR_CARRERA
FOR EACH ROW
BEGIN
SELECT Sasignarcar.NEXTVAL INTO :NEW.id_asignar_carrera FROM dual;
END;

CREATE TABLE ASIGNAR_CIENCIA(
    id_asignar_ciencia INT,
    documento_identificacion INT,
    id_ciencia INT,
    id_rol INT,
    estado INT,
    id_carrera INT,  
    CONSTRAINT PK_ASIGNARCI
    PRIMARY KEY(id_asignar_ciencia),
    CONSTRAINT FK_ASIGNARCI_US
    FOREIGN KEY(documento_identificacion, id_rol)
    REFERENCES USUARIO(documento_identificacion, id_rol),
    CONSTRAINT FK_ASIGNARCI_CI
    FOREIGN KEY(id_ciencia)
    REFERENCES CIENCIA(id_ciencia),
    FOREIGN KEY(id_carrera)
    REFERENCES CARRERA(id_carrera)
);

CREATE SEQUENCE Sasginarci
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asignarci
BEFORE INSERT ON ASIGNAR_CIENCIA
FOR EACH ROW
BEGIN 
SELECT Sasginarci.NEXTVAL INTO :NEW.id_asignar_ciencia FROM dual;
END;

CREATE TABLE TEMA(
    id_tema INT,
    nombre_tema VARCHAR2(200),
    descripcion VARCHAR2(4000),
    documento_identificacion INT,
    id_rol INT,
    estado INT,
    fecha_creacion DATE,
    fecha_cierre DATE,
    num_respuestas INT,
    CONSTRAINT PK_TEMA
    PRIMARY KEY(id_tema),
    CONSTRAINT FK_TEMA_U
    FOREIGN KEY(documento_identificacion, id_rol)
    REFERENCES USUARIO(documento_identificacion, id_rol)
);

CREATE SEQUENCE Stema
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_tema
BEFORE INSERT ON TEMA
FOR EACH ROW
BEGIN
SELECT Stema.NEXTVAL INTO :NEW.id_tema FROM dual;
END;

CREATE TABLE ASIGNAR_CIENCIA_TEMA(
    id_asignar_ci_te INT,
    id_tema INT,
    id_ciencia INT,
    PRIMARY KEY(id_asignar_ci_te),
    CONSTRAINT FK_dettem_tem
    FOREIGN KEY(id_ciencia)
    REFERENCES CIENCIA(id_ciencia),
    CONSTRAINT FK_asig_ci_te
    FOREIGN KEY(id_tema)
    REFERENCES TEMA(id_tema)
)

CREATE SEQUENCE Sasignar_ci_te
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asig_ci_te
BEFORE INSERT ON ASIGNAR_CIENCIA_TEMA
FOR EACH ROW
BEGIN
SELECT Sasignar_ci_te.NEXTVAL INTO :NEW.id_asignar_ci_te FROM dual;
END;

CREATE TABLE ASIGNAR_CARRERA_TEMA(
    id_asignar_ca_te INT,
    id_tema INT,
    id_carrera INT,
    PRIMARY KEY(id_asignar_ca_te),
    CONSTRAINT FK_asig_ca_te
    FOREIGN KEY(id_tema)
    REFERENCES TEMA(id_tema),
    CONSTRAINT FK_asig_ca_ca
    FOREIGN KEY(id_carrera)
    REFERENCES CARRERA(id_carrera)
);

CREATE SEQUENCE Sasignar_ca_te
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asig_ca_te
BEFORE INSERT ON ASIGNAR_CARRERA_TEMA
FOR EACH ROW
BEGIN
SELECT Sasignar_ca_te.NEXTVAL INTO :NEW.id_asignar_ca_te FROM dual;
END;

CREATE TABLE ASIGNAR_FACULTAD_TEMA(
    id_asignar_fa_te INT,
    id_tema INT,
    id_facultad INT,
    PRIMARY KEY(id_asignar_fa_te),
    CONSTRAINT FK_asig_fa_te
    FOREIGN KEY(id_tema)
    REFERENCES TEMA(id_tema),
    CONSTRAINT FK_asig_fa_fa
    FOREIGN KEY(id_facultad)
    REFERENCES FACULTAD(id_facultad)
);

CREATE SEQUENCE Sasignar_fa_te
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asig_fa_te
BEFORE INSERT ON ASIGNAR_FACULTAD_TEMA
FOR EACH ROW
BEGIN 
SELECT Sasignar_fa_te.NEXTVAL INTO :NEW.id_asignar_fa_te FROM DUAL;
END;

CREATE TABLE HISTORIAL_CLAUSURA(
    id_historial INT,
    documento_identificacion INT,
    id_tema INT,
    descripcion_historial VARCHAR2(4000),
    id_rol INT,
    CONSTRAINT PK_HISTORIALC
    PRIMARY KEY(id_historial),
    CONSTRAINT FK_HISTORIALU
    FOREIGN KEY(documento_identificacion, id_rol)
    REFERENCES USUARIO(documento_identificacion, id_rol),
    CONSTRAINT FK_HISTORIALT
    FOREIGN KEY(id_tema)
    REFERENCES TEMA(id_tema)
);

CREATE SEQUENCE Shistorialc
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_historialc
BEFORE INSERT ON HISTORIAL_CLAUSURA
FOR EACH ROW
BEGIN
SELECT Shistorialc.NEXTVAL INTO :NEW.id_historial FROM dual;
END;

CREATE TABLE GALERIA_TEMA(
    id_galeria INT,
    foto_tema VARCHAR2(1000),
    id_tema INT,
    CONSTRAINT PK_GALERIA_T
    PRIMARY KEY(id_galeria),
    CONSTRAINT FK_GALERIA_TE
    FOREIGN KEY(id_tema)
    REFERENCES TEMA(id_tema)
);

CREATE SEQUENCE SGaleriat
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_galeriat
BEFORE INSERT ON GALERIA_TEMA
FOR EACH ROW
BEGIN 
SELECT SGaleriat.NEXTVAL INTO :NEW.id_galeria FROM dual;
END;

CREATE TABLE RESPUESTA_TEM(
    id_respuesta INT,
    id_tema INT,
    documento_identificacion INT,
    id_rol INT,
    contenido_respuesta VARCHAR(2000),
    CONSTRAINT PK_RESPUESTA
    PRIMARY KEY(id_respuesta),
    CONSTRAINT FK_RESPUESTA
    FOREIGN KEY(id_tema)
    REFERENCES TEMA(id_tema),
    constraint fk_respuesta_doc
    FOREIGN KEY(documento_identificacion, id_rol)
    REFERENCES USUARIO(documento_identificacion, id_rol)
);

CREATE SEQUENCE Srespuesta_tema
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_respuesta_tema
BEFORE INSERT ON RESPUESTA_TEM
FOR EACH ROW
BEGIN
SELECT Srespuesta_tema.NEXTVAL INTO :NEW.id_respuesta FROM dual;
END;

CREATE TABLE GALERIA_RESPUESTA(
    id_galeriarespuesta INT,
    foto_respuesta VARCHAR2(1000),
    id_respuesta INT,
    CONSTRAINT PK_GALERIARES
    PRIMARY KEY(id_galeriarespuesta),
    CONSTRAINT FK_GALERIARES
    FOREIGN KEY(id_respuesta)
    REFERENCES RESPUESTA_TEM(id_respuesta)
);

CREATE SEQUENCE Sgaleriares
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_galeriares
BEFORE INSERT ON GALERIA_RESPUESTA
FOR EACH ROW
BEGIN 
SELECT Sgaleriares.NEXTVAL INTO :NEW.id_galeriarespuesta FROM dual;
END;

CREATE TABLE CONVERSACION(
    id_conversacion INT,
    documento_identificacion_1 INT,
    documento_identificacion_2 INT,
    id_rol1 INT,
    id_rol2 INT,
    estado INT,
    CONSTRAINT PK_CONVERSACION
    PRIMARY KEY(id_conversacion),
    CONSTRAINT FK_CONVERSACION_U1
    FOREIGN KEY(documento_identificacion_1, id_rol1)
    REFERENCES USUARIO(documento_identificacion, id_rol),
    CONSTRAINT FK_CONVERSACION_U2
    FOREIGN KEY(documento_identificacion_2, id_rol2)
    REFERENCES USUARIO(documento_identificacion, id_rol)
);


CREATE SEQUENCE Sconversacion
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_conversacion
BEFORE INSERT ON CONVERSACION
FOR EACH ROW
BEGIN
SELECT Sconversacion.NEXTVAL INTO :NEW.id_conversacion from dual;
END;

CREATE TABLE MENSAJE(
    id_mensaje INT,
    contenido_mensaje VARCHAR2(1000),
    documento_identificacion INT,
    id_rol INT,
    CONSTRAINT PK_MENSAJE
    PRIMARY KEY(id_mensaje),
    CONSTRAINT FK_MENSAJE_D
    FOREIGN KEY(documento_identificacion, id_rol)
    REFERENCES USUARIO(documento_identificacion, id_rol)
);

CREATE SEQUENCE Smensaje
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_mensaje
BEFORE INSERT ON MENSAJE
FOR EACH ROW
BEGIN
SELECT Smensaje.NEXTVAL INTO :NEW.id_mensaje from dual;
END;

CREATE TABLE DETALLE_CONVERSACION(
    id_detalleconversacion INT,
    id_conversacion INT,
    id_mensaje INT,
    CONSTRAINT PK_DETALLEC
    PRIMARY KEY(id_detalleconversacion),
    CONSTRAINT FK_DETALLEC_C
    FOREIGN KEY(id_conversacion)
    REFERENCES CONVERSACION(id_conversacion),
    CONSTRAINT FK_DETALLE_M
    FOREIGN KEY(id_mensaje)
    REFERENCES MENSAJE(id_mensaje)
);

CREATE SEQUENCE Sdetalle_c
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_detallec
BEFORE INSERT ON DETALLE_CONVERSACION
FOR EACH ROW
BEGIN
SELECT Sdetalle_c.NEXTVAL INTO :NEW.id_detalleconversacion from dual;
END;

CREATE TABLE EXAMEN(
    id_examen INT,
    nombre_examen VARCHAR2(100),
    estado INT,
    documento_identificacion INT,
    id_rol INT,
    CONSTRAINT PK_EXAMEN
    PRIMARY KEY(id_examen),
    CONSTRAINT FK_EXAMEN_U
    FOREIGN KEY(documento_identificacion, id_rol)
    REFERENCES USUARIO(documento_identificacion, id_rol)
);

CREATE SEQUENCE Sexamen
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_examen
BEFORE INSERT ON EXAMEN
FOR EACH ROW
BEGIN
SELECT Sexamen.NEXTVAL INTO :NEW.id_examen FROM dual;
END;

CREATE TABLE ASIGNAR_P_E(
    id_asignarpe INT,
    id_examen INT,
    CONSTRAINT PK_ASIGNARPE
    PRIMARY KEY(id_asignarpe),
    CONSTRAINT FK_ASIGNARPEU
    FOREIGN KEY(id_examen)
    REFERENCES EXAMEN(id_examen)
);

CREATE SEQUENCE Sasignarpe
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asignarpe
BEFORE INSERT ON ASIGNAR_P_E
FOR EACH ROW
BEGIN 
SELECT Sasignarpe.NEXTVAL INTO :NEW.id_asignarpe FROM dual;
END;

CREATE TABLE PREGUNTA(
    id_pregunta INT,
    valor_pregunta VARCHAR2(1000),
    CONSTRAINT PK_PREGUNTA
    PRIMARY KEY(id_pregunta)
);

CREATE SEQUENCE Spregunta
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_pregunta
BEFORE INSERT ON PREGUNTA
FOR EACH ROW
BEGIN
SELECT Spregunta.NEXTVAL INTO :NEW.id_pregunta FROM dual;
END;

CREATE TABLE DETALLE_P_E(
    id_detallepe INT,
    id_asignarpe INT,
    id_pregunta INT,
    CONSTRAINT PK_DETALLEPE
    PRIMARY KEY(id_detallepe),
    CONSTRAINT FK_ASIGNARPE
    FOREIGN KEY(id_asignarpe)
    REFERENCES ASIGNAR_P_E(id_asignarpe),
    CONSTRAINT FK_ASIGNARPRE
    FOREIGN KEY(id_pregunta)
    REFERENCES PREGUNTA(id_pregunta)
);

CREATE SEQUENCE Sdetallepe
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_detallepe
BEFORE INSERT ON DETALLE_P_E
FOR EACH ROW
BEGIN
SELECT Sdetallepe.NEXTVAL INTO :NEW.id_detallepe FROM dual;
END;

CREATE TABLE ASIGNAR_R_P(
    id_asignarrp INT,
    id_pregunta INT,
    CONSTRAINT PK_ASIGNARRP
    PRIMARY KEY(id_asignarrp),
    CONSTRAINT FK_ASIGNARRP_P
    FOREIGN KEY(id_pregunta)
    REFERENCES PREGUNTA(id_pregunta)
);

CREATE SEQUENCE Sasignarrp
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_asignarrp
BEFORE INSERT ON ASIGNAR_R_P
FOR EACH ROW
BEGIN SELECT Sasignarrp.NEXTVAL INTO :NEW.id_asignarrp FROM dual;
END;

CREATE TABLE RESPUESTA(
    id_respuesta INT,
    valor_respuesta VARCHAR2(1000),
    correcta INT,
    CONSTRAINT PK_RESPUESTA_E
    PRIMARY KEY(id_respuesta)
);

CREATE SEQUENCE Srespuesta
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_respuesta
BEFORE INSERT ON RESPUESTA
FOR EACH ROW
BEGIN SELECT Srespuesta.NEXTVAL INTO :NEW.id_respuesta FROM dual;
END;

CREATE TABLE DETALLE_R_P(
    id_detallerp INT,
    id_asignarrp INT,
    id_respuesta INT,
    CONSTRAINT PK_DETALLERP
    PRIMARY KEY(id_detallerp),
    CONSTRAINT FK_DETALLERP_AS
    FOREIGN KEY(id_asignarrp)
    REFERENCES ASIGNAR_R_P(id_asignarrp),
    CONSTRAINT FK_DETALLERP_R
    FOREIGN KEY(id_respuesta)
    REFERENCES RESPUESTA(id_respuesta)
);

CREATE SEQUENCE Sdetallerp
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_detallerp
BEFORE INSERT ON DETALLE_R_P
FOR EACH ROW
BEGIN SELECT Sdetallerp.NEXTVAL INTO :NEW.id_detallerp FROM dual;
END;