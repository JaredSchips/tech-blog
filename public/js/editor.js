const editPost = async (event) => {
  event.preventDefault()
  await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: document.getElementById('title-form').value,
      content: document.getElementById('content-form').value
    })
  })
  document.location.pathname = `/dashboard`
}

const deletePost = async (event) => {
  event.preventDefault()
  await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
  document.location.pathname = `/dashboard`
}

document.getElementById('edit-button').addEventListener('click', editPost)
document.getElementById('delete-button').addEventListener('click', deletePost)
