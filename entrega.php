<?php
if(isset($_POST['pagamento'])){
    include_once('conexao.php'); // Certifique-se de que 'conexao.php' está definido corretamente

    $postal = $_POST['postal']; 
    $estado = $_POST['estado']; 
    $cidade = $_POST['cidade']; 
    $bairro = $_POST['bairro']; 
    $rua = $_POST['rua']; 
    $numero = $_POST['numero']; 
    $complemento = $_POST['complemento']; 

    $sql = "INSERT INTO entrega (postal, estado, cidade, bairro, rua, numero, complemento ) VALUES ('$postal', '$estado', '$cidade','$bairro', '$rua', '$numero', '$complemento')";

    if(mysqli_query($conexao, $sql)){
        mysqli_close($conexao); // Fechar conexão
        header("Location: cartao.html"); // Redirecionar para a página de login
        exit();
    } else {
        echo "Erro ao cadastrar o endereço: " . mysqli_error($conexao);
    }

    mysqli_close($conexao); // Fechar conexão
}
?>
