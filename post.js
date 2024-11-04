document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("post-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = document.querySelector(".post-title").value.trim();
        const content = document.querySelector(".post-textarea").value.trim();

        if (!title || !content) {
            alert("Title and content cannot be empty.");
            return;
        }

        try {
            const postData = { title, content };
            await createPost(postData);
            document.querySelector(".post-title").value = "";
            document.querySelector(".post-textarea").value = "";
            alert("Post created successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the post.");
        }
    });

    async function createPost(postData) {
        try {
            const postResponse = await fetch("https://67234feb493fac3cf24a6777.mockapi.io/api/v1/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });

            if (!postResponse.ok) {
                throw new Error("Failed to create new post.");
            }

            fetchAllPosts();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("An error occurred while creating the post.");
        }
    }

    async function fetchAllPosts() {
        try {
            const response = await fetch("https://67234feb493fac3cf24a6777.mockapi.io/api/v1/posts");
            if (!response.ok) {
                throw new Error("Failed to fetch posts.");
            }

            const posts = await response.json();
            const postsContainer = document.querySelector(".content");
            const newPostSection = document.querySelector(".new-post");
            postsContainer.innerHTML = "";
            postsContainer.appendChild(newPostSection);

            posts.forEach(post => {
                const postElement = document.createElement("section");
                postElement.classList.add("post", "mb-3");
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <hr>
                    <div class="post-actions mt-2">
                        <button class="action-btn btn-primary btn-sm" onclick="toggleCommentSection(${post.id})">Comment</button>
                    </div>
                    <div class="comment-section" id="comments-${post.id}" style="display: none;">
                        <textarea class="comment-textarea form-control mb-2" placeholder="Write a comment..."></textarea>
                        <button class="post-comment btn btn-primary btn-sm" onclick="postComment(${post.id})">Post Comment</button>
                        <div class="comments-list"></div>
                    </div>
                `;
                postsContainer.appendChild(postElement);

                fetchComments(post.id); // Загрузка комментариев для каждого поста
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    window.toggleCommentSection = function(postId) {
        const commentSection = document.getElementById(`comments-${postId}`);
        commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    };

    window.postComment = async function(postId) {
        const commentText = document.querySelector(`#comments-${postId} .comment-textarea`).value.trim();
    
        if (!commentText) {
            alert("Comment cannot be empty.");
            return;
        }
    
        try {
            const commentData = { text: commentText };
    
            const response = await fetch(`https://67234feb493fac3cf24a6777.mockapi.io/api/v1/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to post comment.");
            }
    
            document.querySelector(`#comments-${postId} .comment-textarea`).value = "";
            fetchComments(postId); // Обновить комментарии
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("An error occurred while posting the comment.");
        }
    };
    

    async function fetchComments(postId) {
        try {
            const response = await fetch(`https://67234feb493fac3cf24a6777.mockapi.io/api/v1/posts/${postId}/comments`);
            if (!response.ok) {
                throw new Error("Failed to fetch comments.");
            }

            const comments = await response.json();
            const commentsList = document.querySelector(`#comments-${postId} .comments-list`);
            commentsList.innerHTML = "";

            comments.forEach(comment => {
                const commentElement = document.createElement("p");
                commentElement.textContent = comment.text;
                commentsList.appendChild(commentElement);
            });
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    fetchAllPosts();
});
