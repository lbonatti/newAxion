<?php
if(isset($_POST['callVersion'])){
	// Read the file contents into a string variable,
	// and parse the string into a data structure
	$str_data = file_get_contents("version.json");
	$data = json_decode($str_data,true);

	echo $data["version"];
}
if(isset($_POST['callUpdateEESS']) == true){
	$data = '';

	$str_data = file_get_contents("estaciones_servicio.json");
	$data = $str_data;

//	$str_data = file_get_contents("version.json");
//	$version = json_decode($str_data,true);
//	$data['version'] = $version["version"];

	echo $data;
}