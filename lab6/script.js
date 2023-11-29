function addAccordion() {
    const title = document.getElementById('sectionTitle').value;
    const content = document.getElementById('sectionContent').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_section.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            addSection(title, content);
            document.getElementById('sectionTitle').value = '';
            document.getElementById('sectionContent').value = '';
        }
    };
    xhr.send('title=' + title + '&content=' + content);
}

function addSection(title, content) {
    const accordionContainer = document.getElementById('accordionContainer');
    const button = document.createElement('button');
    button.className = 'accordion';
    button.textContent = title;

    const panel = document.createElement('div');
    panel.className = 'panel';
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    panel.appendChild(paragraph);

    button.addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.padding = '0';
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            panel.style.padding = '10px 0px';
        }
    });

    accordionContainer.appendChild(button);
    accordionContainer.appendChild(panel);
}

function fetchAccordionData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const jsonData = JSON.parse(xhr.responseText);
            jsonData.forEach(function (section) {
                addSection(section.title, section.content);
            });
        }
    };
    xhr.open('GET', 'get_sections.php', true);
    xhr.send();
}

function deleteAccordionSections() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                const accordionContainer = document.getElementById('accordionContainer');
                accordionContainer.innerHTML = '';
            } else {
                alert(response.message);
            }
        }
    };
    xhr.open('GET', 'clear_sections.php', true);
    xhr.send();
}

fetchAccordionData();
