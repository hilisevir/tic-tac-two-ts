document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll<HTMLButtonElement>(".mode-button").forEach(button => {
        button.addEventListener("click", () => {
            const mode = button.dataset.mode;
            if (mode) {
                window.location.href = `${import.meta.env.BASE_URL}game.html?mode=${mode}`;
            }
        });
    });

    document.querySelectorAll<HTMLElement>("[data-route]").forEach(button => {
        button.addEventListener("click", () => {
            const route = button.dataset.route;
            if (route) {
                window.location.href = route;
            }
        });
    });
});