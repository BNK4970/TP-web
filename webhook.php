<?php
// Secret partagé pour vérifier l'authenticité du webhook
$secret = 'abysse';

// Récupérer le contenu brut de la requête
$payload = file_get_contents('php://input');
$headers = getallheaders();

// Vérifier la signature du webhook
if (isset($headers['X-Hub-Signature-256'])) {
    $signature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    if ($signature !== $headers['X-Hub-Signature-256']) {
        http_response_code(403); // Refuser l'accès si la signature est incorrecte
        error_log(date('[Y-m-d H:i:s]') . " : Signature invalide\n", 3, '/home/<utilisateur>/logs/webhook.log');
        exit('Signature invalide');
    }
}

// Exécuter le script de mise à jour
$output = shell_exec('/home/abysse/update.sh 2>&1'); // Lancer le script
http_response_code(200); // Répondre avec succès
echo "Mise à jour effectuée.";

// Enregistrer dans les logs
file_put_contents('/home/abysse/logs/webhook.log', date('[Y-m-d H:i:s]') . " : Webhook reçu, résultat : $output\n", FILE_APPEND);
?>
