/*
 *1. Render songs
 *2. Scroll top
 *3. Play/ Pause/ Seek
 *4. CD rotate
 *5. Next/ Previous
 *6. Random
 *7. Next/ Repeat when ended
 *8. Active song
 *9. Scroll active song into view
 *10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");
const background = $("#bg-img"); // Hình nền
const dashboard = $(".dashboard"); // Khu vực hiển thị thông tin bài hát
const volume = $("#volume"); // Thanh điều chỉnh âm lượng
const volumeControl = $(".volume-control"); // Container thanh âm lượng
const volumeIcon = $(".volume-icon"); // Biểu tượng âm lượng
const searchInput = $("#search"); // Ô tìm kiếm
const darkModeToggle = $(".dark-mode-toggle"); // Nút chuyển chế độ tối
const favoritesToggle = $(".favorites-toggle"); // Nút hiển thị danh sách yêu thích
const optionIcon = $(".option-icon"); // Biểu tượng menu tùy chọn
const optionMenu = $(".option-menu"); // Menu tùy chọn
const uploadSong = $(".upload-song"); // Nút tải bài hát mới
const uploadAudioInput = $("#upload-audio-input"); // Input chọn file âm thanh
const uploadImageInput = $("#upload-image-input"); // Input chọn file hình ảnh
const uploadModal = $("#upload-modal"); // Modal hiển thị form tải bài hát
const songNameInput = $("#song-name"); // Ô nhập tên bài hát
const singerNameInput = $("#singer-name"); // Ô nhập tên ca sĩ
const uploadImageBtn = $("#upload-image-btn"); // Nút chọn hình ảnh
const previewImage = $("#preview-image"); // Hình ảnh xem trước
const saveSongBtn = $("#save-song-btn"); // Nút lưu bài hát mới
const cancelSongBtn = $("#cancel-song-btn"); // Nút hủy tải bài hát mới

const app = {
  currentIndex: 0, // Chỉ số bài hát hiện tại
  isPlaying: false, // Trạng thái đang phát nhạc
  isRandom: false, // Trạng thái phát ngẫu nhiên
  isRepeat: false, // Trạng thái lặp lại
  isShowingFavorites: false, // Trạng thái hiển thị danh sách yêu thích
  favorites: [], // Mảng chứa chỉ số các bài hát yêu thích
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Dancing in the dark",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song1.m4a",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Nếu ngày ấy",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song2.mp3",
      image: "./assets/img/song2.jpg",
    },
    {
      name: "Sunset in the city",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song3.m4a",
      image: "./assets/img/song3.jpg",
    },
    {
      name: "Sẽ quên em nhanh thôi",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song4.m4a",
      image: "./assets/img/song4.jpg",
    },
    {
      name: "Giá như",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song5.mp3",
      image: "./assets/img/song5.jpg",
    },
    {
      name: "Ai mà biết được",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song6.m4a",
      image: "./assets/img/song6.jpg",
    },
    {
      name: "Phía sau một cô gái",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      name: "Heyy",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song8.m4a",
      image: "./assets/img/song8.jpg",
    },
    {
      name: "Xin đừng lặng im",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song9.mp3",
      image: "./assets/img/song9.jpg",
    },
    {
      name: "Anh đã quen với cô đơn",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/song10.mp3",
      image: "./assets/img/song10.jpg",
    },
    {
      name: "Đừng làm trái tim anh đau",
      singer: "Sơn Tùng MTP",
      path: "./assets/music/1.mp3",
      image: "./assets/img/1.jpg",
    },
    {
      name: "Khổng tú cầu",
      singer: "Tony Nguyễn",
      path: "./assets/music/2.mp3",
      image: "./assets/img/2.jpg",
    },
    {
      name: "Anh thôi nhân nhượng",
      singer: "Tony Nguyễn",
      path: "./assets/music/3.mp3",
      image: "./assets/img/3.jpg",
    },
    {
      name: "Bồ công anh",
      singer: "Phong Max",
      path: "./assets/music/4.mp3",
      image: "./assets/img/4.jpg",
    },
    {
      name: "Dù cho tận thế",
      singer: "Erik",
      path: "./assets/music/5.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Nỗi nhớ vô hạn",
      singer: "Thanh Hưng",
      path: "./assets/music/6.mp3",
      image: "./assets/img/6.jpg",
    },
    {
      name: "Từng là ",
      singer: "Vũ Cát Tường",
      path: "./assets/music/7.mp3",
      image: "./assets/img/7.jpg",
    },
    {
      name: "Shape of you",
      singer: "Ed Sheeran",
      path: "./assets/music/8.mp3",
      image: "./assets/img/8.jpg",
    },
    {
      name: "Memories",
      singer: "Maroon 5",
      path: "./assets/music/9.mp3",
      image: "./assets/img/9.jpg",
    },
    {
      name: "Yourman",
      singer: "The Weeknd",
      path: "./assets/music/10.mp3",
      image: "./assets/img/10.jpg",
    },
  ],

  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  //!1. Render songs
  render: function (songs = this.songs) {
    const displaySongs = this.isShowingFavorites
      ? this.songs.filter((_, index) => this.favorites.includes(index)) // Lọc bài hát yêu thích nếu bật chế độ
      : songs; // Hiển thị tất cả nếu không
    const htmls = displaySongs.map((song) => {
      const originalIndex = this.songs.findIndex(
        (s) => s.name === song.name && s.singer === song.singer
      ); // Tìm chỉ số gốc của bài hát
      const isFavorited = this.favorites.includes(originalIndex); // Kiểm tra bài hát có trong danh sách yêu thích không

      return `<div class="song ${
        originalIndex === this.currentIndex ? "active" : ""
      }" data-index="${originalIndex}">
                        <div class="thumb" style="background-image: url('${
                          song.image
                        }')"></div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="btn-favorite ${
                          isFavorited ? "active" : ""
                        }" data-index="${originalIndex}">
                            ${
                              isFavorited
                                ? '<i class="fas fa-heart"></i>'
                                : '<i class="far fa-heart"></i>'
                            } <!-- Biểu tượng yêu thích -->
                        </div>
                        <div class="btn-delete" data-index="${originalIndex}">
                            <i class="fas fa-trash"></i> <!-- Biểu tượng xóa -->
                        </div>
                    </div>`;
    });
    playList.innerHTML = htmls.join("");
  },

  //! Lấy ra bài hát đầu tiên trong mảng - object
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  //! Phần xử lý chức năng khi tao tác nhấn bất kì
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    //! Xử lý CD quay / dừng
    //! Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    //! Xử lý phóng to / thu nhỏ CD
    //! Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      let marginTop = dashboard.style.marginTop;
      if (newCdWidth > 0) {
        marginTop = 20 + "px"; // Đặt margin khi CD còn hiển thị
      } else {
        marginTop = 0 + "px"; // Ẩn CD khi cuộn quá xa
      }
      dashboard.style.marginTop = marginTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0; // Thay đổi kích thước CD
      cd.style.opacity = newCdWidth / cdWidth; // Thay đổi độ mờ
    };

    // !Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //? Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //? Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    //? Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // ?Xử lý khi tua song
    // ?Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // !Khi prev song
    // !When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //! Khi next song
    //! When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //! Xử lý bật / tắt random song
    //! Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    //! Xử lý phát lại một bài hát / song
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //! Xử lý next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    //! Lắng nghe hành vi click vào playlist
    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)"); // Chọn bài hát chưa active
      const favoriteBtn = e.target.closest(".btn-favorite"); // Nút yêu thích
      const deleteBtn = e.target.closest(".btn-delete"); // Nút xóa
      if (songNode && !favoriteBtn && !deleteBtn) {
        _this.currentIndex = Number(songNode.dataset.index); // Chuyển chỉ số bài hát
        _this.loadCurrentSong(); // Tải bài hát mới
        _this.render();
        audio.play();
      }
      if (favoriteBtn) {
        const index = Number(favoriteBtn.dataset.index);
        _this.toggleFavorite(index); // Thêm/xóa yêu thích
      }
      if (deleteBtn) {
        const index = Number(deleteBtn.dataset.index);
        _this.deleteSong(index); // Xóa bài hát
      }
    };

    //! Điều chỉnh âm lượng
    volume.oninput = function (e) {
      audio.volume = e.target.value / 100; // Thay đổi âm lượng
      _this.setConfig("volume", e.target.value); // Lưu cấu hình
    };

    //! Hiển thị/ẩn thanh âm lượng
    volumeIcon.onclick = function () {
      volumeControl.classList.toggle("active");
    };

    //! Tìm kiếm bài hát
    searchInput.oninput = function (e) {
      const searchValue = e.target.value.toLowerCase();
      const filteredSongs = _this.songs
        .map((song, index) => ({ ...song, originalIndex: index }))
        .filter(
          (song) =>
            song.name.toLowerCase().includes(searchValue) ||
            song.singer.toLowerCase().includes(searchValue)
        ); // Lọc bài hát theo tên hoặc ca sĩ
      _this.render(
        filteredSongs.map((song) => ({
          ...song,
          index: song.originalIndex,
        }))
      ); // Hiển thị danh sách lọc
    };

    // Chuyển đổi chế độ tối
    darkModeToggle.onclick = function () {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      _this.setConfig("isDark", isDark);
      darkModeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun" style="color: #fba524;"></i><span style="font-size: 14px; margin-left: 8px;">Light Mode</span>'
        : '<i class="fas fa-moon" style="color: #000;"></i><span style="font-size: 14px; margin-left: 8px;">Dark Mode</span>';
    };

    // Hiển thị danh sách yêu thích
    favoritesToggle.onclick = function () {
      _this.isShowingFavorites = !_this.isShowingFavorites;
      favoritesToggle.classList.toggle("active", _this.isShowingFavorites);
      _this.render();
    };

    // Hiển thị menu tùy chọn
    optionIcon.onclick = function () {
      optionMenu.classList.toggle("active");
    };

    // Tải bài hát mới
    uploadSong.onclick = function () {
      uploadAudioInput.click(); // Mở input chọn file âm thanh
    };

    let uploadedAudioFile = null; // Biến lưu file âm thanh tạm thời
    uploadAudioInput.onchange = function (e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("audio/")) {
        uploadedAudioFile = file;
        songNameInput.value = file.name.replace(/\.[^/.]+$/, ""); // Tự động điền tên file
        singerNameInput.value = "";
        previewImage.src = "https://via.placeholder.com/150"; // Hình mặc định
        uploadModal.style.display = "flex"; // Hiển thị modal
      } else {
        alert("Vui lòng chọn file âm thanh hợp lệ!");
      }
    };

    uploadImageBtn.onclick = function () {
      uploadImageInput.click(); // Mở input chọn hình ảnh
    };

    uploadImageInput.onchange = function (e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(file);
        previewImage.src = imageURL; // Xem trước hình ảnh
      } else {
        alert("Vui lòng chọn file hình ảnh hợp lệ!");
      }
    };

    saveSongBtn.onclick = function () {
      if (uploadedAudioFile) {
        const newSong = {
          name: songNameInput.value || "Unknown Song",
          singer: singerNameInput.value || "Unknown",
          path: URL.createObjectURL(uploadedAudioFile), // Tạo URL cho file âm thanh
          image: previewImage.src,
        };
        _this.songs.push(newSong); // Thêm bài hát mới vào danh sách
        _this.setConfig("songs", _this.songs); // Lưu cấu hình
        _this.render();
        uploadModal.style.display = "none"; // Ẩn modal
        uploadedAudioFile = null;
        uploadAudioInput.value = "";
        uploadImageInput.value = "";
      }
    };

    cancelSongBtn.onclick = function () {
      uploadModal.style.display = "none"; // Ẩn modal khi hủy
      uploadedAudioFile = null;
      uploadAudioInput.value = "";
      uploadImageInput.value = "";
    };
  },

  /*! PHẦN XỬ LÝ LOGIC */
  // !Tải lên song ở vị trị đầu tiên
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    background.src = this.currentSong.image;
    audio.src = this.currentSong.path;
  },

  //!
  LoadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  //! Prev song
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  //! Next song
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  //! Random Song
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  //! Scroll active song into view
  //! Cuộn bài hát đang hoạt động vào chế độ xem
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  },

  // Tải cấu hình từ localStorage
  loadConfig: function () {
    this.isRandom = this.config.isRandom || false;
    this.isRepeat = this.config.isRepeat || false;
    this.favorites = this.config.favorites || [];
    audio.volume = (this.config.volume || 50) / 100; // Mặc định âm lượng 50%
    volume.value = this.config.volume || 50;
    if (this.config.isDark) {
      document.body.classList.add("dark"); // Kích hoạt chế độ tối nếu đã lưu
      darkModeToggle.innerHTML =
        '<i class="fas fa-sun" style="color: #fba524;"></i><span style="font-size: 14px; margin-left: 8px;">Light Mode</span>';
    }
    if (this.config.songs) {
      this.songs = this.config.songs.map((song) => ({
        ...song,
        path: song.path.includes("blob:")
          ? song.path
          : `./assets/music/${song.path.split("/").pop()}`,
      })); // Khôi phục danh sách bài hát từ localStorage
    }
  },

  // Thêm/xóa bài hát khỏi danh sách yêu thích
  toggleFavorite: function (index) {
    const isFavorited = this.favorites.includes(index);
    if (isFavorited) {
      this.favorites = this.favorites.filter((id) => id !== index); // Xóa khỏi yêu thích
    } else {
      this.favorites.push(index); // Thêm vào yêu thích
    }
    this.setConfig("favorites", this.favorites);
    this.render();
  },

  // Xóa bài hát khỏi danh sách
  deleteSong: function (index) {
    if (confirm("Bạn có chắc muốn xóa bài hát này không?")) {
      this.songs.splice(index, 1); // Xóa bài hát tại chỉ số index
      this.favorites = this.favorites.filter((fav) => fav !== index); // Xóa khỏi yêu thích
      this.favorites = this.favorites.map((fav) =>
        fav > index ? fav - 1 : fav
      ); // Cập nhật chỉ số yêu thích
      if (this.currentIndex === index) {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0; // Điều chỉnh chỉ số hiện tại
        this.loadCurrentSong();
      } else if (this.currentIndex > index) {
        this.currentIndex--;
      }
      this.setConfig("songs", this.songs);
      this.setConfig("favorites", this.favorites);
      this.render();
    }
  },

  start: function () {
    //* Gán cấu hình từ config vào ứng dụng
    this.LoadConfig();

    //* Định nghĩa các thuộc tính cho object
    this.defineProperties();

    //* Lắng nghe / xử lý các sự kiện (Dom eventsevents)
    this.handleEvents();

    //* Tải thông tin bài hát đầu tiên vào UI - Uther Interface khi chạy ứng dụng
    this.loadCurrentSong();

    //* Render playlist bài hát
    this.render();

    // *Hiển thị trạng thái ban đầu của button repeat & random
    // *Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
