const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value.trim();
    const body = document.querySelector('textarea[name="postBody"]').value.trim();
  
  
    if (title && body) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, body}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

   
  document
    .querySelector('#newPost')
    .addEventListener('submit', newPostFormHandler);