document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("post-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        // Collect input values
        const title = document.querySelector(".post-title").value.trim();
        const content = document.querySelector(".post-textarea").value.trim();

        // Validate input values
        if (!title || !content) {
            alert("Title and content cannot be empty.");
            return;
        }

        try {
            const postData = {
                title,
                content
            };

            // Call the new function to create a post
            await createPost(postData);
            // Clear the form
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

            // Fetch and display all posts
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

            // Find and save the new post section
            const newPostSection = document.querySelector(".new-post");

            // Clear existing posts but keep the form section
            postsContainer.innerHTML = "";
            postsContainer.appendChild(newPostSection);

            // Add all posts to the container
            posts.forEach(post => {
                const postElement = document.createElement("section");
                postElement.classList.add("post", "mb-3");
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <hr>
                    <div class="post-actions mt-2">
                        <button class="action-btn btn-primary btn-sm">Like</button>
                        <button class="action-btn btn-primary btn-sm">Comment</button>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    // Initial fetch of all posts
    fetchAllPosts();
});