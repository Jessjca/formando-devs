<script>
    import banner from '$lib/assets/banner.png';
</script>

<style>
#container {
    padding-top: var(--nav-height);
    background-color: var(--bg-black);
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
h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 2rem;
    color: var(--roxo);
}
h1 {
    font-size: 4.8rem;
    line-height: 110%;
    color: var(--luminous-white);
}
p {
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
            <header>
              <h3>Planejamento simples, ágil e divertido!</h3>
              <h1>A maneira mais divertida de estimar qualquer atividade!</h1>
              <p>Indepentende do tipo de atividade que você vai realizar, seja ela simples ou complexa, sempre vai existir uma variação da estimativa para realiza-la.</p>
            </header>
    
          </div>
    
          <div class="col-b">
            <img src={banner} alt="Banner">
          </div>
    </div>
</div>