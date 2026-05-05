const token = localStorage.getItem('token');
const testPostId = localStorage.getItem('testPostId');

async function loadPosts() {
  const status = document.getElementById('status');

  if (!token) {
    status.textContent = '❌ No token found';
    return;
  }

  try {
    const response = await fetch('/posts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      status.textContent = `❌ Failed (${response.status})`;
      return;
    }

    const posts = await response.json();

    const container = document.getElementById('posts');
    container.innerHTML = '';

    posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'post';
      div.setAttribute('data-id', post.id);

      const isTestData = post.id == testPostId;

      div.innerHTML = `
        ${isTestData ? '<strong>🧪 TEST DATA</strong><br/>' : ''}
        <strong>ID:</strong> ${post.id}<br/>
        <strong>Title:</strong> ${post.title}<br/>
        <strong>Content:</strong> ${post.content}<br/>
        <strong>Created:</strong> ${new Date(post.createdAt).toLocaleString()}<br/>
        <span style="color:${isTestData ? 'green' : 'gray'};">
          ${isTestData ? '✔ Verified by E2E test' : '• Existing data'}
        </span>
      `;

      if (isTestData) {
        div.classList.add('highlight');
      }

      container.appendChild(div);
    });

    status.textContent = `✅ Loaded ${posts.length} posts`;

  } catch (err) {
    status.textContent = '❌ Network error';
    console.error(err);
  }
}

loadPosts();
setInterval(loadPosts, 1000);