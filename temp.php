<?php

$to = "<luch-titan@yandex.ru>";
$subject = "Очень длинное тестовое сообщение, с очень длинным названием темы";
$message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
$headers = 'From: Example <example@romantic.96.lt>';

$message = wordwrap($message, 70);

echo mail($to, $subject, $message, $headers);

?>