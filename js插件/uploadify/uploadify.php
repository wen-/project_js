<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

// Define a destination
$targetFolder = '/uploads'; // Relative to the root

//$verifyToken = md5('unique_salt' . $_POST['timestamp']);

//if (!empty($_FILES) && $_POST['token'] == $verifyToken) {
if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
	$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
	
	// Validate the file type
	$fileTypes = array('jpg','jpeg','gif','png'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		move_uploaded_file($tempFile,$targetFile);
		//echo '1';
        $img = getimagesize($targetFile);
        $fruits = array (
            "result_code"  => "1",
            "result_des" => $_SERVER["SERVER_NAME"].$targetFolder."/".$fileParts["basename"],
            "result_w"   => $img[0],
            "result_h"   => $img[1]
        );
        echo json_encode($fruits);
	} else {
		echo 'Invalid file type.';
	}
}
?>