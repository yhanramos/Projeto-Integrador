    <?php
    if(isset($_POST['email']) && isset($_POST['senha'])){
        include_once('conexao.php');
        $email= $_POST['email'];
        $senha= $_POST['senha'];

        $sql= "SELECT * FROM usuarios WHERE email='$email' and senha= '$senha'";
        $query= mysqli_query($conexao, $sql);
        $user= $query->fetch_assoc();
        
        if(mysqli_num_rows($query) == 0){
            echo "<b>E-mail e/ou senha incorretos</b>";
        }else{
            if(!isset($_SESSION)){
                session_start();
                $_SESSION['email']=$user['email'];
                header('location:entrega.html');
            }
        }
    }

    ?>
    <style>
        echo{
            color: blue;
        }
    </style>