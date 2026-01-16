console.log("FILE: gallery.js loaded")
// ================= 0.5 DATA ==================
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
//         status: "approved"
//     },
//     {
//         id: "p6",
//         title: "Tình yêu thương Yu", 
//         content: "Hãy yêu thương Yu của bản thân mình...",
//         status: "approved"
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














// ================= 1. RENDER ==================
const galleryContainer = document.getElementById("gallery"); console.log("DOM: gallery: ", galleryContainer); 
function createApprovedCard(poem) {
    return `<div class="card bg-base-100 p-4" data-id=${poem.id}>
            <div class="card-body">
                <h2 class="card-title flex justify-center">
                    ${poem.title}
                </h2>
                <p class="flex justify-center">${poem.content}</p>
            </div>
        </div>`; 
}

// khởi tạo innerHTML trống rồi đọc từ mảng đầu vào và thêm thôi 
function renderPoems(poems) {
    galleryContainer.innerHTML = ""; 

    poems.forEach((poem) => {
        galleryContainer.innerHTML += createApprovedCard(poem); 
    }); 
}

function exploreGallery() {
    galleryContainer.scrollIntoView({
        behavior: "smooth"
    }); 
}



// ------- 1.2  CÁC THAO TÁC CHO STATE --------
const loading = document.getElementById("loading"); 
function showLoading() {
    state.loading = true; 
    loading.classList.remove("hidden"); 
    galleryContainer.classList.add("hidden"); 
}

function hideLoading() {
    state.loading = false; 
    loading.classList.add("hidden"); 
    galleryContainer.classList.remove("hidden"); 
}


// ----- 1.3 CÁC THAO TÁC VỚI MODAL -----------
const poemModal = document.getElementById("poemModal"); 
const modalTitle = document.getElementById("poem-modal-title"); 
const modalContent = document.getElementById("poem-modal-content"); 

function openPoemModal(poem) {
    modalTitle.textContent = poem.title; 
    modalContent.textContent = poem.content; 
    poemModal.showModal(); 
}

function closePoemModal() {
    poemModal.close(); 
}


// ================= 2. FAKE API ==================
let delay = 3000; //ms
async function fetchApprovedPoems() {
    const res = await fetch("/api/gallery/poems", {
        method: "GET",
        credentials: "include" // DÀNH CHO SESSION/COOKIE
    }); 

    if (!res.ok) {
        // console.log("lỗi fetch api"); 
        throw new Error("Failed to fetch poems"); 
    }

    const data = await res.json(); 
    return data.poems; 
}






// ================= 3. CONTROLLER ==================
// api get và lưu dữ liệu vào state và render ra 
async function loadPoems() {
    showLoading(); 
    console.log("Bắt đầu fake Fetch"); 
    const data = await fetchApprovedPoems(); 
    console.log("Xong fake fetch"); 
    state.poems = data; 

    hideLoading(); 
    renderPoems(data); 
}


// tìm trong state.poems có thơ thuộc id đó không? Nếu có thì mở modal theo poem đó 
function displayPoemModal(id) {
    state.selectedPoemId = id; 
    const poem = state.poems.find(p => p.id === id); 
    if (!poem) return; 

    openPoemModal(poem); 
}











// ================= 4. EVENT HANDLER ==================
document.getElementById("exploreBtn").addEventListener("click", (e) => {
    e.preventDefault(); 

    exploreGallery(); 
}); 


// click vào card nào thì mở modal nội dung card đó 
galleryContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return; 

    displayPoemModal(card.dataset.id); 
}); 

// nếu click thì đóng poemModal thôi 
document.getElementById("closeBtn").addEventListener("click", () => {
    closePoemModal(); 
}); 










// ================= 5. INIT ==================
(async () => {
    await loadPoems(); 
})();


