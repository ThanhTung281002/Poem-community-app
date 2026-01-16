
const state = {
    poems: [],
    loading: true, 
    disabled: false,
    selectedPoemId: null
}



function disableUI() {
    state.disabled = true; 
    document.body.classList.add("pointer-events-none", "opacity-50");
}

function disableBtn() {
    document.getElementById("submitButton").disabled = true; 
}


function enableUI() {
    state.disabled = false; 
    document.body.classList.remove("pointer-events-none", "opacity-50");
}



// ============== 2. API ================= 
async function register(username, password) {
    console.log("username, password", {username, password}); 

    // 1. gọi api post register 
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username, password})
    }); 

    // 2. lấy res.json
    const data = await res.json(); 

    // 3. kiểm tra lỗi 
    if (!res.ok) {
        throw new Error(data.message || "Failed to register"); 
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




// ============ 3. CONTROLLER 
function redirectToUser() {
    window.location.href = "/index.html"; 
}

async function handleRegister(username, password) {
    disableBtn(); 
    disableUI(); 
    try {
        await register(username, password); 
        redirectToIndex(); 
    } catch (err) {
        alert(err.message); 
    }
    enableUI(); 
}



// hành vi click ở nút gửi nút submitButton
document.getElementById("submitButton").addEventListener("click", async () => {
    // 1. lấy các thông tin ở input
    const fullName = document.getElementById("fullNameInput").value.trim(); 
    const username = document.getElementById("usernameInput").value.trim(); 
    const password = document.getElementById("passwordInput").value.trim(); 

    // 2. check cơ bản 
    if (!fullName || !username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin"); 
        return; 
    }


    // 3. nếu ok, gửi (giả lập)
    handleRegister(username, password); 


}); 

// =============== 5. INIT ================

(async () => {
    // kiểm tra role, nếu là admin hoặc user thì redirect 
    const user = await fetchMe(); 

    if (user) {
        if (user.role === "admin") {
            redirectToAdmin(); 
        } else if (user.role === "user") {
            redirectToUser(); 
        }
    }
    
})(); 