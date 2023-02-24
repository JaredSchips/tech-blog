const populateAll = async () => {
  const post = await (await fetch(`/api/posts/${postId}`)).json()
  populatePost(post)
  populateComments(post.comments)
}

const populatePost = (post) => {
  const { title, content, user, date_created } = post
  document.getElementById('post-container').innerHTML = `
  <div class="row">
    <h1 id="title" class="col-9">${title}</h1>  
    <p id="date" class="col-3 text-end">Posted by ${user.username} at ${date_created}</p>
  </div>
  <p id="content" class="text-wrap" style="white-space: pre">${content}</p>
`
}

const populateComments = (comments) => {
  const commentContainer = document.getElementById('comment-container')
  for (const comment of comments) {
    const commentCard = createCommentCard(comment)
    commentContainer.appendChild(commentCard)
  }
}

const createCommentCard = (comment) => {
  const { content, date_created, user } = comment

  const commentCard = document.createElement('div')
  commentCard.className = 'card m-2'
  commentCard.innerHTML = `
  <div class="card">
    <div class="card-body d-flex row">
      <p class="card-text col-9">${content}</p>
      <p class="card-text col-3 text-end">Commented by ${user.username} on ${date_created}</p>
    </div>
  </div>
`
  return commentCard
}

populateAll()