document.addEventListener('DOMContentLoaded', function() {
    // Add this code block
    document.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            item.classList.toggle('selected');
            updateButtonsVisibility();
        });
    });
    loadFilters();
    document.getElementById('applyFilters').addEventListener('click', saveFilters);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    document.querySelector('.filter-item[data-value="All"]').addEventListener('click', toggleAllFilters);
});
function saveFilters() {
    const filters = Array.from(document.querySelectorAll('.filter-item'))
        .filter(item => item.classList.contains('selected'))
        .map(item => item.dataset.value);
    localStorage.setItem('filters', JSON.stringify(filters));
    location.reload();
}
function clearFilters() {
    const filterItems = document.querySelectorAll('.filter-item');
    filterItems.forEach(item => {
        item.classList.remove('selected');
    });
    localStorage.removeItem('filters');
    updateFilterDisplay();
}
function loadFilters() {
    const filters = JSON.parse(localStorage.getItem('filters')) || [];
    filters.forEach(filterValue => {
        const item = document.querySelector(`.filter-item[data-value="${filterValue}"]`);
        if (item) {
            item.classList.add('selected');
        }
    });
    updateFilterDisplay();
}
function toggleAllFilters() {
    const allSelected = document.querySelector('.filter-item[data-value="All"]').classList.contains('selected');
    const filterItems = document.querySelectorAll('.filter-item:not([data-value="All"])');
    filterItems.forEach(item => {
        if (allSelected) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}
function updateFilterDisplay() {
    const selectedFilters = Array.from(document.querySelectorAll('.filter-item.selected'));
    const applyButton = document.getElementById('applyFilters');
    const clearButton = document.getElementById('clearFilters');
    if (selectedFilters.length > 0) {
        applyButton.style.display = 'inline-block';
        clearButton.style.display = 'inline-block';
    } else {
        applyButton.style.display = 'none';
        clearButton.style.display = 'none';
    }
}
function updateButtonsVisibility() {
    const selectedItems = document.querySelectorAll('.filter-item.selected');
    const applyButton = document.getElementById('applyFilters');
    const clearButton = document.getElementById('clearFilters');
    if (selectedItems.length > 0) {
        applyButton.style.display = 'inline-block';
        clearButton.style.display = 'inline-block';
    } else {
        applyButton.style.display = 'none';
        clearButton.style.display = 'none';
    }
}