<?php
// ========== SEND.PHP ==========
// Версия: 3.3.0 - TimeWeb
// Домен: juristspb78.ru
// Назначение: Полноценная обработка форм с защитой и технической информацией
// Добавлена поддержка онлайн-консультаций
// Дата: 4 марта 2026

// ========== 1. НАСТРОЙКИ ОШИБОК ==========
// Отключаем показ ошибок в продакшене
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// ========== 2. ПОДКЛЮЧАЕМ КОНФИГ С ПАРОЛЯМИ ==========
$config_path = __DIR__ . '/config/smtp_config.php';

if (!file_exists($config_path)) {
    error_log('CRITICAL: SMTP config file not found at: ' . $config_path);
    http_response_code(500);
    die('Временная ошибка конфигурации. Пожалуйста, попробуйте позже.');
}

require_once $config_path;

// Проверяем, что все нужные константы определены
if (!defined('SMTP_USER') || !defined('SMTP_PASS') || !defined('SMTP_HOST')) {
    error_log('CRITICAL: SMTP constants not defined');
    http_response_code(500);
    die('Временная ошибка. Пожалуйста, попробуйте позже.');
}

// ========== 3. ПРОВЕРКА МЕТОДА ЗАПРОСА ==========
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(403);
    die('Доступ запрещён');
}

// ========== 4. ЗАЩИТА ОТ БОТОВ (HONEYPOT) ==========
if (!empty($_POST['honeypot'])) {
    // Тихо выходим, бот думает что всё ок
    die('ok');
}

// ========== 5. ЗАЩИТА ОТ ФЛУДА И CSRF ==========

// 5.1. Запуск сессии с защитой
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Strict',
        'cookie_secure' => isset($_SERVER['HTTPS']),
    ]);
}

// 5.2. Генерация CSRF-токена
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// 5.3. Проверка CSRF-токена (ОБЯЗАТЕЛЬНО)
if (empty($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    http_response_code(403);
    die('Неверный токен безопасности. Обновите страницу и попробуйте снова.');
}

// 5.4. Защита от флуда
if (isset($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 30) {
    http_response_code(429);
    die('Слишком частые отправки. Подождите 30 секунд.');
}
$_SESSION['last_submit'] = time();

// ========== 6. ФУНКЦИИ ВАЛИДАЦИИ ==========
/**
 * Очистка и валидация телефонного номера
 * Поддерживает форматы: +7 (999) 123-45-67, 89991234567, +7-999-123-45-67
 */
function validatePhone($phone)
{
    // Удаляем все кроме цифр и знака +
    $clean = preg_replace('/[^0-9+]/', '', $phone);

    // Проверяем длину (от 10 до 15 цифр, учитывая +)
    $digitsOnly = preg_replace('/[^0-9]/', '', $clean);

    if (strlen($digitsOnly) < 10 || strlen($digitsOnly) > 15) {
        return false;
    }

    // Проверяем, что номер начинается с допустимого префикса
    if (!preg_match('/^(\+7|8|7|9)/', $digitsOnly)) {
        return false;
    }

    return $clean;
}

/**
 * Валидация имени (только буквы, пробелы, дефисы)
 */
function validateName($name)
{
    // Разрешены: буквы (всех языков), пробелы, дефисы, точки
    return preg_match('/^[\p{L}\s\.\-]+$/u', $name);
}

// ========== 7. ПОЛУЧАЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ==========
$name = strip_tags(trim($_POST["name"] ?? ''));
$phone = strip_tags(trim($_POST["phone"] ?? ''));
$message = strip_tags(trim($_POST["message"] ?? ''));
$online = strip_tags(trim($_POST["online"] ?? 'no'));

// ========== 8. ВАЛИДАЦИЯ ==========
$errors = [];

if (empty($name)) {
    $errors[] = 'Пожалуйста, укажите ваше имя';
} elseif (!validateName($name)) {
    $errors[] = 'Имя может содержать только буквы, пробелы и дефисы';
}

if (empty($phone)) {
    $errors[] = 'Пожалуйста, укажите номер телефона';
} else {
    $validatedPhone = validatePhone($phone);
    if (!$validatedPhone) {
        $errors[] = 'Введите корректный номер телефона (например: +7 999 123-45-67)';
    } else {
        $phone = $validatedPhone;
    }
}

// Сообщение может быть пустым, но если заполнено - проверяем длину
if (!empty($message) && mb_strlen($message) > 1000) {
    $errors[] = 'Сообщение не должно превышать 1000 символов';
}

if (!empty($errors)) {
    http_response_code(400);
    die(implode("\n", $errors));
}

// ========== 9. СОХРАНЯЕМ ВРЕМЯ ОТПРАВКИ ==========
$_SESSION['last_submit'] = time();

// ========== 10. СБОР ТЕХНИЧЕСКОЙ ИНФОРМАЦИИ ==========
$ip_address = $_SERVER['REMOTE_ADDR'] ?? 'Неизвестно';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Неизвестно';
$referer = $_SERVER['HTTP_REFERER'] ?? 'Прямой заход';
$page_url = $_SERVER['REQUEST_URI'] ?? '/';
$request_time = date('Y-m-d H:i:s');

// Определяем тип устройства
$device_type = 'Компьютер';
if (strpos($user_agent, 'Mobile') !== false) {
    $device_type = 'Мобильный телефон';
} elseif (strpos($user_agent, 'Tablet') !== false) {
    $device_type = 'Планшет';
} elseif (strpos($user_agent, 'iPad') !== false) {
    $device_type = 'iPad';
} elseif (strpos($user_agent, 'Android') !== false) {
    $device_type = 'Android';
}

// Определяем браузер
$browser = 'Неизвестно';
if (strpos($user_agent, 'Chrome') !== false && strpos($user_agent, 'Edg') === false && strpos($user_agent, 'OPR') === false) {
    $browser = 'Google Chrome';
} elseif (strpos($user_agent, 'Firefox') !== false && strpos($user_agent, 'Seamonkey') === false) {
    $browser = 'Mozilla Firefox';
} elseif (strpos($user_agent, 'Safari') !== false && strpos($user_agent, 'Chrome') === false && strpos($user_agent, 'CriOS') === false) {
    $browser = 'Safari';
} elseif (strpos($user_agent, 'Edg') !== false) {
    $browser = 'Microsoft Edge';
} elseif (strpos($user_agent, 'Opera') !== false || strpos($user_agent, 'OPR') !== false) {
    $browser = 'Opera';
} elseif (strpos($user_agent, 'YaBrowser') !== false) {
    $browser = 'Яндекс.Браузер';
}

// Определяем операционную систему
$os = 'Неизвестно';
if (strpos($user_agent, 'Windows NT') !== false) {
    $os = 'Windows';
} elseif (strpos($user_agent, 'Mac OS X') !== false) {
    $os = 'macOS';
} elseif (strpos($user_agent, 'Linux') !== false && strpos($user_agent, 'Android') === false) {
    $os = 'Linux';
} elseif (strpos($user_agent, 'Android') !== false) {
    $os = 'Android';
} elseif (strpos($user_agent, 'iPhone') !== false || strpos($user_agent, 'iPad') !== false) {
    $os = 'iOS';
}

// ========== 11. ПОДКЛЮЧАЕМ PHPMailer (БЕЗОПАСНАЯ ВЕРСИЯ) ==========

// Определяем базовую директорию PHPMailer (только один надёжный путь)
$phpmailer_base = __DIR__ . '/phpmailer/';

// Проверяем, что директория существует и не выходит за пределы корня
$real_base = realpath($phpmailer_base);
if ($real_base === false || strpos($real_base, realpath(__DIR__)) !== 0) {
    error_log('CRITICAL: Invalid PHPMailer path: ' . $phpmailer_base);
    http_response_code(500);
    die('Ошибка конфигурации сервера');
}

// Проверяем наличие основного файла
$main_file = $real_base . '/PHPMailer.php';
if (!file_exists($main_file)) {
    error_log('CRITICAL: PHPMailer not found at: ' . $main_file);
    http_response_code(500);
    die('Ошибка конфигурации сервера');
}

// Подключаем файлы через безопасные абсолютные пути
require_once $real_base . '/PHPMailer.php';
require_once $real_base . '/SMTP.php';
require_once $real_base . '/Exception.php';

// Проверяем, что классы загрузились
if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    error_log('CRITICAL: PHPMailer class not loaded');
    http_response_code(500);
    die('Ошибка конфигурации сервера');
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ========== 12. СОЗДАЁМ ПИСЬМО ==========
$mail = new PHPMailer(true);

try {
    // Настройки сервера - ИСПОЛЬЗУЕМ КОНСТАНТЫ ИЗ КОНФИГА
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = SMTP_PORT;
    $mail->Timeout    = defined('SMTP_TIMEOUT') ? SMTP_TIMEOUT : 30;
    $mail->CharSet    = defined('SMTP_CHARSET') ? SMTP_CHARSET : 'UTF-8';

    // Отладка (только если включено)
    if (defined('SMTP_DEBUG') && SMTP_DEBUG === true) {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    } else {
        $mail->SMTPDebug = SMTP::DEBUG_OFF;
    }

    $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
    $mail->addAddress(SMTP_TO);
    $mail->addReplyTo(SMTP_FROM, SMTP_FROM_NAME);

    $mail->isHTML(true);

    // Меняем тему в зависимости от типа заявки
    if ($online === 'yes') {
        $mail->Subject = '📹 [ОНЛАЙН] Заявка на консультацию (5000₽)';
        $mail->addCustomHeader('X-Request-Type', 'online-consultation');
    } else {
        $mail->Subject = '📬 Новая заявка с сайта juristspb78.ru';
        $mail->addCustomHeader('X-Request-Type', 'regular');
    }

    // ========== 13. КРАСИВОЕ ТЕЛО ПИСЬМА (БЕЗОПАСНАЯ ВЕРСИЯ) ==========

    // Защита от пустых значений и XSS
    $safe_name = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safe_phone = htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safe_message = !empty($message) ? nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) : '';
    $safe_ip = htmlspecialchars($ip_address, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safe_user_agent = htmlspecialchars($user_agent, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safe_referer = htmlspecialchars($referer, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safe_device = htmlspecialchars($device_type, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safe_os = htmlspecialchars($os, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safe_browser = htmlspecialchars($browser, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    $mail->Body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Новая заявка</title>
    <style>
        body { 
            font-family: 'Inter', Arial, sans-serif; 
            line-height: 1.6; 
            background: #F5F7FA;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 20px 40px -12px rgba(0,0,0,0.1);
            border: 1px solid rgba(42, 92, 127, 0.1);
        }
        h2 { 
            color: #2A5C7F; 
            margin-top: 0;
            font-size: 24px;
            border-bottom: 2px solid #E4E7EC;
            padding-bottom: 16px;
        }
        .section {
            margin: 24px 0;
        }
        .section-title {
            font-weight: 600;
            color: #2A5C7F;
            margin-bottom: 12px;
            font-size: 18px;
        }
        .info-grid {
            background: #F8FAFC;
            padding: 20px;
            border-radius: 16px;
        }
        .info-row {
            display: flex;
            margin: 8px 0;
            border-bottom: 1px solid #E4E7EC;
            padding: 8px 0;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #2A5C7F;
            min-width: 140px;
        }
        .value {
            color: #1D2939;
            flex: 1;
        }
        .footer {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #E4E7EC;
            color: #667085;
            font-size: 12px;
            text-align: center;
        }
        .highlight {
            background: #E8F5E9;
            padding: 2px 8px;
            border-radius: 12px;
            color: #2E7D32;
            font-weight: 500;
        }
        .online-badge {
            background: #FEF6E6;
            border: 2px solid #C35F2C;
            border-radius: 16px;
            padding: 20px;
            margin: 24px 0;
        }
        .online-badge h3 {
            color: #9E4B22;
            margin: 0 0 12px 0;
            font-size: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .online-badge p {
            margin: 8px 0;
            color: #1D2939;
        }
        .online-badge .note {
            color: #667085;
            font-size: 0.95rem;
            margin-top: 12px;
        }
    </style>
</head>
<body>
    <div class='container'>
        <h2>" . ($online === 'yes' ? '📹 ЗАЯВКА НА ОНЛАЙН-КОНСУЛЬТАЦИЮ' : '📬 Новая заявка с сайта') . "</h2>
        
        " . ($online === 'yes' ? "
        <div class='online-badge'>
            <h3>
                <span style='font-size: 32px;'>📹</span>
                ОНЛАЙН-КОНСУЛЬТАЦИЯ (5 000 ₽/час)
            </h3>
            <p><strong>Клиент хочет записаться на видеоконсультацию</strong></p>
            <p class='note'>После получения заявки свяжитесь с клиентом для согласования времени</p>
        </div>
        " : "") . "
        
        <div class='section'>
            <div class='section-title'>👤 Данные клиента</div>
            <div class='info-grid'>
                <div class='info-row'>
                    <span class='label'>Имя:</span>
                    <span class='value'>$safe_name</span>
                </div>
                <div class='info-row'>
                    <span class='label'>Телефон:</span>
                    <span class='value'>$safe_phone</span>
                </div>
                " . (!empty($message) ? "
                <div class='info-row'>
                    <span class='label'>📝 Ситуация:</span>
                    <span class='value'>$safe_message</span>
                </div>" : "") . "
            </div>
        </div>
        
        <div class='section'>
            <div class='section-title'>📊 Техническая информация</div>
            <div class='info-grid'>
                <div class='info-row'>
                    <span class='label'>IP-адрес:</span>
                    <span class='value'>$safe_ip</span>
                </div>
                <div class='info-row'>
                    <span class='label'>Дата и время:</span>
                    <span class='value'>$request_time</span>
                </div>
                <div class='info-row'>
                    <span class='label'>Тип устройства:</span>
                    <span class='value'>$safe_device</span>
                </div>
                <div class='info-row'>
                    <span class='label'>Операционная система:</span>
                    <span class='value'>$safe_os</span>
                </div>
                <div class='info-row'>
                    <span class='label'>Браузер:</span>
                    <span class='value'>$safe_browser</span>
                </div>
                <div class='info-row'>
                    <span class='label'>User-Agent:</span>
                    <span class='value' style='font-size: 11px; word-break: break-all;'>$safe_user_agent</span>
                </div>
                <div class='info-row'>
                    <span class='label'>Откуда пришёл:</span>
                    <span class='value' style='word-break: break-all;'>$safe_referer</span>
                </div>
            </div>
        </div>
        
        <div class='footer'>
            Письмо отправлено с сайта juristspb78.ru
        </div>
    </div>
</body>
</html>
";

    // Альтернативный текст для почтовых программ без HTML
    $altBody = "";

    if ($online === 'yes') {
        $altBody .= "📹 ОНЛАЙН-КОНСУЛЬТАЦИЯ (5000₽/час)\n";
        $altBody .= "Клиент хочет записаться на видеоконсультацию\n";
        $altBody .= "Свяжитесь с ним для согласования времени\n\n";
    }

    $altBody .= "НОВАЯ ЗАЯВКА\n==============\n\n";
    $altBody .= "ДАННЫЕ КЛИЕНТА:\n";
    $altBody .= "Имя: $name\n";
    $altBody .= "Телефон: $phone\n";
    if (!empty($message)) {
        $altBody .= "Ситуация: $message\n\n";
    } else {
        $altBody .= "\n";
    }
    $altBody .= "ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ:\n";
    $altBody .= "IP-адрес: $ip_address\n";
    $altBody .= "Дата: $request_time\n";
    $altBody .= "Устройство: $device_type\n";
    $altBody .= "ОС: $os\n";
    $altBody .= "Браузер: $browser\n";
    $altBody .= "Откуда пришёл: $referer\n";

    $mail->AltBody = $altBody;

    // ========== 14. ОТПРАВЛЯЕМ ==========
    $mail->send();

    // Возвращаем успех
    echo 'ok';
} catch (Exception $e) {
    // Логируем ошибку, но не показываем пользователю
    $error_log = date('Y-m-d H:i:s') . ' | Ошибка: ' . $mail->ErrorInfo . ' | Исключение: ' . $e->getMessage() . PHP_EOL;
    @file_put_contents(__DIR__ . '/mail_errors.log', $error_log, FILE_APPEND | LOCK_EX);

    // Если включена отладка, показываем ошибку
    if (defined('SMTP_DEBUG') && SMTP_DEBUG === true) {
        http_response_code(500);
        echo 'Ошибка SMTP: ' . $mail->ErrorInfo;
    } else {
        http_response_code(500);
        echo 'Ошибка при отправке. Пожалуйста, попробуйте позже.';
    }
}
