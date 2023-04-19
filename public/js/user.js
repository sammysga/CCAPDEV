document.addEventListener("DOMContentLoaded", () => {
    const editBtns = document.querySelectorAll(".edit");
    const deleteBtns = document.querySelectorAll(".delete");
    const editModal = document.getElementById("editModal");
    const deleteModal = document.getElementById("deleteModal");
    const closeBtns = document.querySelectorAll(".close");
    const saveEditBtn = document.getElementById("saveEdit");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
  
    let selectedPost = null;

    editBtns.forEach((btn) =>
        btn.addEventListener("click", (event) => {
            editModal.style.display = "block";
            selectedPost = event.target.closest(".posts");
            const postText = selectedPost.querySelector(".post_text").textContent;
            document.getElementById("editTextArea").value = postText;
        })
    );

    deleteBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            deleteModal.style.display = "block";
            selectedPost = event.target.closest(".posts");
        })
    );

    closeBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            editModal.style.display = "none";
            deleteModal.style.display = "none";
            })
            );
            
              saveEditBtn.addEventListener("click", () => {
                const newText = document.getElementById("editTextArea").value;
                selectedPost.querySelector(".post_text").textContent = newText;
                editModal.style.display = "none";
            });
            
            confirmDeleteBtn.addEventListener("click", () => {
                selectedPost.remove();
                deleteModal.style.display = "none";
            });
            
            window.addEventListener("click", (event) => {
                if (event.target == editModal) {
                    editModal.style.display = "none";
                }
                if (event.target == deleteModal) {
                    deleteModal.style.display = "none";
                }
            });
            });