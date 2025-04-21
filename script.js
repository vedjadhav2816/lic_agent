// Hamburger Menu Toggle
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Set Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Leaderboard Functionality
function initLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;

    // Sample leaderboard data
    const leaderboardData = [
        { rank: 1, name: "Rajesh Kumar", points: 1250, policies: 85, region: "North India", img: "https://randomuser.me/api/portraits/men/32.jpg" },
        { rank: 2, name: "Priya Sharma", points: 1100, policies: 72, region: "South India", img: "https://randomuser.me/api/portraits/women/44.jpg" },
        { rank: 3, name: "Anil Patel", points: 950, policies: 65, region: "West India", img: "https://randomuser.me/api/portraits/men/67.jpg" },
        { rank: 4, name: "Sunita Gupta", points: 800, policies: 50, region: "East India", img: "https://randomuser.me/api/portraits/women/23.jpg" },
        { rank: 5, name: "Vikram Singh", points: 750, policies: 45, region: "North India", img: "https://randomuser.me/api/portraits/men/45.jpg" },
        { rank: 6, name: "Meena Rao", points: 700, policies: 40, region: "South India", img: "https://randomuser.me/api/portraits/women/56.jpg" },
        { rank: 7, name: "Kiran Desai", points: 650, policies: 38, region: "West India", img: "https://randomuser.me/api/portraits/men/12.jpg" },
        { rank: 8, name: "Suman Yadav", points: 600, policies: 35, region: "East India", img: "https://randomuser.me/api/portraits/women/78.jpg" },
        { rank: 9, name: "Arjun Mehta", points: 550, policies: 30, region: "North India", img: "https://randomuser.me/api/portraits/men/89.jpg" },
        { rank: 10, name: "Neha Joshi", points: 500, policies: 28, region: "South India", img: "https://randomuser.me/api/portraits/women/90.jpg" }
    ];

    // Populate leaderboard
    function populateLeaderboard(data) {
        leaderboardBody.innerHTML = '';
        data.forEach(agent => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank ${agent.rank <= 3 ? 'top-rank' : ''}">${agent.rank}</td>
                <td><img src="${agent.img}" alt="${agent.name}">${agent.name}</td>
                <td>${agent.points}</td>
                <td>${agent.policies}</td>
                <td>${agent.region}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    // Filter leaderboard
    function filterLeaderboard() {
        const region = document.getElementById('regionFilter').value;
        const time = document.getElementById('timeFilter').value;

        let filteredData = leaderboardData;

        if (region !== 'all') {
            filteredData = filteredData.filter(agent => agent.region === region);
        }

        if (time === 'quarterly') {
            filteredData = filteredData.map(agent => ({
                ...agent,
                points: Math.round(agent.points * 0.75),
                policies: Math.round(agent.policies * 0.75)
            }));
        } else if (time === 'yearly') {
            filteredData = filteredData.map(agent => ({
                ...agent,
                points: agent.points * 2,
                policies: agent.policies * 2
            }));
        }

        populateLeaderboard(filteredData);
    }

    // Event listeners for filters
    const regionFilter = document.getElementById('regionFilter');
    const timeFilter = document.getElementById('timeFilter');
    if (regionFilter && timeFilter) {
        regionFilter.addEventListener('change', filterLeaderboard);
        timeFilter.addEventListener('change', filterLeaderboard);
    }

    // Initial population
    populateLeaderboard(leaderboardData);
}

// FAQ Functionality
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqSearch = document.getElementById('faqSearch');

    if (faqQuestions.length > 0) {
        // Accordion functionality
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                const isActive = answer.classList.contains('active');

                // Close all other FAQs
                document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('active'));
                document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
                document.querySelectorAll('.faq-question i').forEach(i => i.style.transform = 'rotate(0deg)');

                // Toggle current FAQ
                if (!isActive) {
                    answer.classList.add('active');
                    question.classList.add('active');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    if (faqSearch) {
        // Search functionality
        faqSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Initialize all functionality on page load
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    setActiveNavLink();
    initLeaderboard();
    initFAQs();
});
