export function renderMenu(): void {
    const main: HTMLDivElement = document.createElement('div');
    main.classList.add('main');

    const header: HTMLDivElement = document.createElement('div');
    header.classList.add('header');
    const title: HTMLHeadingElement = document.createElement('h1');
    title.textContent = 'Tic Tac Two';
    header.appendChild(title);

    const gameMode: HTMLDivElement = document.createElement('div');
    gameMode.classList.add('game-mode');
    const gameModeTitle: HTMLHeadingElement = document.createElement('h2');
    gameModeTitle.textContent = 'Choose Game Mode';
    gameMode.appendChild(gameModeTitle);

    const pvpButton: HTMLInputElement = document.createElement('input');
    pvpButton.type = 'button';
    pvpButton.classList.add('mode-button');
    pvpButton.dataset.mode = 'pvp';
    pvpButton.value = 'Player vs Player';

    const pvaiButton: HTMLInputElement = document.createElement('input');
    pvaiButton.type = 'button';
    pvaiButton.classList.add('mode-button');
    pvaiButton.dataset.mode = 'pvai';
    pvaiButton.value = 'Player vs AI';

    gameMode.appendChild(pvpButton);
    gameMode.appendChild(pvaiButton);

    main.appendChild(header);
    main.appendChild(gameMode);

    document.body.appendChild(main);
}

renderMenu();
