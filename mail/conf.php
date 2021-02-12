<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if($_GET["cmd"] == "email"){
    $name = mb_convert_case(htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8'), MB_CASE_TITLE, "UTF-8");
    $email = mb_strtolower(htmlspecialchars(trim($_POST['email']), ENT_QUOTES, 'UTF-8'), 'UTF-8');
    $messange = mb_strtolower(htmlspecialchars(trim($_POST['messange']), ENT_QUOTES, 'UTF-8'), 'UTF-8');

    function sendEmail($email, $name = '', $title, $message, $message_alt, $email_reply = '', $name_reply = '', $file = '') {
        // Instantiation and passing `true` enables exceptions
        $mail = new PHPMailer(true);
    
        try {
            //Server settings
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
            // Send using SMTP
            $mail->CharSet = 'utf-8';
            $mail->isSMTP();
            $mail->Host       = 'smtp.mail.ru';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = "user mail";                     // SMTP username
            $mail->Password   = 'user password';                              // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
            //Recipients
            $mail->setFrom("User mail", 'Yeghoyan Web Studio v1');
            $mail->addAddress("the second mile", $name);     // Add a recipient
            // Reply
            if ($email_reply != '' && $name_reply != '') {
               $mail->addReplyTo($email_reply, $name_reply);
            }
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
    
            // Attachments
            if(!empty($file)) {
               if(isset($file['tmp_name'])) {
                   $mail->AddAttachment($file['tmp_name'], $file['name']);
               } else {
                   $mail->AddStringAttachment($file["body"], $file["name"], 'base64', 'application/octet-stream');
               }
            }
    
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = $title;
            $mail->Body    = $message;
            $mail->AltBody = $message_alt;
    
            return $mail->send();
        } catch (Exception $e) {
    //        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
    $e_subject = 'Message of Venera Template';
    $e_message = '
    <html>
        <body>
            <div style="font: 14px/1.5 Arial, Tahoma, Verdana, sans-serif">
                <p style="margin-bottom: 10px;">This email: '.$email.':</p>
                <p style="margin-bottom: 10px;">This messange: '.$messange.':</p>
                <p style="color:#666">With respects` Yeghoyan Web Studio  yexoyan3120@gmail.com</p>
            </div>
        </body>
    </html>';
    $e_message_alt = "The test was successful";
    // send email

    sendEmail($email, $name, $e_subject, $e_message, $e_message_alt);
    $resp = array("title" => "Warninig", "messange" => "Your message has been sent");
    echo json_encode($resp);
}else{
    $resp = array("title" => "Error", "messange" => "Problems with server");
    echo json_encode($resp);
}
?>