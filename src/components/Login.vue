<template>
  <div class="container">
    Tela de login
    <div id="login-box">
      <form>
        <div class="form">
          <legend>E-mail</legend>
          <input type="text" name="e-mail" id="">
          <legend>Senha</legend>
          <input type="password" name="password" id="">
        </div>
        
        <div id="botoes">
          <button type="submit">Login</button>
          <button type="button">Cadastre-se</button>  
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
  /* align-items: ; */
}

legend {
  align-self: flex-start;
}

button {
  width: 103px;
  height: 27px;
  border-radius: 32px; 
  color: #1aafd3;
  background-color: rgba(52,202,219,.1);
  border: 2px solid #1d5c99;
  font-family: Poppins,sans-serif;
  font-size: 10px;
  cursor: pointer;
  /* letter-spacing: .15rem; */
}

button:hover {
  color: #fff;
  border: 2px solid #fff;
}

#login-box {
  width: 30%;
}

#botoes {
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}

</style>