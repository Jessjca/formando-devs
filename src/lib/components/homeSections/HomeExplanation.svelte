<script>
    import card from '$lib/assets/card.png';
</script>

<style>
#container {
    background-color: var(--bg-grey);
    padding-block: 11rem;  
}
#wrapper{
    grid-template-columns: 50rem 1fr;
    grid-template-areas: 'A B';
    width: min(105rem, 100%);
    display: grid;
    margin-inline: auto;
    padding-inline: 2.4rem;
    grid-area: A;
}
#wrapper .col-a {
    margin-top: 6rem;
    text-align: left;
    align-self: center;
    width: 95%;
}
#wrapper .col-b {
    grid-area: B;
}
p {
    margin-block: 2rem;
    font-size: 1.7rem;
    font-weight: 400;
    line-height: 2.5rem;
    color: var(--primary-grey);
}
img {
    display: block;
    height: 100%;
    filter: brightness(1.2);
    max-width: 100%;
}
</style>
<div id="container">
    <div id="wrapper">
        <div class="col-a">
            <div class="box-1">
              <p>Vamos assumir que a partir de agora estamos em uma Sprint Planning e seu time é composto por 04 pessoas e iremos estimar os itens do topo do Product Backlog.</p>
            </div>
    
            <div class="box-2">
              <p>Como o PO já apresentou os itens priorizados, os membros do time, em consenso, devem definir qual o menor item dentre os selecionados para a planning. Será a partir desse menor item que o time irá começar a sua comparação.</p>
            </div>
            
            <div class="box-3">
              <p>Todos devem escolher sua carta sem mostrar para outra pessoa do time e jogar ao mesmo tempo.</p>
            </div>
          </div>
  
          <div class="col-b">
            <img src={card} alt="pizzaiolo">
          </div>
        </div>
    </div>