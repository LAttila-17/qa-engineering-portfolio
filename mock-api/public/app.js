const token = localStorage.getItem('token');

async function loadPosts() {
  if (!token) {
    console.error('No token found');
    return;
  }

  const response = await fetch('/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch posts', response.status);
    return;
  }

  const posts = await response.json();

  const list = document.getElementById('posts');
  list.innerHTML = '';

  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = post.title;
    li.setAttribute('data-id', post.id);
    list.appendChild(li);
  });
}

loadPosts();