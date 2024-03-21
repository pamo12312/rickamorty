let pageNumber = 1;
let filterParams = {
    filter: null
};
async function getData() {
    try {
        let apiUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
        if (filterParams.filter === "alive" || filterParams.filter === "dead" || filterParams.filter === "unknown") {
            apiUrl += `&status=${filterParams.filter}`;
        }
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw Error("Failed to fetch data.");
        }
        return res.json();
    } catch (error) {
        console.error(error);
    }
}
async function applyFilter() {
    pageNumber = 1;
    await displayData();
}
async function nextPage() {
    pageNumber++;
    await displayData();
}
async function previousPage() {
    if (pageNumber > 1) {
        pageNumber--;
        await displayData();
    }
}
async function displayData() {
    try {
        const data = await getData();
        console.log(data);
        const container = document.getElementById('cardsContainer');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        data.results.forEach(result => {
            const characterInfo = document.createElement('div');
            characterInfo.className = 'card';
            const textColumn = document.createElement('div');
            textColumn.className = 'textColumn';
            const name = document.createElement('div');
            name.textContent = 'Name: ' + result.name;
            const status = document.createElement('div');
            status.textContent = 'Status: ' + result.status;
            const type = document.createElement('div');
            type.textContent = 'Type: ' + result.type;
            textColumn.appendChild(name);
            textColumn.appendChild(status);
            textColumn.appendChild(type);
            const image = document.createElement('img');
            image.src = result.image;
            image.className = 'profileImage';
            characterInfo.appendChild(textColumn);
            characterInfo.appendChild(image);
            container.appendChild(characterInfo);
        });
    } catch (error) {
        console.error(error);
    }
}
document.querySelectorAll('input[name="status"]').forEach(input => {
    input.addEventListener('change', function() {
        filterParams.filter = this.value;
        applyFilter();
    });
});
document.getElementById('previousPageBtn').addEventListener('click', previousPage);
document.getElementById('nextPageBtn').addEventListener('click', nextPage);
displayData();