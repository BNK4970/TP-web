<?php
// Configuration
$secret = 'votre_secret_webhook'; // Le secret défini dans le webhook GitHub
$logFile = '/logs/webhook.log';   // Chemin vers le fichier de log
$updateScript = '/update.sh';     // Chemin vers le script de mise à jour

// Lire le contenu brut de la requête
$payload = file_get_contents('php://input');

// Vérifier que la signature est correcte (sécurisation du webhook)
if (isset($_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
    $signature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    if (!hash_equals($signature, $_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
        http_response_code(403);
        file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Signature invalide\n", FILE_APPEND);
        exit('Signature invalide');
    }
} else {
    http_response_code(400);
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Signature absente\n", FILE_APPEND);
    exit('Signature absente');
}

// Décoder le payload JSON
$data = json_decode($payload, true);

// Vérifier qu'il s'agit d'un push sur la branche main
if (isset($data['ref']) && $data['ref'] === 'refs/heads/main') {
    // Log de réception de l'événement
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Push détecté sur la branche main\n", FILE_APPEND);

    // Exécuter le script de mise à jour
    $output = [];
    $status = 0;
    exec("bash $updateScript 2>&1", $output, $status);

    // Log des résultats
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Mise à jour : Status $status\n" . implode("\n", $output) . "\n", FILE_APPEND);

    if ($status === 0) {
        http_response_code(200);
        echo "Mise à jour réussie.\n";
    } else {
        http_response_code(500);
        echo "Erreur lors de la mise à jour.\n";
    }
} else {
    // Log pour les événements non pertinents
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Événement ignoré (pas un push sur main)\n", FILE_APPEND);
    http_response_code(200);
    echo "Aucun déploiement nécessaire.\n";
}
?>