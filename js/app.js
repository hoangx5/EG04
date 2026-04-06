// Dữ liệu phim (ví dụ)
const movies = [
    {
      title: "Avengers: Endgame",
      year: 2019,
      genres: ["Hành động", "Phiêu lưu"],
      poster: "images/avengers.jpg",
      director: "Anthony Russo",
      actors: "Robert Downey Jr., Chris Evans",
      description: "Sau những sự kiện tàn khốc của Avengers: Infinity War (2018), vũ trụ chìm trong đống đổ nát. Với sự giúp đỡ của các đồng minh còn lại, Avengers tập hợp lại một lần nữa để đảo ngược hành động của Thanos và khôi phục lại sự cân bằng cho vũ trụ."
    },
    {
      title: "Inception",
      year: 2010,
      genres: ["Hành động", "Khoa học viễn tưởng"],
      poster: "images/inception.jpg",
      director: "Christopher Nolan",
      actors: "Leonardo DiCaprio",
      description: "Một tên trộm đánh cắp bí mật của công ty thông qua việc sử dụng công nghệ chia sẻ giấc mơ được giao nhiệm vụ ngược lại là gieo một ý tưởng vào tâm trí của một CEO, nhưng quá khứ bi thảm của anh ta có thể khiến dự án và nhóm của anh ta gặp thảm họa."
    },
    {
        title: "The Shawshank Redemption",
        year: 1994,
        genres: ["Drama"],
        poster: "images/ShawshankRedemption.jpg",
        director: "Frank Darabont",
        cast: ["Tim Robbins", "Morgan Freeman"],
        description: "Một câu chuyện về hy vọng và tình bạn giữa hai người đàn ông bị giam trong Shawshank."
      },
      {
        title: "The Godfather",
        year: 1972,
        genres: ["Crime", "Drama"],
        poster: "images/gft.jpg",
        director: "Francis Ford Coppola",
        cast: ["Marlon Brando", "Al Pacino"],
        description: "Gia đình mafia Corleone và cuộc sống đầy quyền lực, âm mưu và phản bội."
      },
      {
        title: "The Dark Knight",
        year: 2008,
        genres: ["Action", "Crime", "Drama"],
        poster: "images/bat.jpg",
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger"],
        description: "Batman đối đầu với Joker, kẻ tạo ra hỗn loạn ở Gotham và thử thách đạo đức của mọi người."
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        genres: ["Crime", "Drama"],
        poster: "images/pp.jpg",
        director: "Quentin Tarantino",
        cast: ["John Travolta", "Samuel L. Jackson"],
        description: "Một loạt câu chuyện đan xen về tội phạm, tình yêu và những tình huống bất ngờ tại Los Angeles."
      },
      {
        title: "Forrest Gump",
        year: 1994,
        genres: ["Drama", "Romance"],
        poster: "images/Forrest_gump.jpg",
        director: "Robert Zemeckis",
        cast: ["Tom Hanks", "Robin Wright"],
        description: "Cuộc đời phi thường của Forrest Gump, một người đơn giản nhưng luôn gặp may mắn và trải nghiệm lịch sử nước Mỹ."
      },
      {
        title: "The Matrix",
        year: 1999,
        genres: ["Action", "Sci-Fi"],
        poster: "images/The_Matrix_Poster.jpg",
        director: "Lana Wachowski, Lilly Wachowski",
        cast: ["Keanu Reeves", "Laurence Fishburne"],
        description: "Neo khám phá thế giới thực sự bị điều khiển bởi máy móc và gia nhập cuộc kháng chiến chống lại chúng."
      },
      {
        title: "Fight Club",
        year: 1999,
        genres: ["Drama"],
        poster: "images/p.jpg",
        director: "David Fincher",
        cast: ["Brad Pitt", "Edward Norton"],
        description: "Một nhân viên văn phòng chán đời tạo ra câu lạc bộ đánh nhau dưới lòng đất, thay đổi cuộc sống của anh mãi mãi."
      },
      {
        title: "Interstellar",
        year: 2014,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        poster: "images/Interstellar_poster.jpg",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway"],
        description: "Nhóm nhà khoa học du hành qua các lỗ sâu để tìm kiếm hành tinh mới cứu nhân loại khỏi sự diệt vong."
      },
      {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
        genres: ["Adventure", "Drama", "Fantasy"],
        poster: "images/Lord_Rings_Fellowship_Ring.jpg",
        director: "Peter Jackson",
        cast: ["Elijah Wood", "Ian McKellen"],
        description: "Một hobbit cùng nhóm bạn phiêu lưu để hủy chiếc nhẫn quyền lực trước khi nó rơi vào tay Sauron."
      }
  ];
  
  const movieGrid = document.getElementById('movie-grid');
  const genreFiltersDiv = document.getElementById('genre-filters');
  const searchInput = document.getElementById('search');
  
  // ------------------ Hiển thị phim -------------------
  function renderMovies(filteredMovies) {
    movieGrid.innerHTML = '';
    filteredMovies.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img class = "poster-card"src="${movie.poster}" alt="${movie.title}">
        <div class="info">
          <h3>${movie.title}</h3>
          <p>${movie.year}</p>
        </div>
      `;
      card.addEventListener('click', () => openModal(movie));
      movieGrid.appendChild(card);
    });
  }
  
  // ------------------ Lấy danh sách thể loại -------------------
  const allGenres = [...new Set(movies.flatMap(movie => movie.genres))];
  allGenres.forEach(genre => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${genre}"> ${genre}`;
    genreFiltersDiv.appendChild(label);
  });
  
  // ------------------ Lọc phim -------------------
  function filterMovies() {
    const selectedGenres = Array.from(document.querySelectorAll('#genre-filters input:checked')).map(cb => cb.value);
    const keyword = searchInput.value.toLowerCase();
  
    const filtered = movies.filter(movie => {
      const matchGenre = selectedGenres.length === 0 || movie.genres.some(g => selectedGenres.includes(g));
      const matchKeyword = movie.title.toLowerCase().includes(keyword);
      return matchGenre && matchKeyword;
    });
  
    renderMovies(filtered);
  }
  
  // ------------------ Debounce tìm kiếm -------------------
  function debounce(fn, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    }
  }
  searchInput.addEventListener('input', debounce(filterMovies, 400));
  genreFiltersDiv.addEventListener('change', filterMovies);
  
  // ------------------ Modal -------------------
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  document.getElementById('modal-close').addEventListener('click', () => modal.style.display = 'none');
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        modal.style.display = 'none';
    }
    });

  function openModal(movie) {
    modalBody.innerHTML = `
      <h2>${movie.title} (${movie.year})</h2>

      <div class="movie-row">
      <div class = ".movie-poster-col">
      <img class ="movie-poster" src="${movie.poster}">
      </div>

        <div class = ".movie-info-col">
      <p><strong>Đạo diễn:</strong> ${movie.director}</p>
      <p><strong>Diễn viên:</strong> ${movie.actors}</p>
      <p>${movie.description}</p>
        </div>
    </div>
    `;
    modal.style.display = 'flex';
  }
  
  // ------------------ Light/Dark Mode -------------------

  const toggleButton = document.getElementById('toggle-dark');

  // Hàm bật/tắt Dark Mode và lưu vào localStorage
  function setDarkMode(isDark) {
      if(isDark){
          document.body.classList.add('dark-mode');
          toggleButton.textContent = 'Tắt Dark Mode';
      } else {
          document.body.classList.remove('dark-mode');
          toggleButton.textContent = 'Bật Dark Mode';
      }
      localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }
  
  // Khi load trang, kiểm tra localStorage
  document.addEventListener('DOMContentLoaded', () => {
      const darkMode = localStorage.getItem('darkMode');
      if(darkMode === 'true'){
          setDarkMode(true);
      } else {
          setDarkMode(false);
      }
  });
  
  // Xử lý click nút toggle
  toggleButton.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      setDarkMode(!isDark);
  });

  // ------------------ Khởi tạo -------------------
  renderMovies(movies);