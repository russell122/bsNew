<?php
	// отправка

	$to = "romicck@mail.ru";
	
	$phone = $_POST["phone"];
	$name = $_POST["name"];
	$subject = "Привет, перезвоните $name";

	$headers = "From: $to" . "\r\n" . "Replay-To: $to" . "\r\n" . "X-Mailer: PHP/" . phpversion();

	mail($to, $subject, $phone, $headers);

	// отправка
?>