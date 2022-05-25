const router = require('express').Router();
const oracle = require('../oracle');
const fs = require('fs');

router.post('/verificarestadologin/', (req, res, next) =>
{
    //console.lo(req.body);
    var sql = "select registro_universitario, nombre_rol, usuario.estado from usuario, rol where registro_universitario = " + req.body.user + " and clave_acceso = '" + req.body.pass + "' and rol.id_rol = usuario.id_rol"
    if(req.body.tipo == 1)
    {
        sql += " and usuario.id_rol = 1";
    }
    else if(req.body.tipo == 2)
    {
        sql += " and usuario.id_rol = 2";
    }
    else if(req.body.tipo == 3)
    {
        sql += " and usuario.id_rol = 7";
    }
    else if(req.body.tipo = 4)
    {
        sql += " and usuario.id_rol = 3";
    }
    else
    {
        sql += " and usuario.id_rol != 1 and usuario.id_rol != 2 and usuario.id_rol != 7 and usuario.id_rol != 3";
    }
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(error){
        return next(error);
    })
})

router.post('/uploadprofileimage/', (req, res, next) => {
    let buff = new Buffer.from(req.body.base64, 'base64');
    let ruta = 'cliente/src/assets/images/users/' + req.body.name;
    fs.writeFileSync(ruta, buff);
    return res.json(1);
})

router.post('/addUser/', (req, res, next) => {
    //console.lo(req.body);
    var sql = "insert into usuario(documento_identificacion, registro_universitario, nombre_usuario, foto, correo, telefono, clave_acceso, id_rol, estado, sesion) values (";
    sql += req.body.documento_personal + ",";
    sql += req.body.registro + ",";
    sql += "'" + req.body.nombre + "',";
    sql += "'" + req.body.archivo + "',";
    sql += "'" + req.body.correo + "',";
    sql += req.body.telefono + ",";
    sql += "'" + req.body.password + "',";
    sql += req.body.tipo + ",";
    sql += "1, 0)";
    //console.lo(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/asignar_c/', (req, res, next) => {
    var sql = "insert into asignar_carrera(documento_identificacion, id_carrera, id_rol, estado) values (";
    sql += req.body.documento_personal + ",";
    sql += req.body.carrera + ",";
    sql += req.body.tipo + ", 1)";
    oracle.insert(sql, {}, true, res);
})

router.post('/asignar_ci/', (req, res, next) => {
    //////////console.log(req.body);
    var sql = "insert into asignar_ciencia(documento_identificacion, id_ciencia, id_rol, estado) values(";
    sql += req.body.documento_personal +", "
    sql += req.body.ciencia + ", "
    sql += req.body.tipo + ", 1)";
    oracle.insert(sql, {}, true, res);
})

router.post('/addUserA/', (req, res, next) => {
    //console.lo(req.body);
    var sql = "insert into usuario(documento_identificacion, registro_universitario, nombre_usuario, foto, correo, telefono, clave_acceso, id_rol, estado, sesion) values (";
    sql += req.body.documento_personal + ",";
    sql += req.body.registro + ",";
    sql += "'" + req.body.nombre + "',";
    sql += "'" + req.body.archivo + "',";
    sql += "'" + req.body.correo + "',";
    sql += req.body.telefono + ",";
    sql += "'" + req.body.password + "',";
    sql += req.body.tipo + ",";
    sql += "1, 0)";
    //console.lo(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/addUserC/',(req, res, next)=>{
    var sql = "insert into usuario(documento_identificacion, registro_universitario, nombre_usuario, foto, correo, telefono, clave_acceso, id_rol, estado, sesion) values (";
    sql += req.body.documento_personal + ",";
    sql += req.body.registro + ",";
    sql += "'" + req.body.nombre + "',";
    sql += "'" + req.body.archivo + "',";
    sql += "'" + req.body.correo + "',";
    sql += req.body.telefono + ",";
    sql += "'" + req.body.password + "',";
    sql += req.body.tipo + ",";
    sql += "1,0)";
    oracle.insert(sql, {}, true,res);
})

router.post('/eliminarU/:reg/:rol', (req, res, next) => {
    const sql = "update usuario set estado = 0 where registro_universitario = " + req.params.reg + " and id_rol = " + req.params.rol;
    oracle.insert(sql, {}, true, res);
})

router.post('/updateUsuario/:reg/:rol', (req, res, next) => {
    //console.lo(req.body);
    var sql = "update usuario set ";
    sql += "nombre_usuario = '" + req.body.nombre + "', ";
    sql += "clave_acceso = '" + req.body.pass + "', ";
    sql += "correo = '" + req.body.correo + "', ";
    sql += "telefono = " + req.body.telefono + ", ";
    sql += "foto = '" + req.body.archivo + "' ";
    sql += "where registro_universitario = " + req.params.reg + " and id_rol = " + req.params.rol;
    //console.lo(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/insertFa', (req, res, next) => {
    //console.lo(req.body);
    var sql = "insert into facultad(nombre_facultad, descripcion, estado) values ('" + req.body.nombre_facultad + "', '" + req.body.descripcion + "',1)";
    oracle.insert(sql, {}, true, res);
})

router.post('/updateFacultad/:id', (req, res, next) => {
    //console.lo("update", req.body, req.params.id);
    var sql = "update facultad set ";
    sql += "nombre_facultad = '" + req.body.nombre_facultad + "', ";
    sql += "descripcion = '" + req.body.descripcion + "' ";
    sql += "where id_facultad = " + req.params.id;
    oracle.insert(sql, {}, true, res);
})

router.post('/deleteFacultad/:id', (req, res, next) => {
    const sql = "update facultad set estado = 0 where id_facultad = " + req.params.id;
    oracle.insert(sql, {}, true, res);
})

router.post('/insertarCarrera/', (req, res, next) => {
    //console.lo(req.body);
    var sql = "insert into carrera(nombre_carrera, descripcion, id_facultad, estado) values (";
    sql += "'" + req.body.nombre_carrera + "',";
    sql += "'" + req.body.descripcion + "', ";
    sql += req.body.id_facultad + ", 1)"
    oracle.insert(sql, {}, true, res);
})

router.post('/updateCarrera/:idfa/:idcar',(req, res, next)=>{
    var sql = "update carrera set nombre_carrera = '" + req.body.nombre_carrera + "', descripcion = '" + req.body.descripcion + "' where id_facultad = " + req.params.idfa + " and id_carrera = " + req.params.idcar
    oracle.insert(sql, {}, true, res);
})

router.post('/deleteCarrera/:idfa/:idcar', (req, res, next)=>{
    var sql = "update carrera set estado = 0 where id_facultad = " + req.params.idfa + " and id_carrera = " + req.params.idcar;
    oracle.insert(sql, {}, true, res);
})

router.get('/getFacultades/', (req, res, next) => {
    const sql = "select id_facultad, nombre_facultad from FACULTAD where estado = 1";
    oracle.queryObject(sql, {}, {}).then(
    function(result){
        //console.lo(sql);
        //console.lo(result.rows);
        return res.json(result.rows);
    }).catch(function(err){
        return next(err);
    });
})

router.get('/getCarreras/', (req, res, next) => {
    const sql = "select id_carrera, nombre_carrera from carrera where estado = 1";
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getRoles/', (req, res, next) => {
    const sql = "select id_rol, nombre_rol from rol where estado = 1";
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getCarrera/:id', (req, res, next) => 
{
    //console.lo(req.params.id);
    const sql = "select id_carrera, nombre_carrera from carrera where id_facultad = " + req.params.id + " and estado = 1";
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            //console.lo(result);
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getVerificacionsepuedeinsertar/:id/:reg', (req, res, next) =>{
    const sql = "select nombre_usuario, nombre_rol, usuario.estado from usuario, rol where usuario.id_rol = rol.id_rol and usuario.registro_universitario = " + req.params.reg + " and usuario.id_rol = " + req.params.id;
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getRegistrosU/', (req, res, next) => {
    const sql = "select distinct registro_universitario from usuario where registro_universitario != 0000 and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getRoles/:reg', (req, res, next) => {
    const sql = "select rol.id_rol, rol.nombre_rol from usuario, rol where usuario.id_rol = rol.id_rol and usuario.estado = 1 and usuario.registro_universitario = " + req.params.reg
    //console.log(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getUsuario/:reg/:rol', (req, res, next) => {
    const sql = "select documento_identificacion, registro_universitario, nombre_usuario, foto, correo, telefono, clave_acceso from usuario where registro_universitario = " + req.params.reg + " and id_rol = " + req.params.rol;
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getDocumentosI/:reg/:rol', (req, res, next) => {
    const sql = "select documento_identificacion from usuario where registro_universitario = " + req.params.reg + " and id_rol = " + req.params.rol;
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getCarreraM/:reg/:rol', (req, res, next) => {
    var sql = "select carrera.id_carrera, carrera.nombre_carrera, carrera.id_facultad from carrera, asignar_carrera where carrera.id_carrera = asignar_carrera.id_carrera and asignar_carrera.documento_identificacion = " + req.params.reg + " and asignar_carrera.id_rol = " + req.params.rol + " and asignar_carrera.estado = 1";
    console.log(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getFacultad/:id', (req, res, next) => {
    var sql = "select id_facultad, nombre_facultad from facultad where id_facultad=" + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getRol/:id', (req, res, next)=>{
    var sql = "select nombre_rol from rol where id_rol = " + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getFacultadN/:nombre',(req, res, next) => {
    var sql = "select id_facultad, nombre_facultad from facultad where nombre_facultad = '" + req.params.nombre + "'";
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getFacultadD/:id', (req, res, next) => {
    var sql = "select nombre_facultad, descripcion from facultad where id_facultad = " + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/sepuedeinsertarcarrera/:id/:nombre', (req, res, next) => {
    var sql = "select nombre_carrera, id_facultad, descripcion from carrera where id_facultad = " + req.params.id + " and nombre_carrera = '" + req.params.nombre + "'";
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getCarreraMF/:fac/:car', (req, res, next)=>{
    var sql = "select nombre_carrera, descripcion from carrera where id_facultad = " + req.params.fac + " and id_carrera = " + req.params.car;
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getAsignaciones/:id/:rol', (req, res, next)=>
{
    var sql = "select id_asignar_carrera from asignar_carrera where documento_identificacion = " + req.params.id + " and id_rol=" + req.params.rol + " and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getAsignacionesCi/:doc/:rol', (req, res, next)=>{
    var sql = "select id_asignar_ciencia from asignar_ciencia where documento_identificacion = " + req.params.doc + " and id_rol= " + req.params.rol + " and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/getAsignacionesFacultad/', (req, res, next)=>{
    var sql = "select id_asignar_carrera from asignar_carrera where documento_identificacion = " + req.body.documento_personal + " and id_rol = " + req.body.tipo + " and id_carrera = " + req.body.carrera + " and estado = 1"
    ////////////console.log(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/getAsignacionesCiencia/', (req, res, next) => {
    var sql = "select id_asignar_ciencia from asignar_ciencia where documento_identificacion = " + req.body.documento_personal + " and id_rol = " + req.body.tipo + " and id_ciencia = " + req.body.ciencia + " and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/crearAsignacionciencia/', (req, res, next)=>{
    var sql = "insert into asignar_ciencia(documento_identificacion, id_ciencia, id_rol, estado) values("
    sql += req.body.documento_personal + ", "
    sql += req.body.ciencia + ", "
    sql += req.body.tipo + ", 1)"
    oracle.insert(sql, {}, true, res);
})

router.get('/getcienciasm/:id/:doc', (req, res, next)=>{
    var sql = "select ciencia.id_ciencia, ciencia.nombre_ciencia from ciencia, asignar_ciencia, asignar_ciencia_carrera where ciencia.id_ciencia=asignar_ciencia.id_ciencia "
    sql += "and asignar_ciencia.id_ciencia = asignar_ciencia_carrera.id_ciencia "
    sql += "and asignar_ciencia_carrera.id_carrera = " + req.params.id + " "
    sql += "and asignar_ciencia.documento_identificacion = " + req.params.doc + " "
    sql += "and asignar_ciencia.id_carrera = " + req.params.id + " "
    sql += "and asignar_ciencia.estado = 1 "
    sql += "and asignar_ciencia_carrera.estado = 1"
    sql += "and ciencia.estado = 1"
    ////////////console.log(sql);
    oracle.queryObject(sql, {},{}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/deleteasignarci/:doc/:rol/:id_ci', (req, res, next) => {
    var sql = "update asignar_ciencia set estado = 0 where documento_identificacion = " + req.params.doc + " and id_rol = " + req.params.rol + " and id_ciencia = " + req.params.id_ci;
    oracle.insert(sql, {}, true, res);
})

router.post('/updateasignarc/:doc/:rol/:car', (req, res, next) => {
    var sql = "update asignar_carrera set estado = 0 where documento_identificacion = " + req.params.doc + " and id_rol = " + req.params.rol + " and id_carrera = " + req.params.car
    oracle.insert(sql, {}, true, res);
})

router.post('/deletetodaasignacion/:id', (req, res, next) => {
    var sql = "update asignar_carrera set estado = 0 where id_carrera = " + req.params.id
    console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/deleteasigcienciacar/:id',(req, res, next) => {
    var sql = "update asignar_ciencia_carrera set estado = 0 where id_carrera = " + req.params.id
    console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/createrelacion/:idci/:idcar', (req, res, next)=>{
    var sql = "insert into asignar_ciencia_carrera(id_ciencia, id_carrera, estado) values(" + req.params.idci + "," + req.params.idcar + ",1)"
    oracle.insert(sql, {}, true, res);
})

router.post('/createciencia/', (req, res, next) => {
    ////console.lo(req.body)
    var sql = "insert into ciencia(nombre_ciencia,descripcion_ciencia,estado) values(";
    sql += "'" + req.body.nombre_ciencia + "',"
    sql += "'" + req.body.descripcion_ciencia + "', 1)"
    oracle.insert(sql, {}, true, res); 
})

router.post('/getidciencia/', (req, res, next) => {
    var sql = "select id_ciencia, nombre_ciencia from ciencia where nombre_ciencia = '" + req.body.nombre_ciencia + "' and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/verificarasignacionciencia/:idci/:idca', (req, res, next) => {
    var sql = "select id_ciencia, id_carrera from asignar_ciencia_carrera where id_ciencia = " + req.params.idci + " and id_carrera = " + req.params.idca + " and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    }) 
})

router.get('/getcienciacar/:id', (req, res, next) => {
    var sql = "select ciencia.id_ciencia, ciencia.nombre_ciencia from ciencia, asignar_ciencia_carrera where asignar_ciencia_carrera.id_carrera = " + req.params.id + " and asignar_ciencia_carrera.estado = 1 and asignar_ciencia_carrera.id_ciencia = ciencia.id_ciencia"
    ////console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getdatosciencia/:id_cie', (req, res, next) => {
    var sql = "select nombre_ciencia, descripcion_ciencia from ciencia where id_ciencia = " + req.params.id_cie + " and estado = 1"
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/updateciencia/:id_ciencia', (req, res, next) => {
    ////console.lo(req.body);
    var sql = "update ciencia set nombre_ciencia = '" + req.body.nombre_ciencia + "', descripcion_ciencia = '" + req.body.descripcion_ciencia + "' where id_ciencia = " + req.params.id_ciencia
    oracle.insert(sql ,{}, true, res);
})

router.post('/deleteciencia/:idc', (req, res, next) => {
    var sql = "update ciencia set estado = 0 where id_ciencia = " + req.params.idc;
    oracle.insert(sql, {}, true, res);
})

router.post('/deleteciencia_ca/:idc', (req, res, next) => {
    var sql = "update asignar_ciencia_carrera set estado = 0 where id_ciencia = " + req.params.idc;
    oracle.insert(sql, {}, true, res);
})

router.post('/deleteciencia_us/:idc', (req, res, next) => {
    var sql = "upadate asignar_ciencia set estado = 0 where id_ciencia = " + req.params.idc;
    oracle.insert(sql, {}, true, res);
})

router.get('/verificarciencia/:nombre/:idcar', (req, res, next) => {
    var sql = "select id_ciencia, nombre_ciencia from ciencia where nombre_ciencia = '" + req.params.nombre + "' and estado = 1";
    oracle.queryObject(sql , {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/verificarrol/:nombre', (req, res, next)=>{
    var sql = "select nombre_rol, descripcion from rol where nombre_rol = '" + req.params.nombre + "' and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/crearrol/', (req, res, next) => {
    //console.lo(req.body);
    var sql = "insert into rol(nombre_rol, descripcion, estado) values(";
    sql += "'" + req.body.nombre_rol + "',"
    sql += "'" + req.body.descripcion + "', 1)"
    oracle.insert(sql, {}, true, res);
})

router.get('/obtenerrolesc/', (req, res, next)=>{
    const sql = "select id_rol, nombre_rol from rol where estado = 1 and id_rol != 1 and id_rol !=2 and id_rol != 3 and id_rol != 7"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/obtenerrol/:id', (req, res, next)=>{
    const sql = "select descripcion, nombre_rol from rol where id_rol = " + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/verificarrol1/:nombre/:id', (req, res, next)=>{
    var sql = "select nombre_rol, descripcion from rol where nombre_rol = '" + req.params.nombre + "' and estado = 1 and id_rol != " + req.params.id
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/updaterol', (req, res, next)=>{
    //console.lo(req.body);
    const sql = "update rol set nombre_rol = '" + req.body.nombre_rol + "', descripcion = '" + req.body.descripcion + "' where id_rol = " + req.body.id_rol
    //console.lo(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/deleterol/:id',(req, res, next)=>{
    const sql = "update rol set estado = 0 where id_rol = " + req.params.id
    oracle.insert(sql, {}, true, res);
})

router.get('/getDatosCuenta/:registro/:rol', (req, res, next)=>{
    var sql = "select usuario.documento_identificacion, usuario.registro_universitario, usuario.nombre_usuario, usuario.foto, usuario.correo, usuario.telefono, usuario.clave_acceso ";
    sql += "from usuario, rol ";
    sql += "where usuario.estado = 1 ";
    sql += "and usuario.id_rol = rol.id_rol ";
    sql += "and usuario.registro_universitario = " + req.params.registro + " ";
    sql += "and rol.nombre_rol = '" + req.params.rol + "'";
    oracle.queryObject(sql, {},{}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getId_rol/:nombre', (req, res, next)=>{
    var sql = "select id_rol from rol where nombre_rol = '" + req.params.nombre + "'"
    oracle.queryObject(sql, {},{}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/activarcuenta/:reg/:rol', (req, res, next) => {
    var sql = "update usuario "
    sql += "set sesion = 1 "
    sql += "where registro_universitario = " + req.params.reg
    sql += " and id_rol = (select rol.id_rol from rol where rol.nombre_rol = '" + req.params.rol + "')"
    //console.lo(sql);
    oracle.insert(sql, {}, true, res); 
})

router.get('/getusuariosactivos/:registro', (req, res, next) => {
    var sql = "select registro_universitario, foto, nombre_usuario,documento_identificacion, id_rol from usuario where sesion = 1 and estado = 1 and registro_universitario != " + req.params.registro
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows)
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/cerrarcuentaactiva/:registro/:rol', (req, res, next)=>{
    var sql = "update usuario "
    sql += "set sesion = 0 "
    sql += "where registro_universitario = " + req.params.registro
    sql += " and id_rol = (select rol.id_rol from rol where rol.nombre_rol = '" + req.params.rol + "')"
    //console.lo(sql);
    oracle.insert(sql, {}, true, res);
})

router.get('/getConversaciones/:reg1/:rol1/:reg2/:rol2', (req, res, next) =>{
    var sql = "select documento_identificacion_1, documento_identificacion_2, id_rol1, id_rol2 from conversacion where ";
    sql += "(documento_identificacion_1 = '" + req.params.reg1 + "' or documento_identificacion_2 = '" + req.params.reg1 + "') and "
    sql += "(documento_identificacion_2 = '" + req.params.reg2 + "' or documento_identificacion_1 = '" + req.params.reg2 + "') and "
    sql += "(id_rol1 = " + req.params.rol1 + " or id_rol2 = " + req.params.rol2 + ") and ";
    sql += "(id_rol2 = " + req.params.rol2 + " or id_rol1 = " + req.params.rol1 + ") and estado = 1"
    //////////console.log(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/createConversacion/', (req, res, next) => {
    //console.lo(req.body);
    var sql = "insert into conversacion(documento_identificacion_1, documento_identificacion_2, id_rol1, id_rol2, estado) values ("
    sql += "'" + req.body.registro1 + "', "
    sql += "'" + req.body.registro2 + "', "
    sql += req.body.rol1 + ", "
    sql += req.body.rol2 + ", 1)"
    oracle.insert(sql, {}, true, res);
})

router.get('/getConversacionId/:reg1/:rol1/:reg2/:rol2', (req, res, next) => {
    var sql = "select id_conversacion from conversacion where (documento_identificacion_1 = " + req.params.reg1 + " or documento_identificacion_2 = " + req.params.reg1 + ") and (documento_identificacion_2 = " + req.params.reg2 + " or documento_identificacion_1 = " + req.params.reg2 + ") and (id_rol1 = " + req.params.rol1 + " or id_rol2=" + req.params.rol1 + ") and (id_rol2 = " + req.params.rol2 + " or id_rol1=" + req.params.rol2 + ") and estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    }) 
})

router.get('/getMensajes/:id', (req, res, next)=>{
    var sql = "select mensaje.contenido_mensaje, mensaje.documento_identificacion, mensaje.contenido_mensaje from mensaje, detalle_conversacion where mensaje.id_mensaje = detalle_conversacion.id_mensaje and detalle_conversacion.id_conversacion = " + req.params.id
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/insertarMensaje/:idconver', (req, res, next)=>{
    //console.lo(req.body);
    var sql = "insert into mensaje(contenido_mensaje, documento_identificacion, id_rol)values("
    sql += "'" + req.body.mensaje + "', ";
    sql += req.body.usuario + ", ";
    sql += req.body.rol + ")"
    oracle.insert(sql, {}, true, res);
})

router.get('/getidultimomensaje/', (req, res, next)=>{
    var sql = "select id_mensaje from(select * from mensaje order by id_mensaje desc) where ROWNUM = 1"
    //console.lo(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/creardetallecon/:idmsg/:idc', (req, res, next)=>{
    var sql = "insert into detalle_conversacion(id_conversacion, id_mensaje) values (" + req.params.idc + ", " + req.params.idmsg + ")";
    oracle.insert(sql, {}, true, res);
})

router.get('/gettodaslasciencias/', (req, res, next) => {
    var sql = "select id_ciencia, nombre_ciencia from ciencia where estado = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getdatociencia/:id', (req, res, next) => {
    var sql = "select id_ciencia, nombre_ciencia from ciencia where id_ciencia = " + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getCarreraC/:id', (req, res, next) => {
    var sql = "select carrera.id_carrera, carrera.nombre_carrera from carrera, asignar_ciencia_carrera "
    sql += "where carrera.id_carrera = asignar_ciencia_carrera.id_carrera "
    sql += "and asignar_ciencia_carrera.id_ciencia = " + req.params.id + " "
    sql += "and asignar_ciencia_carrera.estado = 1"
    console.log(sql)
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getdatocarrrera/:id', (req, res, next) => {
    var sql = "select id_carrera, nombre_carrera from carrera where id_carrera = " + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getdatofacultad/:id', (req, res, next)=>{
    var sql = "select id_facultad, nombre_facultad from facultad where id_facultad = " + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getidtema/', (req, res, next) => {
    var sql = "select id_tema from (select * from tema order by id_tema desc) where rownum = 1"
    console.log(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/creartema/', (req, res, next) => {
    console.log(req.body);
    var sql = "insert into tema(nombre_tema, descripcion, documento_identificacion, id_rol, estado, fecha_creacion, num_respuestas)values("
    sql += "'" + req.body.nombre_tema + "',"
    sql += "'" + req.body.descripcion_tema + "',"
    sql += req.body.documento_identi + ","
    sql += req.body.rolusuario + ","
    sql += "1,"
    sql += "(select current_date from dual),0)"
    //console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/createrelationtemaciencia/:idt/:idc', (req, res, next)=>{
    //console.log("relacion ", req.params.idt," -> ", req.params.idc)
    var sql = "insert into asignar_ciencia_tema(id_tema, id_ciencia)values(" + req.params.idt + "," + req.params.idc + ")"
    //console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/createrelationtemacarrera/:idt/:idc', (req, res, next) => {
    var sql = "insert into asignar_carrera_tema(id_tema, id_carrera)values(" + req.params.idt + "," + req.params.idc + ")"
    //console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/createrelationtemafacultad/:idt/:idf', (req, res, next) => {
    var sql = "insert into asignar_facultad_tema(id_tema, id_facultad)values(" + req.params.idt + "," + req.params.idf + ")"
    //console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/subirimagenestema/:id_t', (req, res, next) => {
    //console.log(req.body);
    let buff = new Buffer.from(req.body.base64, 'base64');
    let ruta = 'cliente/src/assets/images/temas/' + req.params.id_t + "_" + req.body.name
    fs.writeFileSync(ruta, buff);
    return res.json(1);
})

router.post('/subirimagenalabd/:id_te/:nombreimagen', (req, res, next) => {
    var sql = "insert into galeria_tema(foto_tema, id_tema)values("
    sql += "'images/temas/" + req.params.id_te + "_" + req.params.nombreimagen + "',"
    sql += req.params.id_te + ")"
    //console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.get('/gettemasactivosmostrar/', (req, res, next) => {
    var sql = "select usuario.nombre_usuario, usuario.foto, tema.nombre_tema, tema.id_tema from usuario, tema where usuario.documento_identificacion = tema.documento_identificacion and usuario.id_rol = tema.id_rol and (tema.estado = 1 or tema.estado = 0)"
    console.log(sql);
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/gettemasactivosadmin/', (req, res, next)=>{
    var sql = "select usuario.nombre_usuario, usuario.foto, tema.nombre_tema, tema.id_tema from usuario, tema where usuario.documento_identificacion = tema.documento_identificacion and usuario.id_rol = tema.id_rol"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/gettemaid/:id', (req, res, next) => {
    var sql = "select usuario.nombre_usuario, usuario.foto, tema.nombre_tema, tema.id_tema, tema.descripcion from usuario, tema where usuario.documento_identificacion = tema.documento_identificacion and usuario.id_rol = tema.id_rol and tema.id_tema = " + req.params.id
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getfotostemaid/:id', (req, res, next) => {
    var sql = "select foto_tema from galeria_tema where id_tema = " + req.params.id;
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getrespuestasdeltema/:id', (req, res, next) => {
    var sql = "select usuario.nombre_usuario, respuesta_tem.contenido_respuesta, usuario.foto, respuesta_tem.id_respuesta from usuario, respuesta_tem where usuario.documento_identificacion = respuesta_tem.documento_identificacion and usuario.id_rol = respuesta_tem.id_rol and respuesta_tem.id_tema=" + req.params.id
    console.log('respuestas', sql);
    oracle.queryObject(sql, {},{}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get("/getverificartema/:id/:idrol", (req, res, next) => {
    var sql = "select nombre_tema, descripcion, documento_identificacion, id_rol from tema where id_tema = " + req.params.id
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get("/getestadotema/:id", (req, res, next) => {
    var sql = "select estado from tema where id_tema=" + req.params.id
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/responder/', (req, res, next) =>{
    //console.log(req.body);
    var sql = "insert into respuesta_tem(id_tema,documento_identificacion,id_rol,contenido_respuesta)values("
    sql += req.body.id_tema + ","
    sql += req.body.documento_identificacion + ","
    sql += req.body.id_rol + ","
    sql += "'" + req.body.contenido + "')"
    //console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.get('/getidres/', (req, res, next) => {
    let sql = "select id_respuesta from (select * from respuesta_tem order by id_respuesta desc) where rownum = 1"
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/subirimagenresalabd/:idr/:imagen', (req, res, next) => {
    let sql = "insert into galeria_respuesta(foto_respuesta,id_respuesta)values("
    sql += "'images/respuestas/" + req.params.idr + "_" + req.params.imagen + "',"
    sql += req.params.idr + ")"
    console.log(sql);
    oracle.insert(sql, {}, true, res);
})

router.post('/subirimagenresp/:idr',(req, res, next) => {
    let buff = new Buffer.from(req.body.base64, 'base64');
    let ruta = 'cliente/src/assets/images/respuestas/' + req.params.idr + "_" + req.body.name
    fs.writeFileSync(ruta, buff);
    return res.json(1);
})

router.get('/getimagenres/:idr', (req, res, next) => {
    let sql = "select galeria_respuesta.foto_respuesta from galeria_respuesta where id_respuesta = " + req.params.idr
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/cerrartema/:idt', (req, res, next) => {
    let fecha = new Date
    console.log(fecha.get);
    let mes = fecha.getMonth() + 1;
    let sql = "update tema set estado = 0, fecha_cierre = to_date('" + fecha.getDate() + "/" + mes + "/" + fecha.getFullYear() + "', 'dd/mm/yyyy') where id_tema = " + req.params.idt
    oracle.insert(sql, {}, true, res);
})

router.get('/obtenernombretem/:idt', (req, res, next) => {
    var sql = "select nombre_tema from tema where id_tema=" + req.params.idt;
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.post('/clausurartema/', (req, res, next) => {
    console.log(req.body);
    var sql = "insert into historial_clausura(documento_identificacion,id_tema,descripcion_historial,id_rol)values("
    sql += req.body.documento + ","
    sql += req.body.id_tema + ","
    sql += "'" + req.body.descripcion + "',"
    sql += req.body.idrol + ")"
    oracle.insert(sql, {}, true, res);
})

router.post('/clausurarestadotema/:idt', (req, res, next) => {
    let fecha = new Date();
    let mes = fecha.getMonth() + 1
    var sql = "update tema set estado = 2, fecha_cierre = to_date('" + fecha.getDate() + "/" + mes + "/" + fecha.getFullYear() + "', 'dd/mm/yyyy') where id_tema = " + req.params.idt
    oracle.insert(sql, {}, true, res);
})

router.post('/actualizarrespuestas/:idt', (req, res, next) => {
    var sql = "update tema set num_respuestas = num_respuestas + 1 where id_tema = " + req.params.idt
    oracle.insert(sql, {}, true, res);
})

router.get('/obteneridcatres/:idt', (req, res, next) => {
    var sql = "select distinct documento_identificacion from respuesta_tem where id_rol = 3"
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getnombreidtemas/', (req, res, next)=>{
    var sql = "select id_tema, nombre_tema from tema"
    oracle.queryObject(sql, {}, {}).then(
        function(result)
        {
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/obteneridestres/:idt', (req, res, next) => {
    var sql = "select distinct documento_identificacion from respuesta_tem where id_rol = 2"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})

router.get('/getrespuestastotal/:idt', (req, res, next)=>{
    let sql = "select usuario.foto, usuario.nombre_usuario, total from(select documento_identificacion, id_rol, Count(*) as total from respuesta_tem where id_rol = " + req.params.idt + " group by documento_identificacion, id_rol order by total desc) nueva , usuario where rownum < 4 and usuario.documento_identificacion = nueva.documento_identificacion and usuario.id_rol = nueva.id_rol"
    oracle.queryObject(sql, {}, {}).then(
        function(result){
            return res.json(result.rows);
        }
    ).catch(function(err){
        return next(err);
    })
})
module.exports = router;