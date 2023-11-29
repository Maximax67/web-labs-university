<?php
$jsonFile = 'sections.json';
if (file_exists($jsonFile)) {
    unlink($jsonFile);
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Accordion is empty!']);
}
?>
