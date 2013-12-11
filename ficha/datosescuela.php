<?php
session_start();
?>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Datos del Establecimiento</title>

<link href="css/estilos.css" rel="stylesheet" type="text/css">
	
</head>
<body>

<?php
//define("PG_CONNECTION_STRING","host=192.168.57.11 user=uv0049 password=polo920usual port=5432 dbname=me");
$link=pg_connect("host=192.168.54.11 user=uv0049 password=polo920usual port=5432 dbname=me");

$frmidserv = 'frm'.$_REQUEST["idserv"];

//$link=pg_connect(PG_CONNECTION_STRING);
if(is_numeric($_REQUEST["idserv"])){
$idserv = $_REQUEST["idserv"];	
//echo $idserv;
	$query=<<<EOD
	SELECT  DISTINCT m.pidserv, m.pclave, m.cue, m.anexo, m.pnroestablecimiento, m.pnombre, m.pcalle, m.pnro, m.pcaracteristicatelefonica, 
m.ptelefono, m.pcodigopostal, m.pemail,d.regioneducativa, d.nombreregioneducativa,m.codigodistrito, d.nombredistrito, l.descripcionlocalidad AS loc, 
m.pparaje, p.sector, u.descripcionUbicacion AS ambito, c.descripcioncategoria as categoria, des.descripciondesfavorabilidad as desfavo, r.descripcion AS depend_func, 
o.descripciontipoorganizacion as tiporg
FROM unidades_educativas m join ts_distritos d on m.codigodistrito = d.codigodistrito 
join ts_localidades l on m.idlocalidad = l.idlocalidad join ts_dependencias p on m.iddependencia = p.iddependencia 
join ts_ubicaciones u on m.idubicacion = u.idubicacion join ts_tipos_organizacion o on m.idtipoorganizacion = o.idtipoorganizacion 
join ts_direcciones r on m.iddireccion = r.iddireccion  
join ts_modalidad_nivel mn on mn.idnuevamodalidad = m.idnuevamodalidad and mn.idnuevonivel = m.idnuevonivel 
join ts_desfavorabilidad des on m.iddesfavorabilidad = des.iddesfavorabilidad
join ts_categorias c on m.idcategoria = c.idcategoria
WHERE m.pidserv='{$_REQUEST["idserv"]}' and m.idperiodo= 58

	
EOD;


  	$result=pg_query($link,$query);
	$row=pg_fetch_assoc($result);
	//unset($row["the_geom"]);
	//echo json_encode($row);
	
if (pg_num_rows($result)>0) {



	//var_dump($row);
	if($row){
		foreach($row as $key=>$val){
			if(!strlen(trim($row[$key]))){
				$row[$key]="&nbsp;";
			}
		}
	}
	
	$distrito = $row['codigodistrito']; 
	$region = $row['regioneducativa']; 


	//$fecha=$row["fecha"] ? date("d/m/Y",strtotime($row["fecha"])): '';
	//$descripcion=($row["descripcion"]);
	$idserv=($row["pidserv"]);
	$cueanexo = $row["cue"].$row["anexo"];
	$direccion = $row["pcalle"].' '. 'Nro '.$row["pnro"];
	$telefono = $row["pcaracteristicatelefonica"].' '. '-'.$row["ptelefono"];	
	
	//
	$tipo_org = substr($row["pclave"],4,2);
	$numero = substr($row["pclave"],6,4);
	$distrito = substr($row["pclave"],1,3);
//
	
?>
<table style="margin:4px" width="553" border="0">
  <tr>
    <td width="547">
	<table width="547" class="tabla_datos">
  <tr>
    <td align="center" colspan = "6" class="tableFichaHeader">Datos del Establecimiento</td>
  </tr>

 <tr class="fila_impar">
    <th width="71" align="left">Clave</th>
    <td width="25" ><?= $row["pclave"]?></td>
    <th width="74" align="left">Cueanexo</th>
    <td width="117" ><? echo $cueanexo; ?> </td>
    <th width="154" align="left">Nro Establecimiento</th>
    <td width="78"><?= $row["pnroestablecimiento"] ?></td>
  </tr>
 <tr class="fila_impar">
    <th align="left">Nombre</th>
    <td colspan="5"><?= $row["pnombre"] ?></td>
  </tr>
 <tr class="fila_impar">
    <th align="left">Domicilio</th>
    <td colspan="5"><? echo $direccion; ?></td>
  </tr>
   <tr class="fila_impar">
   <th align="left">Tel&eacute;fono</th>
    <td colspan="2"><? echo $telefono; ?></td>
  <th width="117" align="left">C&oacute;digo Postal</th>
    <td colspan="2"><?= $row["pcodigopostal"] ?></td>
  </tr>
 <tr class="fila_impar">
    <th align="left">E-mail</th>
    <td colspan="5"><?= $row["pemail"] ?></td>
  </tr>
</table>
</td>
   
  </tr>
  <tr>
    <td valign="top">
	<table width="547" class="tabla_datos">

  <tr class="fila_impar">
    <th width="162" align="left" scope="row">Regi&oacute;n</th>
    <td width="173" ><?= $row["nombreregioneducativa"]?></td>
     <th width="58" align="left" scope="row">Distrito</th>
    <td width="134" ><?= $row["nombredistrito"] ?></td>
  </tr>
 <tr class="fila_impar">
    <th align="left" scope="row">Localidad</th>
    <td><?= $row["loc"] ?></td>
    <th align="left" scope="row">Paraje</th>
    <td><?= $row["paraje"] ?></td>
  </tr>
  <tr class="fila_impar">
    <th align="left" scope="row">Sector</th>
    <td><?= $row["sector"] ?></td>
	<th align="left" scope="row">&Aacute;mbito</th>
    <td><?= $row["ambito"] ?></td>
  </tr>	
 
  </table>
</td>
</tr>
  <tr>
    <td valign="top">
	<table width="547" class="tabla_datos">

  <tr class="fila_impar">
   <th align="left" scope="row">Categor&iacute;a</th>
    <td><?= $row["categoria"] ?></td>
    <th align="left" scope="row">Desfavorabilidad</th>
    <td><?= $row["desfavo"] ?></td>
  </tr>
  <tr class="fila_impar">
	<th width="200" align="left">Dependencia Funcional</th>
    <td colspan="5"><?= $row["depend_func"] ?></td>
  </tr>
   <tr class="fila_impar">	
    <th width="200" align="left">Tipo de Establecimiento</th>
	<td colspan="5"><?= $row["tiporg"] ?></td>
   </tr>
    
  <?
  $query2 = "SELECT of.nombre as oferta  ";
  $query2 .= "FROM bus.estabs es, bus.estabs_ofertas eo, bus.ofertas of ";
  $query2 .= "WHERE es.id = eo.estab_id ";
  $query2 .= "AND of.id = eo.oferta_id ";
  $query2 .= "AND es.id='{$_REQUEST['idserv']}'";
  $result = pg_query($link,$query2);
   	
   ?>
 	 <tr class="fila_impar"><th align="left">Oferta</th>
	 <td colspan="5">
  <?
  while( $row = pg_fetch_array($result) ) {
  
  	echo "$row[oferta]<br>\n";
  }

  $query4 = "select distinct tj.descripcion as jornada FROM unidades_educativas m ";
  $query4 .= "join alumnos_por_tipo_jornada j on m.pidserv = j.idserv ";
  $query4 .= "join ts_tipo_jornada tj on j.idtipojornada = tj.idtipojornada ";
  $query4 .= "WHERE m.pidserv='{$_REQUEST['idserv']}' and m.idperiodo= 55";
  $result = pg_query($link,$query4);
  $num_rows = pg_num_rows($result);
 ?>
 	 <tr class="fila_impar"><th align="left">Tipo de Jornada</th>
	 <td colspan="5">
  <?
if($num_rows <> 0){
while( $row = pg_fetch_array($result) ) {
  
  	echo "$row[jornada]<br>\n";
  }
 }
 else echo "Sin Datos";

  $query5 = "select sc.pidserv, tt.descripcionturno as turnos from unidades_educativas m ";
  $query5 .= "join secciones_matricula_turno sc on m.pidserv = sc.pidserv ";
  $query5 .= "join ts_turnos tt on sc.idturno = tt.idturno ";
  $query5 .= "WHERE m.pidserv='{$_REQUEST['idserv']}' and m.idperiodo= 55";
  $query5 .= "GROUP BY sc.pidserv, tt.descripcionturno";
  
  $result = pg_query($link,$query5);
  $num_rows = pg_num_rows($result);
 ?>
 	 <tr class="fila_impar"><th align="left">Turnos de Funcionamiento</th>
	 <td colspan="5">
  <?
if($num_rows <> 0){
while( $row = pg_fetch_array($result) ) {
  
  	echo "$row[turnos]<br>\n";
  }
 }
 else echo "Sin Datos";



  $query6 = "select distinct (a.IdServ) from aguapey a join unidades_educativas u ";
  $query6 .= "on a.IdServ = u.pidserv ";
  $query6 .= "where a.IdServ='{$_REQUEST['idserv']}' and u.idperiodo= 55";
  $result = pg_query($link,$query6);
  $num_rows = pg_num_rows($result);
 ?>
 	 <tr class="fila_impar"><th align="left">Cuenta con Soft. Aguapey </th>
	 <td colspan="5">
  <?
if($num_rows <> 0){
while( $row = pg_fetch_array($result) ) {
  
  	echo "Si<br>\n";
  }
 }
 else echo "No";
?>

<?
	
  $query_sae = "select descripcionserviciocomplementa|| ' (Matricula: '|| matricula||')' as sae from servicio s join ts_tipos_servicio ts ";
  $query_sae .= "on s.idserviciocomplementario = ts.idserviciocomplementario ";
  $query_sae .= "where pidServ='{$_REQUEST['idserv']}' and s.idserviciocomplementario IN (1,11,12,13,14) ";
  $result = pg_query($link,$query_sae);
  $num_rows = pg_num_rows($result);

 ?>
 	 <tr class="fila_impar"><th align="left">S.A.E.</th>
	 <td colspan="5">
  <?
if($num_rows <> 0){
while( $row = pg_fetch_array($result) ) {
  
  	echo "$row[sae]<br>\n";
  }
 }
 else echo "No posee";

  $query_sae = "select descripcionserviciocomplementa as eoe from servicio_eoe s join ts_tipos_servicio ts ";
  $query_sae .= "on s.idserviciocomplementario = ts.idserviciocomplementario ";
  $query_sae .= "where idServ='{$_REQUEST['idserv']}' ";
  $result = pg_query($link,$query_sae);
  $num_rows = pg_num_rows($result);

 ?>
 	 <tr class="fila_impar"><th align="left">Equipo de Orientaci&oacute;n</th>
	 <td colspan="5">
  <?
if($num_rows <> 0){
while( $row = pg_fetch_array($result) ) {
  
  	echo "$row[eoe]<br>\n";
  }
 }
 else echo "No posee";
?>
</td>
</tr>
<?php
 
$query_ori_tec = "SELECT ALUMNOS.PidServ, TS_MODALIDADES.idOfertaEducativa, TS_MODALIDADES.descripcionModalidad as mod, ";
$query_ori_tec .= "TS_TERMINALIDADES.descripcionTerminalidadTitulo ";
$query_ori_tec .= "FROM ALUMNOS INNER JOIN TS_MODALIDADES ON ALUMNOS.idModalidad = TS_MODALIDADES.idModalidad AND ";           $query_ori_tec .= "ALUMNOS.idOfertaEducativa = TS_MODALIDADES.idOfertaEducativa INNER JOIN ";
$query_ori_tec .= "TS_TERMINALIDADES ON ALUMNOS.idModalidad = TS_TERMINALIDADES.idModalidad "; 
$query_ori_tec .= "AND ALUMNOS.idTerminalidadTitulo =  TS_TERMINALIDADES.idTerminalidadTitulo "; 
$query_ori_tec .= "AND ALUMNOS.idOfertaEducativa = TS_TERMINALIDADES.idOfertaEducativa "; 
$query_ori_tec .= "AND TS_MODALIDADES.idModalidad = TS_TERMINALIDADES.idModalidad ";
$query_ori_tec .= "AND TS_MODALIDADES.idOfertaEducativa = TS_TERMINALIDADES.idOfertaEducativa ";
$query_ori_tec .= "WHERE PidServ='{$_REQUEST['idserv']}' AND (ALUMNOS.idPeriodo = 55) ";
$query_ori_tec .= "AND ((TS_MODALIDADES.idOfertaEducativa = 72) OR "; 
$query_ori_tec .= "(TS_MODALIDADES.idOfertaEducativa = 73) OR (TS_MODALIDADES.idOfertaEducativa = 74) OR ";
$query_ori_tec .= "(TS_MODALIDADES.idOfertaEducativa = 77) OR (TS_MODALIDADES.idOfertaEducativa = 79)) ";
$query_ori_tec .= "GROUP BY ALUMNOS.PidServ, TS_MODALIDADES.idOfertaEducativa, ";  
$query_ori_tec .= "TS_MODALIDADES.descripcionModalidad, ";
$query_ori_tec .= "TS_TERMINALIDADES.descripcionTerminalidadTitulo ";

//echo $query_ori_tec;
 $result = pg_query($link,$query_ori_tec);
 $num_rows = pg_num_rows($result);

if($num_rows <> 0){
 ?>
 
<tr class="fila_impar"><th align="left">Orientaciones</th>
 <td colspan="5" border = "2">
<?  

  while ($row=pg_fetch_array($result)) {
echo " ' ";
?>
<?= $row["mod"]?>
<?
echo " ' ";
echo " || ";
  }
 
} 
 

	?>
</td>
</tr>


</td>
</tr>


</table>
</td>

<?

$id = trim($_REQUEST['idserv']);

$query3 = "SELECT indicador,valor FROM indicadores, ";
$query3 .= "(select distinct indicador as indi,max(idperiodo) as maxperiodo ";
$query3 .= "FROM indicadores group by indi )as maxresu ";
$query3 .= "WHERE ((indicador = '6.1') or (indicador = '7.3')) ";
$query3 .= "and idPeriodo = 55 and maxresu.indi = indicadores.indicador ";
$query3 .= "and oferta = 456  and dominio = 'C' and cod_dominio= '$id' ";
// echo '<tr> query3 : '.$query3 .'</tr>';
$result = pg_query($link,$query3);
?>
 
</tr>
  <tr>
    <td valign="top">
	<table width="547" class="tabla_datos">
<?
  while ($row=pg_fetch_assoc($result)) {;
	if ($row['indicador'] == '7.3'){ 
	 
	  $seccionReal = $row['valor'];
      $seccionEntero = (int) $seccionReal; 
    ?>
   <tr class="fila_impar">
    <th width="80" align="left">Secciones:</th>
	<td><? echo $seccionEntero; ?></td>
	</tr>
	<? }
	?>
    <? if ($row['indicador'] == '6.1'){ 
	  $matReal = $row['valor'];
      $matEntero = (int) $matReal;
   ?>
    <tr class="fila_impar">
    <th width="80" align="left">Matr&iacute;cula:</th>
	<td><? echo $matEntero; ?></td>
	<? }
	?>
  </tr>
   <? }
   ?>

<tr class="fila_impar">
    <th width="80" align="left">P.O.F.:</th>
	
<form method="post" action="http://abc.gov.ar/escuelas/consultas/establecimiento/plantafuncform.cfm" name="<?echo $frmidserv ?>" id="<?echo $frmidserv ?>" target="_blank">
<INPUT type=hidden name="tipo_org" value=<?echo $tipo_org ?>>
<INPUT type=hidden name="numero" value=<?echo $numero ?>>
<INPUT type=hidden name="distrito" value=<?echo $distrito ?>>
<input name="dependencia" type="hidden" value="0">
<td width="90" valign="top"ALIGN="left" border = "0"><FONT FACE="arial" SIZE="1" color="#ffffff"><a href="javascript: distri.submitform('<?echo $frmidserv ?>')"> Docentes - POF </a></FONT></td>
</form>
</tr>

</table>


<?
    if(isset($_SESSION['usuario']) && isset($_SESSION['password'])){

$user = $_SESSION['usuario'];

$login = "SELECT nivel, perfil, valor FROM usuarios WHERE usuario='$user'";
$result_login = pg_query($link,$login);

if($row = pg_fetch_array($result_login))
{

if ( (($row['perfil'] == 'I') && ($row['valor'] == $idserv))  || (($row['perfil'] == 'D') && ($row['valor'] ==  $distrito))
	|| (($row['perfil'] == 'R') && ($row['valor'] ==  $region)) || (($row['perfil'] == 'C') && ($row['valor'] ==  '1')) )

{

$query7 = "SELECT indicador, t.descripcionoferta as oferta,valor FROM indicadores JOIN ts_cod_ofertas t on indicadores.oferta = t.oferta , ";
$query7 .= "(select distinct indicador as indi,max(idperiodo) as maxperiodo ";
$query7 .= "FROM indicadores group by indi )as maxresu ";
$query7 .= "WHERE ((indicador = '3.1') or (indicador = '3.6')or (indicador = '3.8')or (indicador = '3.15')) ";
$query7 .= "and maxresu.maxperiodo = indicadores.idperiodo and maxresu.indi = indicadores.indicador ";
$query7 .= "and subind = 'T' and dominio = 'C' and cod_dominio= '$id' ";
$result = pg_query($link,$query7);
?>
<div>
	<table width="547" class="tabla_datos">Indicadores
<?
  while ($row=pg_fetch_assoc($result)) {;
	if ($row['indicador'] == '3.1'){ 
	 
	  $seccionReal = $row['valor'];
     ?>
   <tr class="fila_impar">
    <th width="300" align="left">Tasa de Repitencia:<? echo $row['oferta']; ?></th>
	<td><? echo $seccionReal; ?>&nbsp;%</td>
	</tr>
	<? }
	?>
    <? if ($row['indicador'] == '3.6'){ 
	  $matReal = $row['valor'];
     
   ?>
    <tr class="fila_impar">
    <th width="300" align="left">Tasa de Promoci&oacute;n Efectiva:<? echo $row['oferta']; ?></th>
	<td><? echo $matReal; ?>&nbsp;%</td>
	<? }
	?>
  </tr>
   <? if ($row['indicador'] == '3.8'){ 
	  $matReal = $row['valor'];
     
   ?>
    <tr class="fila_impar">
    <th width="350" align="left">Tasa de Abandono inter-anual:<? echo $row['oferta']; ?></th>
	<td><? echo $matReal; ?>&nbsp;%</td>
	<? }
	?>
    </tr>
   <? if ($row['indicador'] == '3.15'){ 
	  $matReal = $row['valor'];
     
   ?>
    <tr class="fila_impar">
    <th width="100" align="left">Tasa de Reinscriptos:<br><? echo $row['oferta']; ?></th>
	<td><? echo $matReal; ?>&nbsp;%</td>
	<? }
	?>
  </tr>
   <? }// while
   ?>

</table>

 <? 
   } // nivel
 else{ 
	
//echo 'No tieno acceso a esta informaci&oacute;n';	
}
   } // pg_fetch_array
 ?>
<?
} // isset usuario y pass
  
$sqori = "select t.descripcionperiodo as periodo from ts_periodos t join
(select  max(i.idperiodo) as maxperiodo from indicadores i ) as maxper
on t.idperiodo = maxper.maxperiodo";
	
	 $resultper = pg_query($link,$sqori);
      while ($row=pg_fetch_assoc($resultper)) {
?>
    <p class='padding'>DGCyE, Direcci&oacute;n Pcial. de Planeamiento, Direcci&oacute;n de Informaci&oacute;n y Estad&iacute;stica. Relevamiento <?= $row["periodo"] ?>.</p>
<?

}
?>
 <div align='right'><a target = '_blank'  href='../../cgi-bin/htmldoc/mapaescolar/datos/datosescuela.php?idserv= <?php echo $_REQUEST["idserv"];?>' onMouseOut='distri.MM_swapImgRestore()' onMouseOver="distri.MM_swapImage('Image1','','../silk/on_imprimir.gif',1)"><img src='../silk/off_imprimir.gif' name='Image1' width='106' height='22' border='0' ></a></div></td>
 <?
}else {			   

$query_jef="SELECT  DISTINCT m.idserv, m.pclave as pclave, m.cue, m.anexo, m.nroestablecimiento, m.pnombre as pnombre, m.calle, m.nro, m.caracteristicatelefonica, m.nrotelefono, m.codigopostal, m.email, m.email1, m.email2, m.codigodistrito, d.nombreregioneducativa, d.nombredistrito,m.observaciones
FROM m_establecimientos_activo m join ts_distritos d on m.codigodistrito = d.codigodistrito 
WHERE m.idserv='{$_REQUEST["idserv"]}'";
	


	 $result_jef = pg_query($link,$query_jef);

if (pg_num_rows($result_jef)>0) {

      while ($row=pg_fetch_assoc($result_jef)) {

$direccion_jef = $row["calle"].' '. 'Nro '.$row["nro"];
$telefono_jef = $row["caracteristicatelefonica"].' '. '-'.$row["nrotelefono"];

?>
<table style="margin:4px" width="553" border="0">
  <tr>
    <td width="547">
	<table width="547" class="tabla_datos">
  <tr>
    <td align="center" colspan = "6" class="tableFichaHeader">Datos de Jefaturas</td>
  </tr>

 <tr>
    <th width="71" align="left">Clave</th>
    <td width="25" ><?= $row["pclave"]?></td>
</tr>
<tr>
    <th width="74" align="left">Nº Establecimiento</th>
    <td width="117" ><?= $row["nroestablecimiento"]?> </td>
</tr>
<tr>
    <th width="154" align="left">Nombre</th>
    <td width="78"><?= $row["pnombre"] ?></td>
</tr>
<tr>
	 <th width="154" align="left">Direcci&oacute;n</th>
    <td width="78"><? echo $direccion_jef; ?></td>
</tr>
<tr>
	 <th width="154" align="left">Tel&eacute;fono</th>
    <td width="78"><? echo $telefono_jef; ?></td>
</tr>
<tr>
	 <th width="154" align="left">Email</th>
    <td width="78"><?= $row["email"]?> <?= $row["email1"] ?> </td>
</tr>
<tr>
	 <th width="154" align="left">Regi&oacute;n</th>
    <td width="78"><?= $row["nombreregioneducativa"] ?></td>
</tr>
<tr>
	 <th width="154" align="left">Distrito</th>
    <td width="78"><?= $row["nombredistrito"] ?></td>
</tr>
</tr>
<tr>

</tr>
</table>
<!--<div align='right'><a target = '_blank'  href='../../cgi-bin/htmldoc/mapaescolar/datos/datosescuela.php?idserv= <?php echo $_REQUEST["idserv"];?>' onMouseOut='distri.MM_swapImgRestore()' onMouseOver="distri.MM_swapImage('Image1','','../silk/on_imprimir.gif',1)"><img src='../silk/off_imprimir.gif' name='Image1' width='106' height='22' border='0' ></a></div>-->
<?
}
} // else result_jef
} // else num_rows result


} // if numeric

?>

 </table> 

</body>
</html>
