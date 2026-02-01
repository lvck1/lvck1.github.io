document.addEventListener('DOMContentLoaded',()=>{
  const listEl = document.getElementById('posts-list');
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  fetch('posts/posts.json')
    .then(r=>{ if(!r.ok) throw new Error('无法读取 posts/posts.json'); return r.json() })
    .then(posts=>{
      if(!Array.isArray(posts)) return;
      posts.sort((a,b)=> (b.date||'').localeCompare(a.date||''));
      posts.forEach(p=>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = p.url;
        a.textContent = p.title;
        li.appendChild(a);
        if(p.date||p.summary){
          const meta = document.createElement('div');
          meta.className = 'post-meta';
          meta.textContent = (p.date? p.date + ' — ' : '') + (p.summary || '');
          li.appendChild(meta);
        }
        listEl.appendChild(li);
      })
    })
    .catch(err=>{
      const li = document.createElement('li');
      li.textContent = '加载文章列表失败：' + err.message;
      listEl.appendChild(li);
    })
});
