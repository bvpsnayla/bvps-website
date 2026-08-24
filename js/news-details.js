<script>

const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "board-exam";
const article = newsData[id];

const hero = document.getElementById("articleHero");
const container = document.getElementById("articleContainer");

if(!article){
  document.title = "News Not Found | BVPS";
  hero.innerHTML = `
    <div class="not-found">
      <i class="fas fa-newspaper"></i>
      <h2>News Not Found</h2>
      <p>The requested news article could not be found.</p>
    </div>`;
  container.innerHTML = `
    <div class="article-content text-center">
      <a href="Updates.html" class="back-bottom">
        <i class="fas fa-arrow-left"></i> Back to All News
      </a>
    </div>`;
}else
{document.title = article.title + " | BVPS Nayla";

  hero.innerHTML = `
    <div class="category-badge">
      <i class="fas fa-newspaper"></i> ${article.category}
    </div>
    <h1 class="article-title">${article.title}</h1>
    <div class="article-meta">
      <i class="far fa-calendar-alt"></i> ${article.date}
      &nbsp; · &nbsp; Bal Vikas Senior Secondary School, Nayla
    </div>`;

  const shareUrl = window.location.href;

  container.innerHTML = `
    <img src="${article.image}" alt="${article.title}" class="article-image">
    <div class="article-content">
      ${article.content}

      <div class="share-box">
        <strong>Share this update:</strong><br>

        <a class="share-btn whatsapp"
           target="_blank"
           href="https://wa.me/">
          <i class="fab fa-whatsapp"></i> Share on WhatsApp
        </a>

        <br>

        <a href="Updates.html" class="back-bottom">
          <i class="fas fa-arrow-left"></i> Back to All News
        </a>
      </div>
    </div>`;
}
</script>