<template>
  <div class="container">
    Cadastro de Usuário
    <div id="register-box">
      <form>
        <div class="form">
          <legend>Nome</legend>
          <input type="text" name="name" id="">
          <legend>E-mail</legend>
          <input type="text" name="e-mail" id="">
          <legend>Senha</legend>
          <input type="password" name="password" id="">
        </div>
        
        

        <div id="botoes">
          <button type="submit">Cadastrar-se</button>
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

#register-box {
  width: 30%;
}

#botoes {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

</style>