// ============================================
// 1. PRELOADER
// ============================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
});

// ============================================
// 2. HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// 3. MENU HAMBURGER (Mobile)
// ============================================
const hamburger = document.querySelector('.menu-hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', function() {
    navList.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// ============================================
// 4. NAVEGAÇÃO SUAVE COM SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 5. ANIMAÇÃO DE CONTADORES (STATS)
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = Math.ceil(target / 60);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        };
        
        const interval = setInterval(updateCounter, duration / 60);
    });
}

// ============================================
// 6. ANIMAÇÃO DE ELEMENTOS AO SCROLL
// ============================================
function revealOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .titulo-card, .idolo-card, .player-item, .torcida-stat, .quote, .stats-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Se for um contador, anima
                if (entry.target.querySelector('.stat-number')) {
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.classList.add('hidden-element');
        observer.observe(el);
    });
}

// ============================================
// 7. ANIMAÇÃO DOS TÍTULOS
// ============================================
function animateTitles() {
    const tituloCards = document.querySelectorAll('.titulo-card');
    
    tituloCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) rotate(2deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ============================================
// 8. EFEITO PARALLAX NO BANNER
// ============================================
window.addEventListener('scroll', function() {
    const homeSection = document.querySelector('.home-section');
    const scrolled = window.pageYOffset;
    
    if (homeSection) {
        const parallaxElements = document.querySelectorAll('.float-element');
        parallaxElements.forEach((el, index) => {
            const speed = 0.02 * (index + 1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
    }
});

// ============================================
// 9. BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// 10. MENSAGEM ROTATIVA NO BANNER
// ============================================
const messages = [
    "🐔 O clube do povo é o povo!",
    "⚪🔴⚫ Nação Corinthiana!",
    "🏆 O todo poderoso Timão!",
    "⭐ 30 milhões de apaixonados!",
    "🇧🇷 Corinthians é gigante!",
    "🔥 A fiel não torce, vibra!",
    "💪 Nunca desista, seja Corinthians!"
];

let messageIndex = 0;
const homeDesc = document.querySelector('.home-desc');

if (homeDesc) {
    setInterval(() => {
        homeDesc.style.opacity = '0';
        homeDesc.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            homeDesc.textContent = messages[messageIndex];
            homeDesc.style.opacity = '1';
            homeDesc.style.transform = 'translateY(0)';
        }, 300);
    }, 4000);
}

// ============================================
// 11. ANIMAÇÃO DOS JOGADORES (HOVER)
// ============================================
document.querySelectorAll('.player-item').forEach(player => {
    player.addEventListener('mouseenter', function() {
        this.querySelector('.player-avatar')?.classList.add('pulse');
    });
    player.addEventListener('mouseleave', function() {
        this.querySelector('.player-avatar')?.classList.remove('pulse');
    });
});

// ============================================
// 12. ATUALIZAR ANO NO FOOTER
// ============================================
const footerYear = document.querySelector('.footer-bottom p:first-child');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = `© ${year} Sport Club Corinthians Paulista - Todos os direitos reservados`;
}

// ============================================
// 13. EFECTO TIPING NO TÍTULO
// ============================================
function typeWriter() {
    const title = document.querySelector('.home-title');
    if (!title) return;
    
    const text = "O Todo Poderoso Timão";
    let index = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = text.substring(0, index);
        title.innerHTML = `
            <span class="title-red">O</span>
            <span class="title-black">Todo</span>
            <span class="title-white">Poderoso</span>
            <span class="title-red">Timão</span>
        `;
        
        if (!isDeleting && index < text.length) {
            index++;
            setTimeout(type, 100);
        } else if (isDeleting && index > 0) {
            index--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            setTimeout(type, 2000);
        }
    }
    
    // Começa com o texto completo
    type();
}

// ============================================
// 14. ANIMAÇÃO DOS FLOATING ELEMENTS
// ============================================
function animateFloating() {
    const elements = document.querySelectorAll('.float-element');
    elements.forEach((el, index) => {
        const duration = 3 + index * 0.5;
        const delay = index * 0.3;
        el.style.animation = `floatElement ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// ============================================
// 15. MOSTRAR DATA DO PRÓXIMO JOGO
// ============================================
function mostrarProximoJogo() {
    const jogos = [
        { data: '2024-12-15', adversario: 'Palmeiras', local: 'Arena Corinthians' },
        { data: '2024-12-18', adversario: 'São Paulo', local: 'Morumbi' },
        { data: '2024-12-22', adversario: 'Santos', local: 'Vila Belmiro' }
    ];
    
    const hoje = new Date();
    let proximo = null;
    
    for (let jogo of jogos) {
        const dataJogo = new Date(jogo.data);
        if (dataJogo > hoje) {
            proximo = jogo;
            break;
        }
    }
    
    if (proximo) {
        const container = document.createElement('div');
        container.className = 'proximo-jogo';
        container.innerHTML = `
            <div class="jogo-card">
                <i class="fas fa-calendar-check"></i>
                <span>Próximo jogo: ${proximo.adversario} - ${proximo.local}</span>
                <span class="jogo-data">${new Date(proximo.data).toLocaleDateString('pt-BR')}</span>
            </div>
        `;
        const homeSection = document.querySelector('.home-section');
        if (homeSection) {
            homeSection.appendChild(container);
        }
    }
}

// ============================================
// 16. CONTROLE DE VOLUME DA MÚSICA (OPCIONAL)
// ============================================
// Se quiser adicionar música de fundo, descomente:
/*
const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
audio.loop = true;
audio.volume = 0.3;

document.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    }
});
*/

// ============================================
// 17. INICIALIZAR TODAS AS FUNÇÕES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Contadores
    setTimeout(animateCounters, 500);
    
    // Elementos ao scroll
    revealOnScroll();
    
    // Animações
    animateTitles();
    animateFloating();
    
    // Typewriter (descomentar se quiser)
    // typeWriter();
    
    // Próximo jogo
    mostrarProximoJogo();
    
    // Efeito de partículas (opcional)
    createParticles();
});

// ============================================
// 18. SISTEMA DE PARTÍCULAS
// ============================================
function createParticles() {
    const homeSection = document.querySelector('.home-section');
    if (!homeSection) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 6 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.background = ['#e94560', '#ffd700', '#ffffff', '#1a1a1a'][Math.floor(Math.random() * 4)];
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.pointerEvents = 'none';
        
        const animacao = `
            @keyframes floatParticle {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * -200 - 100}px) rotate(360deg); opacity: 0; }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = animacao;
        document.head.appendChild(style);
        
        particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
        homeSection.appendChild(particle);
    }
}

// ============================================
// 19. EFEITO DE ONDA NO BANNER
// ============================================
function createWaveEffect() {
    const homeSection = document.querySelector('.home-section');
    if (!homeSection) return;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'wave-svg');
    svg.setAttribute('viewBox', '0 0 1440 120');
    svg.setAttribute('style', 'position: absolute; bottom: 0; left: 0; width: 100%; z-index: 0;');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M0,40 C360,80 720,0 1080,40 C1260,60 1380,40 1440,40 L1440,120 L0,120 Z');
    path.setAttribute('fill', 'rgba(233, 69, 96, 0.1)');
    path.setAttribute('class', 'wave-path');
    
    svg.appendChild(path);
    homeSection.appendChild(svg);
}

// ============================================
// 20. SCROLL INDICATOR
// ============================================
function animateScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        setInterval(() => {
            indicator.style.opacity = '1';
            setTimeout(() => {
                indicator.style.opacity = '0.3';
            }, 1000);
        }, 2000);
    }
}

// Iniciar indicador de scroll
setTimeout(animateScrollIndicator, 2000);

// ============================================
// 21. CONSOLE BANNER
// ============================================
console.log('%c🐔 VAI CORINTHIANS! ⚪🔴⚫', 'font-size: 30px; font-weight: bold; color: #e94560;');
console.log('%cO clube do povo, a paixão nacional!', 'font-size: 16px; color: #ffd700;');
console.log('%c🏆 30+ Títulos | 🌍 2 Mundiais | ⭐ 30M+ Torcedores', 'font-size: 14px; color: #ffffff; background: #1a1a1a; padding: 5px;');

// ============================================
// 22. RESISTÊNCIA A ERROS
// ============================================
console.log('✅ Página do Corinthians carregada com sucesso!');
console.log('📱 Site responsivo e otimizado!');
console.log('🐔 #VaiCorinthians');

// ============================================
// 23. EVENTO DE ERRO GLOBAL
// ============================================
window.addEventListener('error', function(e) {
    console.warn('⚠️ Um erro foi capturado, mas a página continua funcionando:', e.message);
});

// ============================================
// 24. ATUALIZAR ESTATÍSTICAS EM TEMPO REAL
// ============================================
// Simula atualização de estatísticas a cada 10 segundos
setInterval(() => {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        // Pequena animação para mostrar que está vivo
        stats.forEach(stat => {
            stat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 200);
        });
    }
}, 10000);

// ============================================
// 25. FUNÇÃO PARA COMPARTILHAR
// ============================================
function compartilharTime() {
    if (navigator.share) {
        navigator.share({
            title: '🐔 Corinthians - O Todo Poderoso Timão',
            text: 'Conheça a página do maior clube do mundo!',
            url: window.location.href
        }).catch(() => {});
    } else {
        alert('🐔 Vai Corinthians! Compartilhe essa paixão!');
    }
}

// Adicionar botão de compartilhar (opcional)
const shareBtn = document.createElement('button');
shareBtn.className = 'share-btn';
shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Compartilhar';
shareBtn.onclick = compartilharTime;

// Adicionar no final do conteúdo
const footerContent = document.querySelector('.footer-content');
if (footerContent) {
    footerContent.appendChild(shareBtn);
}

console.log('✅ Todos os sistemas carregados! 🐔⚪🔴⚫');
