// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const bars = document.querySelectorAll('.bar');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar Active on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('active');
          }
          
          window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
          });
      }
  });
});

// Untuk touch devices
document.querySelectorAll('.profesi-box').forEach(box => {
    let isExpanded = false;
    
    box.addEventListener('touchstart', function(e) {
        e.preventDefault();
        
        // Collapse all other boxes
        document.querySelectorAll('.profesi-box').forEach(otherBox => {
            if (otherBox !== this) {
                otherBox.style.width = '287px';
                otherBox.style.flexDirection = 'column';
                otherBox.querySelector('.profesi-content').style.flexDirection = 'column';
                otherBox.querySelector('.profesi-content').style.textAlign = 'center';
                otherBox.querySelector('.profesi-content').style.paddingLeft = '0';
                otherBox.querySelector('.profesi-icon').style.fontSize = '3rem';
                otherBox.querySelector('.profesi-icon').style.marginRight = '0';
                otherBox.querySelector('.profesi-icon').style.marginBottom = '20px';
            }
        });
        
        // Toggle this box
        if (!isExpanded) {
            this.style.width = '500px';
            this.querySelector('.profesi-content').style.flexDirection = 'row';
            this.querySelector('.profesi-content').style.textAlign = 'left';
            this.querySelector('.profesi-content').style.paddingLeft = '30px';
            this.querySelector('.profesi-icon').style.fontSize = '4rem';
            this.querySelector('.profesi-icon').style.marginRight = '30px';
            this.querySelector('.profesi-icon').style.marginBottom = '0';
            isExpanded = true;
            
            // Scroll ke box yang dipilih
            this.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        } else {
            this.style.width = '287px';
            this.querySelector('.profesi-content').style.flexDirection = 'column';
            this.querySelector('.profesi-content').style.textAlign = 'center';
            this.querySelector('.profesi-content').style.paddingLeft = '0';
            this.querySelector('.profesi-icon').style.fontSize = '3rem';
            this.querySelector('.profesi-icon').style.marginRight = '0';
            this.querySelector('.profesi-icon').style.marginBottom = '20px';
            isExpanded = false;
        }
    });
});

// Khusus untuk k3-box (penanganan spesial)
const k3Box = document.getElementById('k3-box');
if (k3Box) {
    const k3Avatar = k3Box.querySelector('.guru-avatar img');
    const k3Motto = k3Box.querySelector('.guru-motto').innerText;
    const k3Name = k3Box.querySelector('.guru-name').innerText;
    const k3Username = k3Box.querySelector('.guru-username').innerText;
    
    // Store original HTML for reverting on mouseout
    const k3OriginalHtml = k3Box.innerHTML;
    
    // Fungsi untuk menerapkan efek hover pada k3-box dengan format guru-box biasa
    const applyK3HoverEffect = () => {
        const avatarSrc = k3Avatar.getAttribute('src');
        k3Box.classList.remove('k3-box'); // Hapus class k3-box
        k3Box.classList.add('guru-box'); // Tambahkan class guru-box
        k3Box.classList.add('guru-box-hover');
        k3Box.style.backgroundImage = `url('${avatarSrc}')`;
        k3Box.innerHTML = `
            <div class="hover-content">
                <h3 class="guru-name">${k3Name}</h3>
                <p class="guru-username">${k3Username}</p>
                <p class="guru-motto-hover">${k3Motto}</p>
            </div>
        `;
    };
    
    // Fungsi untuk mengembalikan tampilan normal
    const removeK3HoverEffect = () => {
        k3Box.classList.remove('guru-box');
        k3Box.classList.remove('guru-box-hover');
        k3Box.classList.add('k3-box'); // Kembalikan class k3-box
        k3Box.style.backgroundImage = '';
        k3Box.innerHTML = k3OriginalHtml;
    };
    
    // Deteksi apakah perangkat mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
        // Pada perangkat mobile, langsung terapkan efek hover seperti guru-box biasa
        applyK3HoverEffect();
    } else {
        // Pada desktop, gunakan event mouseenter/mouseleave dengan format guru-box
        k3Box.addEventListener('mouseenter', applyK3HoverEffect);
        k3Box.addEventListener('mouseleave', removeK3HoverEffect);
    }
    
    // Tangani resize window - update efek berdasarkan ukuran layar baru
    window.addEventListener('resize', () => {
        const currentIsMobile = window.matchMedia("(max-width: 768px)").matches;
        
        if (currentIsMobile && !isMobile) {
            removeK3HoverEffect();
            applyK3HoverEffect();
        } else if (!currentIsMobile && isMobile) {
            removeK3HoverEffect();
        }
    });
}

// Add hover effect to regular guru boxes
document.querySelectorAll('.guru-box').forEach(box => {
    if (box.id === 'k3-box' || box.id === 'hover-example') return; // Skip the K3 box and example hover box
    
    const avatar = box.querySelector('.guru-avatar img');
    const motto = box.querySelector('.guru-motto').innerText;
    const name = box.querySelector('.guru-name').innerText;
    const username = box.querySelector('.guru-username').innerText;
    
    // Store original HTML for reverting on mouseout
    const originalHtml = box.innerHTML;
    
    // Fungsi untuk menerapkan efek hover
    const applyHoverEffect = () => {
        const avatarSrc = avatar ? avatar.getAttribute('src') : '/api/placeholder/400/320';
        box.classList.add('guru-box-hover');
        box.style.backgroundImage = `url('${avatarSrc}')`;
        box.innerHTML = `
            <div class="hover-content">
                <h3 class="guru-name">${name}</h3>
                <p class="guru-username">${username}</p>
                <p class="guru-motto-hover">${motto}</p>
            </div>
        `;
    };
    
    // Fungsi untuk mengembalikan tampilan normal
    const removeHoverEffect = () => {
        box.classList.remove('guru-box-hover');
        box.style.backgroundImage = '';
        box.innerHTML = originalHtml;
    };
    
    // Deteksi apakah perangkat mobile (lebar layar kurang dari 768px)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Pada perangkat mobile, langsung terapkan efek hover
        applyHoverEffect();
    } else {
        // Pada desktop, gunakan event mouseenter/mouseleave
        box.addEventListener('mouseenter', applyHoverEffect);
        box.addEventListener('mouseleave', removeHoverEffect);
    }
    
    // Tangani resize window - update efek berdasarkan ukuran layar baru
    window.addEventListener('resize', () => {
        const currentIsMobile = window.innerWidth <= 768;
        if (currentIsMobile && !isMobile) {
            applyHoverEffect();
        } else if (!currentIsMobile && isMobile) {
            removeHoverEffect();
        }
    });
});

// Add hover effect to regular guru boxes (versi perbaikan yang digabungkan)
document.querySelectorAll('.guru-box').forEach(box => {
    if (box.id === 'k3-box' || box.id === 'hover-example') return; // Skip the K3 box and example hover box
    
    const avatar = box.querySelector('.guru-avatar img');
    const motto = box.querySelector('.guru-motto').innerText;
    const name = box.querySelector('.guru-name').innerText;
    const username = box.querySelector('.guru-username').innerText;
    
    // Store original HTML for reverting on mouseout
    const originalHtml = box.innerHTML;
    
    // Fungsi untuk menerapkan efek hover
    const applyHoverEffect = () => {
        const avatarSrc = avatar ? avatar.getAttribute('src') : '/api/placeholder/400/320';
        box.classList.add('guru-box-hover');
        box.style.backgroundImage = `url('${avatarSrc}')`;
        box.innerHTML = `
            <div class="hover-content">
                <h3 class="guru-name">${name}</h3>
                <p class="guru-username">${username}</p>
                <p class="guru-motto-hover">${motto}</p>
            </div>
        `;
    };
    
    // Fungsi untuk mengembalikan tampilan normal
    const removeHoverEffect = () => {
        box.classList.remove('guru-box-hover');
        box.style.backgroundImage = '';
        box.innerHTML = originalHtml;
    };
    
    // Deteksi apakah perangkat mobile (lebar layar kurang dari 768px)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Pada perangkat mobile, langsung terapkan efek hover
        applyHoverEffect();
    } else {
        // Pada desktop, gunakan event mouseenter/mouseleave
        box.addEventListener('mouseenter', applyHoverEffect);
        box.addEventListener('mouseleave', removeHoverEffect);
    }
    
    // Tangani resize window - update efek berdasarkan ukuran layar baru
    window.addEventListener('resize', () => {
        const currentIsMobile = window.innerWidth <= 768;
        if (currentIsMobile && !isMobile) {
            applyHoverEffect();
        } else if (!currentIsMobile && isMobile) {
            removeHoverEffect();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('imageModal');
  const expandedImage = document.getElementById('expandedImage');
  const modalDescription = document.getElementById('modalDescription');
  const closeModal = document.querySelector('.close-modal');

  // Function to handle image expansion
  function expandImage(card) {
      const img = card.querySelector('img');
      const title = card.querySelector('.photo-title');
      const desc = card.querySelector('.photo-description');

      // Set modal content
      expandedImage.src = img.src;
      modalDescription.innerHTML = `<strong>${title.textContent}</strong><br>${desc.textContent}`;

      // Show modal
      modal.style.display = 'flex';
  }

  // Add unique data attributes to each photo card for custom expansion
  const photoCards = document.querySelectorAll('.photo-card');
  photoCards.forEach((card) => {
      // For desktop: expand button functionality
      const expandBtn = card.querySelector('.expand-btn');
      if (expandBtn) {
          expandBtn.addEventListener('click', function (e) {
              e.stopPropagation();
              expandImage(card);
          });
      }

      // For mobile: direct card click expansion
      card.addEventListener('click', function () {
          expandImage(this);
      });
  });

  // Close modal functionality
  closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
  });

  modal.addEventListener('click', function (e) {
      if (e.target === modal) {
          modal.style.display = 'none';
      }
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const scroller = document.getElementById("imageScroller");
    const dots = document.querySelectorAll(".dot");
    const cards = document.querySelectorAll(".image-card");

    function setActiveCard(index) {
      cards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      const card = cards[index];
      const containerWidth = scroller.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollPosition = card.offsetLeft - (containerWidth - cardWidth) / 2;
      scroller.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }

    let scrollTimeout;
    scroller.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerCenter = scroller.scrollLeft + scroller.offsetWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (!cards[closestIndex].classList.contains("active")) {
          setActiveCard(closestIndex);
        }
      }, 150);
    });

    setTimeout(() => {
      setActiveCard(0);
    }, 100);

    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        setActiveCard(index);
      });
    });

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeModal = document.getElementById("closeModal");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = parseInt(card.getAttribute("data-index"));
        setActiveCard(index);

        const img = card.querySelector("img").getAttribute("src");
        const title = card.getAttribute("data-title");
        const desc = card.getAttribute("data-desc");

        modalImg.src = img;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.style.display = "flex";
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });


  // Smooth Scrolling dengan offset dan easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('active');
          }
          
          // Hitung posisi target dengan offset navbar
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          // Gunakan requestAnimationFrame untuk animasi yang lebih smooth
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 800; // Durasi animasi dalam ms
          let startTime = null;
          
          function animation(currentTime) {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
          }
          
          // Fungsi easing untuk efek lebih natural
          function ease(t, b, c, d) {
              t /= d/2;
              if (t < 1) return c/2*t*t*t + b;
              t -= 2;
              return c/2*(t*t*t + 2) + b;
          }
          
          requestAnimationFrame(animation);
      }
  });
});

// Highlight navbar item saat scroll dengan debounce untuk performa
let isScrolling;
window.addEventListener('scroll', () => {
  // Clear timeout sebelumnya
  window.clearTimeout(isScrolling);
  
  // Set timeout untuk menunggu scroll selesai
  isScrolling = setTimeout(() => {
      let current = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          
          if (pageYOffset >= (sectionTop - navbarHeight - 100)) {
              current = section.getAttribute('id');
          }
      });
      
      navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${current}`) {
              item.classList.add('active');
          }
      });
  }, 100); // Debounce 100ms

  // Add this script to handle clicks
document.querySelectorAll('.member-box').forEach(box => {
  // Handle box click (change color)
  box.addEventListener('click', function() {
      this.classList.toggle('active');
  });
  
  // Handle Instagram icon click (prevent triggering box click)
  const igIcon = box.querySelector('.ig-icon');
  if (igIcon) {
      igIcon.addEventListener('click', function(e) {
          e.stopPropagation();
          const igUrl = box.getAttribute('data-ig');
          if (igUrl) {
              window.open(igUrl, '_blank');
          }
      });
  }
});
});

 const toggleBtn = document.querySelector('.toggle-btn');
        const description = document.querySelector('.description');
        const arrow = document.querySelector('.arrow');
        
        toggleBtn.addEventListener('click', function() {
            description.classList.toggle('open');
            arrow.classList.toggle('up');
        });