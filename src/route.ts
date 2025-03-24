document.addEventListener("DOMContentLoaded", () => {
    const basePath = window.location.pathname.includes('/tic-tac-two-ts/')
        ? '/tic-tac-two-ts/'
        : '/';

    document.querySelectorAll<HTMLButtonElement>(".mode-button").forEach(button => {
        button.addEventListener("click", () => {
            const mode = button.dataset.mode;
            if (mode) {
                window.location.href = `${basePath}game.html?mode=${mode}`;
            }
        });
    });

    document.querySelectorAll<HTMLElement>("[data-route]").forEach(button => {
        button.addEventListener("click", () => {
            const route = button.dataset.route;
            if (route) {
                window.location.href = `${basePath}${route}`;
            }
        });
    });
});
