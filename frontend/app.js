const API_URL = 'http://localhost:8000';
let token = localStorage.getItem('token');

// Show/hide sections based on auth state
function updateAuthState() {
    const authSection = document.getElementById('authSection');
    const mainContent = document.getElementById('mainContent');
    
    if (token) {
        authSection.classList.add('hidden');
        mainContent.classList.remove('hidden');
        fetchPosts();
    } else {
        authSection.classList.remove('hidden');
        mainContent.classList.add('hidden');
    }
}

// Register Form Handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${API_URL}/users/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('regUsername').value,
                email: document.getElementById('regEmail').value,
                password: document.getElementById('regPassword').value
            })
        });
        
        if (!response.ok) throw new Error('Registration failed');
        
        alert('Registration successful! Please login.');
        document.getElementById('registerForm').reset();
    } catch (error) {
        alert(error.message);
    }
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${API_URL}/users/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('loginUsername').value,
                password: document.getElementById('loginPassword').value
            })
        });
        
        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();
        token = data.access;
        localStorage.setItem('token', token);
        localStorage.setItem('username', document.getElementById('loginUsername').value);
        updateAuthState();
    } catch (error) {
        alert(error.message);
    }
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    token = null;
    localStorage.removeItem('token');
    updateAuthState();
});

// Create Post Handler
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Get the file input
    const imageFile = document.getElementById('postImage').files[0];
    const caption = document.getElementById('postCaption').value;
    
    if (imageFile) {
        formData.append('image', imageFile);
    }
    formData.append('caption', caption);
    
    try {
        const response = await fetch(`${API_URL}/api/posts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData  // Don't set Content-Type header when using FormData
        });
        
        if (!response.ok) throw new Error('Failed to create post');
        
        // Clear form and refresh posts
        document.getElementById('postForm').reset();
        fetchPosts();
    } catch (error) {
        alert(error.message);
    }
});

// Fetch and Display Posts
function displayPost(post) {
    return `
        <div class="post">
            ${post.image ? 
                `<img src="${API_URL}${post.image}" 
                     alt="Post image" 
                     style="max-width: 100%; height: auto;"
                     onerror="this.onerror=null; this.src='placeholder.jpg';"
                />` 
                : ''}
            <p>${post.caption}</p>
            <small>Posted by: ${post.user}</small>
            <!-- Rest of your post HTML -->
        </div>
    `;
}

async function fetchPosts() {
    try {
        const response = await fetch(`${API_URL}/api/posts/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const posts = await response.json();
        const container = document.getElementById('postsContainer');
        
        container.innerHTML = posts.map(post => `
            <div class="post">
                ${post.image ? `<img src="${post.image}" alt="Post image" style="max-width: 100%;">` : ''}
                <p>${post.caption}</p>
                <small>Posted by: ${post.user}</small>
                ${post.user === localStorage.getItem('username') ? 
                    `<button onclick="deletePost(${post.id})" class="delete-btn">Delete Post</button>` : 
                    ''}
                
                <!-- Comment Form -->
                <div class="comment-form">
                    <input type="text" placeholder="Add a comment" id="comment-${post.id}">
                    <button onclick="addComment(${post.id})">Comment</button>
                </div>
                
                <!-- Comments -->
                <div class="comments">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <p>${comment.text}</p>
                            <small>By: ${comment.user}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    } catch (error) {
        alert(error.message);
    }
}

// Add Comment
async function addComment(postId) {
    const text = document.getElementById(`comment-${postId}`).value;
    try {
        const response = await fetch(`${API_URL}/api/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: postId,
                text: text
            })
        });
        
        if (!response.ok) throw new Error('Failed to add comment');
        
        fetchPosts();
        document.getElementById(`comment-${postId}`).value = '';
    } catch (error) {
        alert(error.message);
    }
}

async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/posts/${postId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to delete post');
        
        // Refresh posts after deletion
        fetchPosts();
    } catch (error) {
        alert(error.message);
    }
}

// Initialize
updateAuthState();