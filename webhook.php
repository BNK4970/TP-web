<?php
$secret = 'abysse'; // Secret pour sécuriser le webhook
$payload = file_get_contents('php://input');
$headers = getallheaders();

// Vérifier la signature
if (isset($headers['X-Hub-Signature-256'])) {
    $signature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    if ($signature !== $headers['X-Hub-Signature-256']) {
        http_response_code(403);
        exit('Invalid signature');
    }
}

// Lancer le script shell pour mettre à jour
shell_exec('/home/abysse/update.sh');
echo "Mise à jour effectuée.";
?>