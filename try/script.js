document.addEventListener('DOMContentLoaded', () => {
    const chooseFlavorsButton = document.getElementById('chooseFlavorsButton');
    const flavorsModal = document.getElementById('flavorsModal');
    const closeModal = document.querySelector('.close');

    chooseFlavorsButton.onclick = () => {
        flavorsModal.style.display = "block";
    };

    closeModal.onclick = () => {
        flavorsModal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target == flavorsModal) {
            flavorsModal.style.display = "none";
        }
    };

    document.getElementById('confirmFlavorsButton').onclick = () => {
        alert("הטעמים נבחרו!");
        flavorsModal.style.display = "none";
    };
});
