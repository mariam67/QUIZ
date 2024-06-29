<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['score'])) {
    $score = intval($_POST['score']);
    // Example: You can save the score to a database, store it in a session, or perform any other action
    // For demonstration, let's just echo the score
    echo "Received score: " . $score;
} else {
    // Handle invalid requests or errors
    echo "Invalid request";
}
?>
