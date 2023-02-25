const createPost = async () => {
  const post = await (await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: document.getElementById('title-form').value,
      content: document.getElementById('content-form').value,
      user_id: userId
    })
  })).json()
  document.location.pathname = `/post/${post.id}`
}

document.getElementById('submit-button').addEventListener('click', createPost)
