// ============ 0.5 DATA ==============
// let poemsServer = [
//     {
//         id: "p1",
//         title: "Tấm lòng và Yu", 
//         content: "Tấm lòng con là nam...",
//         status: "approved"
//     }, 
//     {
//         id: "p2",
//         title: "Tiêu đề", 
//         content: "Nội dung rút gọn...",
//         status: "approved"
//     },
//     {
//         id: "p3",
//         title: "Tiêu đề", 
//         content: "Nội dung rút gọn...",
//         status: "approved"
//     },
//     {
//         id: "p4",
//         title: "Tấm lòng và Yu", 
//         content: "Tấm lòng con là nam...",
//         status: "approved"
//     },
//     {
//         id: "p5",
//         title: "Tình yêu thương Yu", 
//         content: "Hãy yêu thương Yu của bản thân mình...",
//         status: "pending"
//     },
//     {
//         id: "p6",
//         title: "Tình yêu thương Yu", 
//         content: "Hãy yêu thương Yu của bản thân mình...",
//         status: "pending"
//     },
//     {
//         id: "p7",
//         title: "Tình yêu thương Yu", 
//         content: "Hãy yêu thương Yu của bản thân mình...",
//         status: "pending"
//     }
// ]; 


const state = {
    poems: [],
    selectedPoemId: null
} 







// ============= 1. RENDER ============
// --- 1.1 STATE ----
function disableUI() {
  document.body.classList.add("pointer-events-none", "opacity-50");
}

function enableUI() {
  document.body.classList.remove("pointer-events-none", "opacity-50");
}


const loading = document.getElementById("loading"); 
function showLoading() {
    loading.classList.remove("hidden"); 
    pendingContainer.classList.add("hidden"); 
    approvedContainer.classList.add("hidden"); 
}

function hideLoading() {
    loading.classList.add("hidden"); 
    pendingContainer.classList.remove("hidden"); 
    approvedContainer.classList.remove("hidden"); 
}


// --- 1.2 RENDER ---- 
function createApprovedPoemCard(poem) {
    return `<div class="card p-4 bg-base-200" data-id="${poem._id}" data-status="approved">
            <div class="card-body">
                <h2 class="card-title flex justify-center">
                    ${poem.title}
                    <span class="badge badge-warning badge-xs"></span>
                </h2>
            </div>

            <p class="flex justify-center whitespace-pre-line">${poem.content}</p>
        </div>`
}


function createPendingPoemCard(poem) {
    return `<div class="card bg-base-100 px-10" data-poem-id="${poem._id}" data-status="pending">
            <div class="card-body">
                <h2 class="card-title flex justify-center">
                    ${poem.title}
                    <span class="badge badge-secondary badge-xs"></span>
                </h2>
            </div>  

            <p class="flex justify-center whitespace-pre-line">${poem.content}</p> 

            <div class="card-action flex flex-cols p-2 gap-2">
                <button class="btn btn-ghost flex-1" data-action="delete" data-id="${poem._id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    xóa
                </button>
                <button class="btn btn-ghost flex-1" data-action="edit" data-id="${poem._id}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    chỉnh sửa
                </button>
            </div>
        </div>`; 
}


const approvedContainer = document.querySelector(".approved-poems");
const pendingContainer = document.querySelector(".pending-poems");

function renderPoems(poems) {
    // khởi tạo innerHTML 
    approvedContainer.innerHTML = ""; 
    pendingContainer.innerHTML = ""; 


    poems.forEach((poem) => {
        if (poem.status === "approved") {
            // them vao 
            approvedContainer.innerHTML += createApprovedPoemCard(poem); 
        }

        if (poem.status === "pending") {
            pendingContainer.innerHTML += createPendingPoemCard(poem); 
        }
    }); 
}









// --- 1.3 MODAL RENDER ---- 
const poemModal = document.getElementById("poemModal");
const poemModalTitle = document.getElementById("poem-modal-title"); //console.log("DOM, MODAL TITLE: ", poemModalTitle); 
const poemModalContent = document.getElementById("poem-modal-content"); //console.log("DOM, MODAL CONTENT: ", poemModalContent); 
const closeModalBtn = document.getElementById("closeModalBtn");

function openPoemModal(poem) {
    poemModalTitle.textContent = poem.title; 
    poemModalContent.textContent = poem.content; 
    poemModal.showModal(); 
}


const editModal = document.getElementById("editPoemModal");// console.log(editModal); 
const editTitle = document.getElementById("edit-title"); //console.log(editTitle); 
const editContent = document.getElementById("edit-content"); //console.log(editContent); 
const cancelEditBtn = document.getElementById("cancelEditBtn");// console.log(cancelEditBtn); 
const saveEditBtn = document.getElementById("saveEditBtn"); //console.log(saveEditBtn); 

let editingPoemId = null; 

function openEditModal(poem) {
    editingPoemId = poem.id; 
    editTitle.value = poem.title; 
    editContent.value = poem.content; 
    editModal.showModal(); 
}










// ============= 2. API ==============
// let delay = 3000; // ms
async function fetchPoems() {
    // ở đây viết code để gọi api get /api/my/poems 
    // 1. gọi api 
    const res = await fetch("/api/my/poems", {
        method: "GET",
        credentials: "include" // DÀNH CHO SESSION/COOKIES 
    });

     // 3. lấy data 
    const data = await res.json(); 

    // 2. kiểm tra 
    if (!res.ok) {
        throw new Error(data.message); 
    }

    // 4. return
    return data.poems; 
}

async function deletePoem(poemId) {
    console.log("poem id is: ", poemId); 

    // 1. gọi api 
    const res = await fetch(`/api/my/poems/${poemId}`, {
        method: "DELETE",
        credentials: "include"
    }); 

    
    // 2. kiểm tra lỗi
    if (!res.ok) {
        throw new Error("Failed to delete poem"); 
    }
}

async function editPoem(poemId, {title, content}) {
    console.log("Vào api put /api/my/poems");
    console.log("poem id is: ", poemId); 

    // 1. gọi api 
    const res = await fetch(`/api/my/poems/${poemId}`, {
        method: "PUT",
        headers: {
            "content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({title, content})
    })

    // 2. kiểm tra lỗi 
    if (!res.ok) {
        throw new Error("Failed to edit poems"); 
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

    if (!res.ok) {
        throw new Error(res.message); 
    }
}















// ============= 3. CONTROLLER ============ mình nghĩ đây là phần trọng tâm logic của phần viết UI động còn lại chỉ là các lớp bổ sung 
async function handleDelete(poemId) {
    console.log("poem id is: ", poemId); 

    disableUI(); 
    try {
        await deletePoem(poemId); 
    } catch(err) {
        alert(err.message); 
    }
    enableUI(); 


    showLoading(); 
    try {
        const data = await fetchPoems(); 
        state.poems = data; 
        renderPoems(data); 
    } catch(err) {
        alert(err.message); 
    }
    hideLoading(); 
    
}

async function loadPoems() {

    showLoading(); 
    try {
        // xài như thường trong này
        // lấy dữ liệu và chờ một chút 
        const data = await fetchPoems(); 
        state.poems = data; 
        renderPoems(data); 
    } catch (err) {
        alert(err.message); 
    }
    hideLoading(); 

}

// khi ấn nút edit 
function handleEdit(id) {
    const poem = state.poems.find(p => p._id === id); 
    if (!poem) return; 
    state.selectedPoemId = id; 

    openEditModal(poem); 
}

async function handleSaveEdit(poemId, {title, content}) {
    // hiển thị trạng thái đang chờ 
    // làm mọi UI không thể có sự kiện click được 

    disableUI(); 
    // nếu edit được thì ok thôi còn các hiển thị kia chỉ là trung gian giữa bước thôi
    try {
        await editPoem(poemId, {title, content}); 
    } catch(err) {
        alert(err.message);         
    }
    editModal.close(); 
    enableUI(); 



    showLoading(); 
    try {
        const data = await fetchPoems(); 
        state.poems = data; 
        renderPoems(data); 
    } catch (err) {
        alert(err.message); 
    }
    hideLoading(); 
    
}


async function handleCancelEdit() {
    editModal.close(); 
}

function displayPoem(id) {
    // tìm trong id, nếu có thì render ra modal còn không thì thôi 
    console.log("id là: ", id); 
    console.log("Vào display poems"); 
    console.log("state.poems is: ", state.poems); 
    const poem = state.poems.find(p => p._id === id); console.log("poem is: ", poem); 
    if (!poem) return; 

    openPoemModal(poem); 
}

async function handleLogout() {
    // handle logout 
    try {
        await logout(); 
        redirectToIndex(); 
    } catch (err) {
        alert(err.message); 
    }
}



// sẽ có một lớp cho redirect nữa 
function redirectToIndex() {
    window.location.href = "/index.html"; 
}

function redirectToAdmin() {
    window.location.href = "/admin-poems.html"; 
}













// ============= 4. EVENT HANDLER ============
// -------- 4.1 Hành vi xem thơ approved ----
approvedContainer.addEventListener("click", (e) => {
    console.log("vào approved container"); 
    // tìm card gần nhất lúc click 
    const card = e.target.closest(".card"); 
    // kiểm tra card
    if (!card) {return;}

    // poem id từ html 
    const poemId = card.dataset.id; console.log("id từ card là: ", poemId); 

    displayPoem(poemId); 
}); 

closeModalBtn.addEventListener("click", () => {
    poemModal.close(); 
}); 




// --------- 4.2 Hành vì xóa hoặc chỉnh sửa thơ pending -----------
pendingContainer.addEventListener("click", async (e) => {
    console.log("EVENT: nhấn nút");

    // tìm nút 
    const btn = e.target.closest("button"); 
    if (!btn) return; 

    // chỉnh sửa hoẵc xóa tùy theo nút
    if (btn.dataset.action === "delete") {
        handleDelete(btn.dataset.id); 
    } else if (btn.dataset.action === "edit") {
        handleEdit(btn.dataset.id); 
    }
}); 


// 4.3 hành vi lưu hoặc hủy bản chỉnh sửa thơ pending
cancelEditBtn.addEventListener("click", () => {
    handleCancelEdit(); 
}); 


saveEditBtn.addEventListener("click", () => {
    // lấy dữ liệu từ các chỗ đã nhập vào
    const editedTitle = editTitle.value.trim(); 
    const editedContent = editContent.value.trim(); 

    if (!editedTitle || !editedContent) {
        alert("Vui lòng nhập đúng đầy đủ nội dung"); 
    }

    handleSaveEdit(state.selectedPoemId, {title: editedTitle, content: editedContent}); 
}); 


document.getElementById("logoutBtn").addEventListener("click", async () => {
    // 1. logout thôi 
    handleLogout(); 
}); 











// ============= 5. INIT ================
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
