<?php
$jsonFile = 'sections.json';
if (file_exists($jsonFile)) {
    $jsonData = file_get_contents($jsonFile);
    echo $jsonData;
}
?>
