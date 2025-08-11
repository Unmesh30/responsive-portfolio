document.addEventListener('DOMContentLoaded', () => {
    // Navigation and Content Management
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.terminal-content');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    // ENHANCEMENT: retro style - Enhanced Audio elements and toggle
    const audioToggle = document.getElementById('audio-toggle');
    const clickAudio = document.getElementById('audio-click');
    const keypressAudio = document.getElementById('audio-keypress');
    const hoverAudio = document.getElementById('audio-hover');
    const bootAudio = document.getElementById('audio-boot');
    let audioEnabled = false;

    // Initialize navigation
    initializeNavigation();
    
    // Initialize terminal functionality
    initializeTerminal();
    
    // Initialize animations
    initializeAnimations();
    
    // Fetch live data
    fetchLiveStats();

    // ENHANCEMENT: retro style - Initialize audio controls
    initializeAudio();


    // --- Enhanced Audio System --- //
    function initializeAudio() {
        // Play boot sound on page load
        setTimeout(() => {
            playBootSound();
        }, 500);

        audioToggle.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            const icon = audioToggle.querySelector('i');
            icon.className = audioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-off';
            playClickSound();
        });

        // Enhanced keypress detection
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
                playKeypressSound();
            }
        });

        // Enhanced click detection for all interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.closest('a, button, .nav-link, .project-link, .publication-link, .resume-button, .skill-tag, .tech-tag, .contact-link, .audio-toggle')) {
                playClickSound();
            }
        });

        // Add hover sound effects for interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.nav-link, .project-link, .publication-link, .resume-button, .skill-tag, .tech-tag, .contact-link')) {
                playHoverSound();
            }
        });

        // Terminal command execution sound
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    setTimeout(() => playBootSound(), 100); // Command execution sound
                }
            });
        }

        // Section navigation sound
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => playBootSound(), 200); // Section load sound
            });
        });
    }

    function playClickSound() {
        if (audioEnabled && clickAudio) {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(e => console.log("Click audio play failed: " + e));
        }
    }

    function playKeypressSound() {
        if (audioEnabled && keypressAudio) {
            keypressAudio.currentTime = 0;
            keypressAudio.play().catch(e => console.log("Keypress audio play failed: " + e));
        }
    }

    function playHoverSound() {
        if (audioEnabled && hoverAudio) {
            hoverAudio.currentTime = 0;
            hoverAudio.volume = 0.3; // Softer for hover
            hoverAudio.play().catch(e => console.log("Hover audio play failed: " + e));
        }
    }

    function playBootSound() {
        if (audioEnabled && bootAudio) {
            bootAudio.currentTime = 0;
            bootAudio.volume = 0.5;
            bootAudio.play().catch(e => console.log("Boot audio play failed: " + e));
        }
    }

    // --- Navigation System --- //
    function initializeNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSectionId = link.getAttribute('data-section');
                showSection(targetSectionId);
            });
        });
    }

    // ENHANCEMENT: retro style - Improved section transition
    function showSection(sectionId) {
        const currentActive = document.querySelector('.terminal-content.active');
        if (currentActive && currentActive.id !== sectionId) {
            currentActive.classList.add('section-transition-out');
            currentActive.addEventListener('animationend', () => {
                currentActive.classList.remove('active', 'section-transition-out');
                const nextSection = document.getElementById(sectionId);
                if (nextSection) {
                    nextSection.classList.add('active');
                    updateActiveNav(document.querySelector(`.nav-link[data-section="${sectionId}"]`));
                    triggerSectionAnimations(sectionId);
                }
            }, { once: true });
        } else if (!currentActive) {
            const nextSection = document.getElementById(sectionId);
            if (nextSection) {
                nextSection.classList.add('active');
                updateActiveNav(document.querySelector(`.nav-link[data-section="${sectionId}"]`));
                triggerSectionAnimations(sectionId);
            }
        }
    }

    function updateActiveNav(activeLink) {
        if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }

    // --- Terminal Commands System --- //
    function initializeTerminal() {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                executeCommand(command);
                terminalInput.value = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!e.ctrlKey && !e.metaKey && !e.altKey && 
                e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && 
                e.key.length === 1) {
                terminalInput.focus();
            }
        });
    }

    function executeCommand(command) {
        let output = '';
        const timestamp = new Date().toLocaleTimeString();
        
        switch (command) {
            case 'help':
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p><span class="prompt">></span>Available commands:</p>
                        <div class="command-list">
                            <div class="command-item"><span class="command-name">about</span> - Navigate to About section</div>
                            <div class="command-item"><span class="command-name">education</span> - View educational background</div>
                            <div class="command-item"><span class="command-name">toolbox</span> - Explore skills and technologies</div>
                            <div class="command-item"><span class="command-name">projects</span> - Browse project portfolio</div>
                            <div class="command-item"><span class="command-name">experience</span> - View work experience</div>
                            <div class="command-item"><span class="command-name">publications</span> - Read research publications</div>
                            <div class="command-item"><span class="command-name">contact</span> - Get contact information</div>
                            <div class="command-item"><span class="command-name">resume</span> - Download resume PDF</div>
                            <div class="command-item"><span class="command-name">status</span> - Show live GitHub/LeetCode stats</div>
                            <div class="command-item"><span class="command-name">matrix</span> - Toggle Matrix effect</div>
                            <div class="command-item"><span class="command-name">whoami</span> - Display user information</div>
                            <div class="command-item"><span class="command-name">ls</span> - List directory contents</div>
                            <div class="command-item"><span class="command-name">clear</span> - Clear terminal output</div>
                        </div>
                    </div>
                `;
                break;

            case 'about':
            case 'education':
            case 'toolbox':
            case 'projects':
            case 'experience':
            case 'publications':
            case 'contact':
                showSection(command);
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p><span class="prompt">></span>Navigating to ${command} section...</p>
                        <p class="success-message">✓ Section loaded successfully</p>
                    </div>
                `;
                break;

            case 'resume':
                window.open('resume-unmesh-achar.pdf', '_blank');
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p><span class="prompt">></span>Opening resume...</p>
                        <p class="success-message">✓ Resume opened in new tab</p>
                    </div>
                `;
                break;

            case 'status':
                const githubRepos = document.getElementById('github-repos')?.textContent || '--';
                const githubFollowers = document.getElementById('github-followers')?.textContent || '--';
                const githubStars = document.getElementById('github-stars')?.textContent || '--';
                const githubCommits = document.getElementById('github-commits')?.textContent || '--';
                const leetcodeTotal = document.getElementById('leetcode-total')?.textContent || '--';
                const leetcodeEasy = document.getElementById('leetcode-easy')?.textContent || '--';
                const leetcodeMedium = document.getElementById('leetcode-medium')?.textContent || '--';
                const leetcodeHard = document.getElementById('leetcode-hard')?.textContent || '--';
                
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p><span class="prompt">></span>Live Status Report</p>
                        <div class="status-cli">
                            <div class="cli-section">
                                <h4>📊 GitHub (@${GITHUB_USERNAME})</h4>
                                <p>  Repositories: <span class="highlight">${githubRepos}</span></p>
                                <p>  Followers: <span class="highlight">${githubFollowers}</span></p>
                                <p>  Total Stars: <span class="highlight">${githubStars}</span></p>
                                <p>  Commits (2025): <span class="highlight">${githubCommits}</span></p>
                                <p>  Source: <span class="success-message">${githubDataSource}</span></p>
                            </div>
                            <div class="cli-section">
                                <h4>💻 LeetCode (@${LEETCODE_USERNAME})</h4>
                                <p>  Total Solved: <span class="highlight">${leetcodeTotal}</span></p>
                                <p>  Easy: <span class="success-message">${leetcodeEasy}</span></p>
                                <p>  Medium: <span class="highlight">${leetcodeMedium}</span></p>
                                <p>  Hard: <span class="error-message">${leetcodeHard}</span></p>
                                <p>  Source: <span class="success-message">${leetcodeDataSource}</span></p>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'matrix':
                toggleMatrixEffect();
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p><span class="prompt">></span>Matrix effect toggled</p>
                    </div>
                `;
                break;

            case 'clear':
                terminalOutput.innerHTML = '';
                return;
                
            case 'whoami':
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p><span class="prompt">></span>Unmesh Achar - Computer Engineering Graduate Student</p>
                        <p>AI Researcher | Machine Learning Engineer | NYU Student</p>
                    </div>
                `;
                break;

            case 'ls':
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p><span class="prompt">></span>Directory listing:</p>
                        <div class="file-list">
                            <div class="file-item">about.info</div>
                            <div class="file-item">education.log</div>
                            <div class="file-item">skills.config</div>
                            <div class="file-item">projects/</div>
                            <div class="file-item">experience.txt</div>
                            <div class="file-item">publications/</div>
                            <div class="file-item">contact.md</div>
                            <div class="file-item">resume.pdf</div>
                        </div>
                    </div>
                `;
                break;

            default:
                output = `
                    <div class="command-output">
                        <p class="command-timestamp">[${timestamp}]</p>
                        <p class="error-message"><span class="prompt">></span>Command not found: '${command}'</p>
                        <p>Type 'help' for available commands</p>
                    </div>
                `;
        }
        
        terminalOutput.innerHTML = output;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // --- Animation System --- //
    function initializeAnimations() {
        const introLine1 = document.getElementById('intro-line-1');
        const introLine2 = document.getElementById('intro-line-2');
        const introLine3 = document.getElementById('intro-line-3');
        const codeSnippet = document.getElementById('code-snippet');

        const text1 = "> Hello, I'm Unmesh Achar";
        const text2 = "> Computer Engineering Graduate Student";
        const text3 = "> Building AI systems that matter";
        const codeText = `
def get_core_skills():
    skills = {
        "languages": ["Python", "C++", "Java"],
        "ai_ml": ["PyTorch", "TensorFlow", "Scikit-learn"],
        "power_platform": ["Power Apps", "Power Automate"]
    }
    return skills
`;

        function typeWriter(element, text, callback) {
            let i = 0;
            element.innerHTML = "";
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                } else {
                    if (callback) {
                        callback();
                    }
                }
            }
            type();
        }

        typeWriter(introLine1, text1, () => {
            typeWriter(introLine2, text2, () => {
                typeWriter(introLine3, text3, () => {
                    if(codeSnippet) {
                        typeWriter(codeSnippet, codeText);
                    }
                });
            });
        });
    }

    // ENHANCEMENT: retro style - Typing animation for section titles with sound
    function typeSectionTitle(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const titleElement = section.querySelector('.section-title');
        if (!titleElement || titleElement.dataset.typed) return;

        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.classList.add('section-title-typing');
        titleElement.dataset.typed = 'true';

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                // Play typing sound for each character
                if (audioEnabled && keypressAudio) {
                    keypressAudio.currentTime = 0;
                    keypressAudio.volume = 0.2;
                    keypressAudio.play().catch(() => {});
                }
                i++;
            } else {
                clearInterval(typingInterval);
                titleElement.classList.remove('section-title-typing');
                playBootSound(); // Section title complete sound
            }
        }, 100);
    }

    function triggerSectionAnimations(sectionId) {
        typeSectionTitle(sectionId);
        const section = document.getElementById(sectionId);
        if (!section) return;

        switch (sectionId) {
            case 'about':
                const statFills = section.querySelectorAll('.stat-fill');
                statFills.forEach(fill => {
                    fill.style.width = '0'; // Reset before animating
                    setTimeout(() => {
                        fill.style.animation = 'fillBar 1.5s ease-out forwards';
                    }, 200);
                });
                break;
        }
    }

    // --- Live Stats Fetching --- //
    const GITHUB_USERNAME = 'Unmesh30';
    const LEETCODE_USERNAME = 'UnmeshXD';
    let githubDataSource = 'loading';
    let leetcodeDataSource = 'loading';

    async function fetchLiveStats() {
        // Load real data immediately
        setTimeout(() => {
            console.log('📊 Loading live activity data...');
            fetchUnmeshGitHubStats();
            fetchUnmeshLeetCodeStats();
        }, 1000);
    }

    async function loadFallbackData() {
        try {
            const response = await fetch('assets/data/status.json');
            if (!response.ok) throw new Error('Fallback file not found');
            const data = await response.json();
            return data;
        } catch (error) {
            return {
                github: { repos: 7, followers: 0, stars: 11, commits: 50 },
                leetcode: { total: 8, easy: 5, medium: 3, hard: 0 }
            };
        }
    }

    async function fetchUnmeshGitHubStats() {
        const username = 'Unmesh30';
        try {
            console.log('Fetching GitHub data for', username);
            // Fetch basic user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) throw new Error('GitHub API error');
            const userData = await userResponse.json();
            console.log('GitHub user data:', userData);
            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
            if (!reposResponse.ok) throw new Error('GitHub repos API error');
            const reposData = await reposResponse.json();
            console.log('GitHub repos data:', reposData.length, 'repos');
            // Calculate stars
            const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            // Update UI with REAL data
            updateGitHubStats({
                repos: userData.public_repos,
                followers: userData.followers,
                stars: totalStars,
                commits: 50 // Use cached value as GitHub API requires auth for commit stats
            });
            githubDataSource = 'API';
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            const fallbackData = await loadFallbackData();
            updateGitHubStats(fallbackData.github);
            githubDataSource = 'Fallback';
        }
    }

    async function fetchUnmeshLeetCodeStats() {
        const username = 'UnmeshXD';
        try {
            console.log('Fetching LeetCode data for', username);
            
            // Try multiple LeetCode APIs for comprehensive data
            const apis = [
                `https://leetcode-stats-api.herokuapp.com/${username}`,
                `https://alfa-leetcode-api.onrender.com/${username}/solved`,
                `https://alfa-leetcode-api.onrender.com/${username}/contest`,
                `https://leetcode-api-faisalshohag.vercel.app/${username}`
            ];
            
            let userData = {};
            let recentSubmissions = [];
            
            // Try to get basic stats
            for (const apiUrl of apis) {
                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const data = await response.json();
                        console.log('LeetCode API response:', data);
                        
                        if (data.totalSolved || data.solvedProblem || data.totalQuestions) {
                            userData = {
                                totalSolved: data.totalSolved || data.solvedProblem || 0,
                                easy: data.easySolved || data.easySolved || 0,
                                medium: data.mediumSolved || data.mediumSolved || 0,
                                hard: data.hardSolved || data.hardSolved || 0,
                                ranking: data.ranking || null,
                                streak: data.streak || null
                            };
                            break;
                        }
                    }
                } catch (apiError) {
                    console.log('API failed:', apiUrl, apiError);
                    continue;
                }
            }
            
            // Try to get recent submissions with enhanced difficulty detection
            try {
                const recentResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/submission`);
                if (recentResponse.ok) {
                    const recentData = await recentResponse.json();
                    if (recentData.submission && Array.isArray(recentData.submission)) {
                        recentSubmissions = recentData.submission.slice(0, 5).map(submission => {
                            // Enhanced difficulty mapping
                            if (!submission.difficulty || submission.difficulty === 'Unknown') {
                                const title = submission.title?.toLowerCase() || '';
                                if (title.includes('add') && title.includes('operators')) {
                                    submission.difficulty = 'Hard';
                                } else if (title.includes('word break') || title.includes('sudoku')) {
                                    submission.difficulty = 'Medium';
                                } else {
                                    submission.difficulty = 'Medium';
                                }
                            }
                            return submission;
                        });
                    }
                }
            } catch (recentError) {
                console.log('Could not fetch recent submissions:', recentError);
            }
            
            if (userData.totalSolved || recentSubmissions.length > 0) {
                updateLeetCodeStats({
                    total: userData.totalSolved,
                    easy: userData.easy,
                    medium: userData.medium,
                    hard: userData.hard
                }, recentSubmissions);
                leetcodeDataSource = 'API';
            } else {
                throw new Error('No LeetCode data found');
            }
            
        } catch (error) {
            console.error('Error fetching LeetCode stats:', error);
            const fallbackData = await loadFallbackData();
            updateLeetCodeStats(fallbackData.leetcode, []);
            leetcodeDataSource = 'Fallback';
        }
    }

    function showLoadingState(platform) {
        const elements = {
            github: ['github-repos', 'github-followers', 'github-stars', 'github-commits'],
            leetcode: ['leetcode-total', 'leetcode-easy', 'leetcode-medium', 'leetcode-hard']
        };
        elements[platform].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '...';
        });
    }

    function updateGitHubStats(stats) {
        document.getElementById('github-repos').textContent = stats.repos;
        document.getElementById('github-followers').textContent = stats.followers;
        document.getElementById('github-stars').textContent = stats.stars;
        document.getElementById('github-commits').textContent = stats.commits;
    }

    function updateLeetCodeStats(stats, recentSubmissions = []) {
        document.getElementById('leetcode-total').textContent = stats.total;
        document.getElementById('leetcode-easy').textContent = stats.easy;
        document.getElementById('leetcode-medium').textContent = stats.medium;
        document.getElementById('leetcode-hard').textContent = stats.hard;

        // Update recent activities
        const activitiesContainer = document.getElementById('leetcode-activities');
        if (activitiesContainer) {
            if (recentSubmissions.length > 0) {
                activitiesContainer.innerHTML = recentSubmissions.map(submission => {
                    const statusIcon = getStatusIcon(submission.statusDisplay);
                    const statusClass = getStatusClass(submission.statusDisplay);
                    const difficulty = getDifficultyInfo(submission.title);
                    const timeAgo = formatTimeAgo(submission.timestamp);

                    return `
                        <div class="activity-item">
                            <div class="activity-status ${statusClass}">${statusIcon}</div>
                            <div class="activity-details">
                                <div class="activity-problem">
                                    ${submission.title}
                                    <span class="activity-difficulty ${difficulty.class}">${difficulty.level}</span>
                                </div>
                                <div class="activity-time">${timeAgo}</div>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                activitiesContainer.innerHTML = `
                    <div class="activity-loading">No recent activities found</div>
                `;
            }
        }
    }

    function getStatusIcon(status) {
        if (status === 'Accepted') return '✓';
        if (status === 'Wrong Answer') return '✗';
        if (status === 'Time Limit Exceeded') return '⏰';
        return '○';
    }

    function getStatusClass(status) {
        if (status === 'Accepted') return 'accepted';
        if (status === 'Wrong Answer') return 'wrong';
        if (status === 'Time Limit Exceeded') return 'timeout';
        return 'other';
    }

    function getDifficultyInfo(title) {
        // Simple difficulty detection based on problem patterns
        const titleLower = title.toLowerCase();
        if (titleLower.includes('add operators') || titleLower.includes('expression')) {
            return { level: 'HARD', class: 'hard' };
        }
        if (titleLower.includes('sudoku') || titleLower.includes('word break')) {
            return { level: 'MEDIUM', class: 'medium' };
        }
        return { level: 'MEDIUM', class: 'medium' }; // Default
    }

    function formatTimeAgo(timestamp) {
        if (!timestamp) return '1mo ago';
        const now = Math.floor(Date.now() / 1000);
        const diff = now - timestamp;
        
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
        return Math.floor(diff / 2592000) + 'mo ago';
    }

    // --- Matrix Effect --- //
    let matrixEffect = false;
    function toggleMatrixEffect() {
        matrixEffect = !matrixEffect;
        const canvas = document.getElementById('matrix-canvas');
        if (matrixEffect && !canvas) {
            createMatrixEffect();
        } else if (!matrixEffect && canvas) {
            canvas.remove();
        }
    }

    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        Object.assign(canvas.style, { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: '999', opacity: '0.3' });
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = Array.from({ length: columns }).fill(1);

        function draw() {
            if (!document.getElementById('matrix-canvas')) return;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    console.log('🖥️  Terminal Portfolio System Initialized');
    console.log('📊  Live stats fetching started');
    console.log('⌨️   Type "help" for commands');
});