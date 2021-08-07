<template>
  <div class="container">
    Tela de login
    <div id="login-box">
      <form>
        <div class="form">
          Usuário
          <input type="text" name="e-mail" id="">
          Senha
          <input type="password" name="password" id="">
        </div>
        
        <div id="botoes">
          <button type="submit">Login</button>
          <button>Cadastre-se</button>  
        </div>

        
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.container {
  /* width: 100vw;
  height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  
}

#login-box {
  /* width: 50%; */
}

</style>