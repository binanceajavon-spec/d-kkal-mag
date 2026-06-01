// ======================== BASE DE DONNÉES DES ARTICLES ========================

const articlesDB = [
  {
    id: "1",
    title: "Le futur de la mode urbaine",
    category: "Mode & Style",
    date: "28 mai 2026",
    readTime: "5 min de lecture",
    author: "Sarah Cohen",
    excerpt: "La mode urbaine évolue rapidement avec l'influence des réseaux sociaux...",
    content: `
      <p>La mode urbaine évolue rapidement avec l'influence des réseaux sociaux...</p>
      <h2>Les tendances 2026</h2>
      <p>Cette année, on voit émerger de nouvelles marques indépendantes...</p>
      <p>Les influenceurs jouent un rôle clé dans la démocratisation de ces styles.</p>
      <h3>Les pièces incontournables</h3>
      <p>Le baggy, les sneakers vintage et les accessoires oversize dominent les dressings.</p>
    `,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=500&fit=crop",
    tags: ["#mode", "#urbain", "#tendance"],
    featured: true,
    trending: true
  },
  {
    id: "2",
    title: "AI Breakthrough: New Model Beats Human Experts",
    category: "Tech",
    date: "27 mai 2026",
    readTime: "4 min de lecture",
    author: "Lucas Martin",
    excerpt: "Une avancée majeure dans le domaine de l'intelligence artificielle...",
    content: `<p>Les chercheurs ont développé un modèle capable de diagnostiquer des maladies rares...</p>`,
    image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=500&fit=crop",
    tags: ["#tech", "#IA", "#innovation"],
    featured: true,
    trending: true
  },
  {
    id: "3",
    title: "Zendaya & Tom Holland House Hunting in London",
    category: "Célébrités",
    date: "26 mai 2026",
    readTime: "3 min de lecture",
    author: "Emma Watson",
    excerpt: "Le couple le plus glamour d'Hollywood cherche une nouvelle maison à Londres...",
    content: `<p>Zendaya et Tom Holland ont été aperçus visitant des propriétés à Londres...</p>`,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=500&fit=crop",
    tags: ["#people", "#Hollywood"],
    featured: true,
    trending: true
  },
  {
    id: "4",
    title: "'Dune 3' Officially Announced",
    category: "Cinéma",
    date: "25 mai 2026",
    readTime: "6 min de lecture",
    author: "Thomas Lefèvre",
    excerpt: "Warner Bros confirme la suite tant attendue avec le retour du casting principal...",
    content: `<p>La saga Dune continue avec un troisième volet déjà en préparation...</p>`,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=500&fit=crop",
    tags: ["#cinema", "#dune"],
    featured: false,
    trending: true
  },
  {
    id: "5",
    title: "Beyoncé Announces World Tour 2026",
    category: "Musique",
    date: "24 mai 2026",
    readTime: "5 min de lecture",
    author: "James Brown",
    excerpt: "La reine de la pop dévoile les dates de sa tournée mondiale très attendue...",
    content: `<p>Beyoncé sera de retour sur scène pour une tournée exceptionnelle...</p>`,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop",
    tags: ["#musique", "#beyonce"],
    featured: false,
    trending: true
  },
  {
    id: "6",
    title: "Paris Fashion Week: Best Street Style Looks",
    category: "Mode & Style",
    date: "23 mai 2026",
    readTime: "4 min de lecture",
    author: "Claire Fontaine",
    excerpt: "Les meilleurs looks aperçus dans les rues de Paris pendant la Fashion Week...",
    content: `<p>Les fashionistas ont sorti le grand jeu pour cette édition parisienne...</p>`,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=500&fit=crop",
    tags: ["#mode", "#fashionweek"],
    featured: false,
    trending: false
  },
  {
    id: "7",
    title: "Elon Musk Unveils New AI Chip",
    category: "Tech",
    date: "22 mai 2026",
    readTime: "8 min de lecture",
    author: "Lucas Martin",
    excerpt: "Le PDG de Tesla présente une puce révolutionnaire pour l'IA embarquée...",
    content: `<p>La nouvelle puce promet des performances inégalées pour les véhicules autonomes...</p>`,
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=500&fit=crop",
    tags: ["#tech", "#IA"],
    featured: false,
    trending: true
  },
  {
    id: "8",
    title: "New Study: Daily Walk Cuts Dementia Risk by 40%",
    category: "Santé",
    date: "21 mai 2026",
    readTime: "3 min de lecture",
    author: "Dr. Sophie Moreau",
    excerpt: "Une étude révèle les bienfaits insoupçonnés de la marche quotidienne...",
    content: `<p>Marcher 30 minutes par jour réduirait significativement les risques de démence...</p>`,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=500&fit=crop",
    tags: ["#santé", "#bienêtre"],
    featured: false,
    trending: true
  }
];

// Fonctions utilitaires
function getArticleById(id) {
  return articlesDB.find(article => article.id === id);
}

function getArticlesByCategory(category) {
  return articlesDB.filter(article => article.category === category);
}

function getFeaturedArticles() {
  return articlesDB.filter(article => article.featured === true);
}

function getTrendingArticles() {
  return articlesDB.filter(article => article.trending === true);
}

function getAllArticles() {
  return [...articlesDB];
}

function getLatestArticles(limit = 6) {
  return [...articlesDB].slice(0, limit);
}

// Sauvegarder dans le localStorage pour persistance
function saveArticlesToLocalStorage() {
  localStorage.setItem('articlesDB', JSON.stringify(articlesDB));
}

function loadArticlesFromLocalStorage() {
  const saved = localStorage.getItem('articlesDB');
  if (saved) {
    return JSON.parse(saved);
  }
  return articlesDB;
}