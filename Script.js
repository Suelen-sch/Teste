const form   = document.getElementById('searchForm');
    const input  = document.getElementById('codeInput');
    const card   = document.getElementById('resultCard');
    const status = document.getElementById('status');

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const code = input.value.trim().toLowerCase();
      if(!code) return;

      status.textContent = 'Carregando…';
      card.style.display = 'none';

      try{
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if(!res.ok) throw new Error('País não encontrado');

        const data = await res.json();
        const c    = data[0];  // a API retorna um array
        console.log(c)

        // Preenche UI
        document.getElementById('flag').src   = c.flags.svg;
        document.getElementById('flag').alt   = `Bandeira de ${c.name.common}`;
        document.getElementById('countryName').textContent = c.name.official;
        document.getElementById('capital').textContent     = c.capital?.[0] || '–';
        document.getElementById('population').textContent  = c.population.toLocaleString('pt-BR');
        document.getElementById('region').textContent      = c.region;
        // moeda: primeiro item do objeto currencies
        const [currKey] = Object.keys(c.currencies || {});
        document.getElementById('currency').textContent    =
          currKey ? `${currKey} (${c.currencies[currKey].symbol})` : '–';

        card.style.display = 'flex';
        status.textContent = '';
      }
      catch(err){
        status.textContent = err.message;
      }
    });