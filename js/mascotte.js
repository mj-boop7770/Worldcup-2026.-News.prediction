// js/mascotte.js
export const Mascotte = {
    afficher: (containerId) => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <img src="octopus.png" alt="Mujos Octopus" id="octopus-img" style="width: 150px;">
            `;
        }
    }
};
