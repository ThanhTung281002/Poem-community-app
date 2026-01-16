console.log("FILE: loaded login.js")

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
    document.getElementById("submitBtn").disabled = true; 
}

function enableBtn() {
    document.getElementById("submitBtn").disabled = false; 
}

function enableUI() {
    state.disabled = false; 
    document.body.classList.remove("pointer-events-none", "opacity-50");
}



// let delay = 5000; // ms
async function login(username, password) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username, password})
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data; 
}

async function fetchMe() {
    const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json(); 

    return data.user;
}


// 1. thành phần mà sự kiện bắt nguồn 
document.getElementById("submitBtn").addEventListener("click", async () => {
    // 1. lấy thông tin 
    const username = document.getElementById("usernameInput").value.trim(); 
    const password = document.getElementById("passwordInput").value.trim(); 

    // 2. validate tối thiểu
    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin"); 
        return; 
    }

    // 3. nếu ok thì gửi (giả lập trước)
    disableUI(); 
    disableBtn(); 

    try {
        // 1. gửi giá trị login và để BE set cookie 
        await login(username, password); 

        // 2. hỏi BE tôi là ai? 
        const user = await fetchMe(); 

        if (!user) {
            throw new Error("Không xác định được người dùng"); 
        }


        // điều hướng theo role 
        if (user.role === "admin") {
            window.location.href = "/admin-poems.html";
        } else {
            window.location.href = "/my-poems.html";
        }
        

    } catch (err) {
        alert(err.message); 
        enableUI(); 
        enableBtn(); 
    }
}); 
