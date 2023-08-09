<?php
if(isset($_POST['cadastrar'])){
    include_once('conexao.php'); // Certifique-se de que 'conexao.php' está definido corretamente

    $nome = mysqli_real_escape_string($conexao, $_POST['nome']);
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $senha = $_POST['senha']; // Hash da senha

    $sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senha')";

    if(mysqli_query($conexao, $sql)){
        mysqli_close($conexao); // Fechar conexão
        header("Location: login.html"); // Redirecionar para a página de login
        exit();
    } else {
        echo "Erro ao cadastrar o usuário: " . mysqli_error($conexao);
    }

    mysqli_close($conexao); // Fechar conexão
}
?>

