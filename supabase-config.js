// ======================== supabase-config.js ========================
// Configuration Supabase pour le site Newsflash

const SUPABASE_URL = 'https://nluhjblqqpaulwmxyajx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdWhqYmxxcXBhdWx3bXh5YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzIyNzksImV4cCI6MjA5NTgwODI3OX0.IaevxiFXt0Ol9DvXA_0LonTjkuM74EuZU32smUURg1k';

// Initialisation du client Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase configuré avec succès !');

// ======================== FONCTIONS CRUD ========================

// Récupérer tous les articles
window.getAllArticles = async () => {
  const { data, error } = await supabaseClient
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('getAllArticles error:', error); return []; }
  return data || [];
};

// Récupérer les articles à la une (featured)
window.getFeaturedArticles = async () => {
  const { data, error } = await supabaseClient
    .from('articles')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);
  if (error) { console.error('getFeaturedArticles error:', error); return []; }
  return data || [];
};

// Récupérer les articles trending
window.getTrendingArticles = async () => {
  const { data, error } = await supabaseClient
    .from('articles')
    .select('*')
    .eq('trending', true)
    .order('created_at', { ascending: false })
    .limit(8);
  if (error) { console.error('getTrendingArticles error:', error); return []; }
  return data || [];
};

// Récupérer les articles trending d'une catégorie spécifique
window.getTrendingArticlesByCategory = async (category) => {
  const { data, error } = await supabaseClient
    .from('articles')
    .select('*')
    .eq('trending', true)
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(8);
  if (error) { console.error('getTrendingArticlesByCategory error:', error); return []; }
  return data || [];
};

// Récupérer les derniers articles (sidebar)
window.getLatestArticles = async (limit = 5) => {
  const { data, error } = await supabaseClient
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('getLatestArticles error:', error); return []; }
  return data || [];
};

// Récupérer les articles par catégorie
window.getArticlesByCategory = async (category) => {
  const { data, error } = await supabaseClient
    .from('articles')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  if (error) { console.error('getArticlesByCategory error:', error); return []; }
  return data || [];
};

// Récupérer un article par ID
window.getArticleById = async (id) => {
  const { data, error } = await supabaseClient
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) { console.error('getArticleById error:', error); return null; }
  return data;
};

// Ajouter un article (admin)
window.addArticle = async (article) => {
  const { data, error } = await supabaseClient
    .from('articles')
    .insert([{
      title: article.title,
      category: article.category,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      read_time: article.readTime,
      author: article.author,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      tags: article.tags || [],
      featured: article.featured || false,
      trending: article.trending || false
    }])
    .select();
  if (error) { console.error('addArticle error:', error); return null; }
  console.log('✅ Article ajouté !');
  return data;
};

// Supprimer un article (admin)
window.deleteArticle = async (id) => {
  const { error } = await supabaseClient
    .from('articles')
    .delete()
    .eq('id', id);
  if (error) { console.error('deleteArticle error:', error); return false; }
  console.log('✅ Article supprimé !');
  return true;
};

console.log('🚀 Toutes les fonctions sont prêtes !');