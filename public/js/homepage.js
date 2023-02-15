getRecentPosts = async () => {
  const response = await fetch('/api/posts')
  if (!response.ok) alert('Error fetching posts')
  return response.json()
}

createPostCard = (post) => {
  const { title, content, user, date_created, id } = post
  const { username } = user

  const card = document.createElement('div')
  card.className = 'card m-2'
  card.innerHTML = `
  <a class="text-reset text-decoration-none" href="/post/${id}">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        ${title}
        <div class="text-muted text-end">Posted by ${username} on ${date_created}</div>
      </div>
      <div class="card-body">
        <p class="card-text text-truncate">${content}</p>
      </div>
    </div>
  </a>
`
  return card
}

populatePosts = async () => {
  const posts = await getRecentPosts()
  const postContainer = document.getElementById('post-container')

  for (const post of posts) {
    const card = createPostCard(post)
    postContainer.appendChild(card)
  }
}

populatePosts()
