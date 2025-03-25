// Fonction pour créer une carte de vin
function createWineCard(wine) {
    const card = document.createElement('div');
    card.classList.add('wine-card');
  
    // Titre du vin
    const title = document.createElement('h2');
    title.textContent = wine.title;
    card.appendChild(title);
  
    // Prix
    const price = document.createElement('p');
    price.textContent = `Prix : ${wine.price ? wine.price + ' €' : 'N/A'}`;
    card.appendChild(price);
  
    // Note
    const points = document.createElement('p');
    points.textContent = `Note : ${wine.points}`;
    card.appendChild(points);
  
    // Région
    const region = document.createElement('p');
    region.textContent = `Région : ${wine.region_1 ? wine.region_1 : ''} ${wine.province ? '- ' + wine.province : ''}`;
    card.appendChild(region);
  
    // Cépage
    const variety = document.createElement('p');
    variety.textContent = `Cépage : ${wine.variety}`;
    card.appendChild(variety);
  
    return card;
  }
  
  // Charger les données du fichier JSON
  fetch('data/wine-data-set.json')
    .then(response => response.json())
    .then(data => {
      const wineList = document.getElementById('wine-list');
      // Parcourir la liste des vins et créer des cartes pour chacun
      data.forEach(wine => {
        const card = createWineCard(wine);
        wineList.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement du fichier JSON :", error);
    });
  