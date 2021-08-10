<template>
  <div class="container">
    Cadastro de projeto
    <div id="project-box">
      <form method="POST">
        <div class="form-container">
          <label for="name">Nome do projeto</label>
          <input type="text" name="name" id="name" value="" />
        </div>
        <div id="botao">
          <button id="cdp" type="submit">Cadastrar Projeto</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#project-box {
  width: 30%;
}

#botao2 {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

#cdp {
  width: 200px;
}
</style>