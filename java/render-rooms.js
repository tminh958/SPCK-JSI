// lây ra id của thẻ chứa
const roomsContainer = document.getElementById("rooms-container");
// lấy ra danh sách từ localStorage
const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
// duyệt qua từng món và tạo thẻ HTML tương ứng
let html = `
 <a href="add-room.html" class="swiper-slide">
                        <div class="h-[150px] shadow-md rounded-md overflow-hidden hover:opacity-50 duration-200 w-full text-center border">
                            <p class="text-8xl">+</p>
                            <p>Add more room</p>
                        </div>
                    </a>`;

rooms.forEach((room) => {
    html += `
     <a href="detail-room.html?${room.id}" class="swiper-slide shadow-md rounded-md overflow-hidden hover:opacity-50 duration-200">
                        <div class="h-[150px] w-full overflow-hidden">
                            <img
                                src="${room.image}"
                                alt=""
                                class="mb-2 h-full w-full"
                            />
                        </div>
                        <h2 class="font-bold text-xl ml-2">${room.name}</h2>
                        <p class="text-sm ml-4 line-clamp-1">${room.location}</p>
                        <p class="text-sm ml-4">${room.person}</p>
                        <p class="mt-15 text-right font-bold mr-2">${room.price}VND/Night</p>
                    </a>
    `;
});
// chèn các thẻ HTML vào trong thẻ chứa
roomsContainer.innerHTML = html;
