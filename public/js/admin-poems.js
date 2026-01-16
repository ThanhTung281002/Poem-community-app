// =============== 0.5 DATA ===============
// let poemsServer = [
//     {
//         id: "p1",
//         title: "Tấm lòng và Yu", 
//         content: "Tấm lòng con là nam...",
//         status: "pending"
//     }, 
//     {
//         id: "p2",
//         title: "Tiêu đề", 
//         content: "Nội dung rút gọn...",
//         status: "pending"
//     },
//     {
//         id: "p3",
//         title: "Tiêu đề", 
//         content: "Nội dung rút gọn...",
//         status: "pending"
//     },
//     {
//         id: "p4",
//         title: "Tấm lòng và Yu", 
//         content: "Tấm lòng con là nam...",
//         status: "pending"
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
    loading: true, 
    disabled: false,
    selectedPoemId: null
}








// =============== 1. RENDER ============= sử dụng những hàm của DOM và xử lí giao diện thuần thôi 
const pendingContainer = document.getElementById("pending-poems"); console.log("DOM: pending container: ", pendingContainer); 


const approveModal = document.getElementById("approveModal"); console.log("DOM: MODAL: ", approveModal); 
const modalTitle = document.getElementById("poem-modal-title"); console.log("DOM: title: ", modalTitle); 
const modalContent = document.getElementById("poem-modal-content"); console.log("DOM: content: ", modalContent); 
function openApproveModal(poem) {
    modalTitle.textContent = poem.title; 
    modalContent.textContent = poem.content; 
    approveModal.showModal(); 
}

function closeApproveModal() {
    approveModal.close(); 
}

function createPendingCard(poem) {
    return `<div class="card bg-base-200 p-4" data-id=${poem._id}>
            <div class="card-body">
                <h2 class="card-title flex justify-center">
                    ${poem.title}
                    <span class="badge badge-secondary badge-xs"></span>
                </h2>
                <p class="flex justify-center">${poem.content}</p>
            </div>
        </div>`; 
}

// khởi tạo innerHTML trống rồi đọc từ mảng đầu vào và thêm thôi 
function renderPoems(poems) {
    pendingContainer.innerHTML = ""; 

    poems.forEach((poem) => {
        pendingContainer.innerHTML += createPendingCard(poem); 
    }); 
}


// ------- 1.2  CÁC THAO TÁC CHO STATE --------
const loading = document.getElementById("loading"); 
function showLoading() {
    state.loading = true; 
    loading.classList.remove("hidden"); 
    pendingContainer.classList.add("hidden"); 
}

function hideLoading() {
    state.loading = false; 
    loading.classList.add("hidden"); 
    pendingContainer.classList.remove("hidden"); 
}


function disableUI() {
    state.disabled = true; 
    document.body.classList.add("pointer-events-none", "opacity-50");
}

function enableUI() {
    state.disabled = false; 
    document.body.classList.remove("pointer-events-none", "opacity-50");
}





// =============== 2. API ===============
let delay = 3000; //ms
async function fetchPendingPoems() {
    // 1. fetch api get /api/admin/poems
    const res = await fetch("/api/admin/poems", {
        method: "GET",
        credentials: "include"
    }); 

    // 2. lẫy dữ liệu trả json
    const data = await res.json(); 

    // 3. kiểm tra lỗi 
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch pending poems"); 
    }

    // 4. return thơ pending
    return data.pendingPoems; 
}



async function deletePoem(id) {
    // 1. gọi api delete /api/admin/poems/:id 
    const res = await fetch(`/api/admin/poems/${id}`, {
        method: "DELETE",
        credentials: "include"
    }); 

    // 2. lấy dữ liệu res.json
    const data = await res.json(); 

    // 3. kiểm tra lỗi 
    if (!res.ok) {
        throw new Error(data.message || "Failed to delete poems"); 
    }
}

async function approvePoem(id) {
    // 1. gọi api put /api/admin/poems/:id 
    const res = await fetch(`/api/admin/poems/${id}`, {
        method: "PUT",
        credentials: "include"
    }); 

    // 2. lấy dữ liệu res.json
    const data = await res.json(); 

    // 3. kiểm tra lỗi 
    if (!res.ok) {
        throw new Error(data.message || "Failed to approve poem"); 
    }
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

async function fetchMe() {
    const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json(); 

    return data.user;
}






// =============== 3. CONTROLLER =============== // sử dụng hàm của render và api 
function displayApproveModal(poemId) {
    const poem = state.poems.find(p => p._id === poemId); 
    if (!poem) return; 

    state.selectedPoemId = poemId; 
    openApproveModal(poem); 
}


// chờ api xóa và api get và render lại 
async function handleDelete(poemId) {

    disableUI(); 
    try {
        await deletePoem(poemId); 
    } catch(err) {
        alert(err.message); 
    }
    enableUI(); 

    closeApproveModal(); 


    showLoading(); 
    try {
        const data = await fetchPendingPoems(); 
        state.poems = data; 
        renderPoems(data); 
    } catch (err) {
        alert(err.message); 
    }
    hideLoading(); 
    
    
}


// chờ api approve và api get và render lại 
async function handleApprove(poemId) {

    disableUI(); 
    try {
        await approvePoem(poemId); 
    } catch (err) {
        alert(err.message); 
    }
    enableUI(); 

    closeApproveModal(); 


    showLoading(); 
    try {
        const data = await fetchPendingPoems(); 
        state.poems = data; 
        renderPoems(data); 
    } catch (err) {
        alert(err.message); 
    }
    hideLoading(); 

}


// api get và lưu dữ liệu vào state và render ra 
async function loadPoems() {
    showLoading(); 

    try {
        const data = await fetchPendingPoems(); 
        state.poems = data; 
        renderPoems(data); 
    } catch (err) {
        alert(err.message); 
    }
    

    hideLoading(); 
}

async function handleLogout() {
    try {
        logout(); 
        redirectToIndex(); 
    } catch(err) {
        alert(err.message); 
    }
}

// 3.2 luồng của người dùng
function redirectToIndex() {
    window.location.href = "/index.html"; 
}







// ============== 4. EVENT HANDLER ==============
pendingContainer.addEventListener("click", (e) => {
    // tìm card 
    const card = e.target.closest(".card"); 
    if (!card) return; 

    // đọc id 
    const poemId = card.dataset.id; 

    // hiển thị approve modal 
    displayApproveModal(poemId); 
}); 


document.getElementById("deleteBtn").addEventListener("click", async () => {
    // xử lí xóa thôi và sử dụng biến toàn cục approvingPoemId
    await handleDelete(state.selectedPoemId); 
}); 



document.getElementById("approveBtn").addEventListener("click", async () => {
    // xử lí approve thôi với có một biến ngoài là approvingPoemId
    await handleApprove(state.selectedPoemId); 
}); 


document.getElementById("logout-button").addEventListener("click", async () => {
    // handle logout
    handleLogout(); 
}); 




// ============== 5. INIT =================
(async () => {
    await loadPoems(); 
})();


