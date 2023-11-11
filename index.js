// 1 task

const xText = document.querySelector('.logo')
const yText = document.querySelector('.logo2')
console.log();
[ xText.innerHTML, yText.innerHTML ] = [ yText.innerHTML, xText.innerHTML ]

// 2 task
function calculateCircleArea(radius = 0) {
    return Math.PI * Math.pow(radius, 2);
}

const radiusValue = document.querySelector('#inputCircleNum');
const resultBlock = document.querySelector('.resultCircleText'); 



const onClickCircleHandler = () => {
    const circleArea = calculateCircleArea(radiusValue.value);


    resultBlock.innerHTML = `Area of a circle with a radius of ${radiusValue.value} units: ${circleArea.toFixed(2)}`;
}

// 3 task

const arrValue = document.querySelector('#inputMaxNum');

const onClickMaxHandler = () => {
    // Your code to get an array with 10 numbers
    console.log(arrValue.value.split(' '));
    const numbersArray = arrValue.value.split(' ').map(vl => +vl);

    const maxNumber = Math.max(...numbersArray);

    const maxNumberCount = numbersArray.filter(num => num === maxNumber).length;

    document.cookie = `maxNumberCount=${maxNumberCount}`;

    alert(`Count of maximum numbers: ${maxNumberCount}`);
};

function deleteAllCookies() {
    const cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const cookieParts = cookies[i].split("=");
        const cookieName = cookieParts[0];

        // Delete the cookie with a path of '/'
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=maximax67.github.io path=/web-labs-university;`;
    }

    // Optionally, reload the page after deleting all cookies
    location.reload();
}

window.onload = function() {
    const cookies = document.cookie;
    if (cookies.includes('maxNumberCount')) {
        // Parse cookies to get maxNumberCount
        const maxNumberCount = parseInt(cookies.split('; ').find(row => row.startsWith('maxNumberCount')).split('=')[1]);
        
        // If there are data in cookies, display information and ask the user
        const userDecision = confirm(`Count of maximum numbers saved in cookies: ${maxNumberCount}. Delete data?`);

        if (userDecision) {
            // If the user confirms deletion, delete cookies and refresh the page
            deleteAllCookies();
        } else {
            // If the user declines, display a message about the need to reload the page
            alert('Data in cookies will remain. Reload the page to update.');
        }
    }
};

// 4 task

const block2 = document.querySelector('.aside-left-top');
const inputColor = document.querySelector('#inputColor');


const savedColor = localStorage.getItem('block2Color');
if (savedColor) {
    block2.style.backgroundColor = savedColor;
    inputColor.value = savedColor
}

block2.addEventListener('mouseover', function() {
    const newColor = inputColor.value; 
    block2.style.backgroundColor = newColor;
    localStorage.setItem('block2Color', newColor);
});


// last task

function editElement(element, fontSize = 16, typeInput = 'input', columnDelay = 300, defColor = 'transparent') {
    const text = element.innerText;
    const editDiv = document.createElement('div');
    const input = document.createElement(typeInput);
    const calcPixelWidth = text.toString().length * (fontSize * 0.6) + 10;
    const columns = calcPixelWidth / columnDelay;
    const width = columns > 1 ? `${calcPixelWidth / columns}px` : `${calcPixelWidth}px`;
    const height = columns > 1 ? `${columns * fontSize}px` : 'max-content';

    input.value = text;
    input.style.width = width;
    input.style.height = height;
    input.style.fontSize = `${fontSize}px`;

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Зберегти';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Видалити';
    deleteButton.style.display = 'none';

    editDiv.appendChild(input);
    editDiv.appendChild(saveButton);
    
    element.style.display = "none";
    element.parentNode.insertBefore(editDiv, element);

    
    saveButton.addEventListener('click', function() {
        element.innerText = input.value;
        editDiv.parentNode.removeChild(editDiv);

        const uniqueId = `block_${Date.now()}`;
        localStorage.setItem(uniqueId, input.value);
        element.parentNode.style.backgroundColor = getRandomColor();
        element.style.display = "inline";
        deleteButton.style.display = "inline";
        deleteButton.dataset.itemId = uniqueId;
    });

    deleteButton.addEventListener('click', function() {
        const itemId = deleteButton.dataset.itemId;
        localStorage.removeItem(itemId);
        element.innerText = text;
        element.parentNode.style.backgroundColor = defColor;
        deleteButton.parentNode.removeChild(deleteButton);
    });

    element.parentNode.insertBefore(deleteButton, editDiv.nextSibling);

    input.addEventListener('input', function() {
        if (input.value !== text) {
            deleteButton.style.display = 'block';
        } else {
            deleteButton.style.display = 'none';
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
