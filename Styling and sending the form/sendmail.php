<?php
	//Подключение файлов для работы плагина
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exeption;

	require "phpmailer/src/Exeption.php";
	require "phpmailer/src/PHPMailer";

	//Объявление
	$mail = new PHPMailer(true);
	$mail->CharSet = "UTF-8";//Настройки кодировки
	$mail->setLanguage("ru", "phpmailer/language/");//Настройка языка для отображения возможных ошибок
	$mail->isHTML(true);

	//От кого письмо
	$mail->setFron("symphonyofhope@yandex.ru", "Начинающий разработчик");//Вторым аргументом идет подпись
	//Кому письмо
	$mail->addAddress("kelsenelenelvial@mail.ru");
	//Тема письма
	$mail->Subject = "Привет! Это начинающий Фронтенд-разработчик!";

	//Проверка
	$hand = "Правая";
	if($_POST['hand'] == "left"){
		$hand = "Левая";
	}

	//Тело письма
	$body = "<h1>Встречайте суперписьмо!</h1>";//Заголовок письма

	//Проверки
	if(trim(!empty($_POST['name']))){
		//Проверка на пустоту поля с именем
		$body.="<p><strong>Имя:</strong> '.$_POST['name'].'</p>";
	}
	if(trim(!empty($_POST["email"]))){
		//ПРоверка на пустоту поля с почтой
		$body.="<p><strong>E-mail:</strong> '.$_POST['email'].'</p>";
	}
	if(trim(!empty($_POST['hand']))){
		//ПРоверка на выбор чекбокса
		$body.="<p><strong>Рука:</strong> '$hand.'</p>";
	}
	if(trim(!empty($_POST['age']))){
		//ПРоверка на возраст
		$body.="<p><strong>Возраст:</strong> '.$_POST['age'].'</p>";
	}
	if(trim(!empty($_POST['message']))){
		//ПРоверка на возраст
		$body.="<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>";
	}

	//Прикрепить файл
	if(!empty($_FILES['image']['tmp_name'])){
		//Если файл выбран
		//Путь загрузки
		$filePath = __DIR__ . "/files/" . $_FILES['image']['name']
		//Грузим файл
		if(copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong></p>';
			$mail->AddAttachment($fileAttach);
		}
	}

	$mail->Body = $body;

	//Отправляем
	if(!$mail->send()){
		$message = 'Ошибка';
	}else{
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);

?>