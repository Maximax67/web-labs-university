<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $content = $_POST['content'];

    $data = [];
    $jsonFile = 'sections.json';

    if (file_exists($jsonFile)) {
        $jsonData = file_get_contents($jsonFile);
        $data = json_decode($jsonData, true);
    }

    $newSection = [
        'title' => $title,
        'content' => $content,
    ];

    $data[] = $newSection;

    file_put_contents($jsonFile, json_encode($data));
    echo json_encode($newSection);
}
?>
