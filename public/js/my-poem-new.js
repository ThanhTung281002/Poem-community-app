

// ================= 1. RENDER =================
function disableUI() {
  document.body.classList.add("pointer-events-none", "opacity-50");
}

function enableUI() {
  document.body.classList.remove("pointer-events-none", "opacity-50");
}




// ================= 2. API ====================
async function upload(title, content) {
    const res = await fetch("/api/my/poems", {
        method: "POST", 
        headers: {
            "content-Type": "application/json"
        }, 
        credentials: "include", 
        body: JSON.stringify({title, content})
    }); 

    const data = await res.json(); 

    if (!res.ok) {
        throw new Error(data.message); 
    }
}

async function fetchMe() {
    const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json(); 

    return data.user;
}


async function logout() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
    })

    const data = res.json(); 

    if (!res.ok) {
        throw new Error(data.message || "Failed to log out"); 
    }
}


// ================= 3. CONTROLLER ==============
async function handleUpload(title, content) {
    disableUI(); 

    try {
        await upload(title, content); 
        redirectToMyPoems(); 
    } catch(err) {
        alert(err.message); 
    }

    enableUI(); 
}

function validatePoem(title, content) {
    if (!title || !content) {
        alert("Vui lòng nhập đầy đủ nội dung"); 
    }
}

// phần redirect nằm trong lớp nào 
function redirectToMyPoems() {
    window.location.href = "/my-poems.html"; 
}

async function handleLogout() {
    try {
        await logout(); 

    } catch (err) {
        alert(err.message); 
    }
}



// ================= 4. EVENT HANDLER ============
document.getElementById("upload-button").addEventListener("click", async () => {
    const title = document.getElementById("new-title").value.trim(); 
    const content = document.getElementById("new-content").value.trim(); 

    if (validatePoem(title, content)) return; 

    await handleUpload(title, content); 
}); 


document.getElementById("logout-button").addEventListener("click", async () => {
    await handleLogout(); 
}); 




// ================= 5. INIT =================
(async () => {
    const user = await fetchMe(); 
    console.log("USER IS: ", user); 

    if (!user) {
        redirectToIndex(); 
    } else if (user.role === "admin") {
        redirectToAdmin(); 
    }

    await loadPoems(); 
})(); 
