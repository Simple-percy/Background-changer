const body = document.querySelector('body');
const button1 = document.getElementById('changeColor');
const code = document.querySelector('h1');
const button2 = document.getElementById('customColor');
const button3 = document.getElementById('mouseRGB');
const button4 = document.getElementById('customHex');
const button5 = document.getElementById('colourName')

function changeBackground() {
    let r = Math.floor(Math.random() * 256) + 1
    let g = Math.floor(Math.random() * 256) + 1
    let b = Math.floor(Math.random() * 256) + 1

    body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    code.textContent = `RGB(${r}, ${g}, ${b})`
    code.classList = 'RGB'

}

function customRGB() {

    const inputR = document.createElement('input');
    const inputG = document.createElement('input');
    const inputB = document.createElement('input');
    const confirm = document.createElement('button');
    const confirmText = document.createTextNode('CONFIRM')
    const closeCusBtn = document.createElement('button');
    const closeText = document.createTextNode('CLOSE');
    div = document.createElement('div');
    div.className = 'containerCus';
    closeCusBtn.appendChild(closeText);
    confirm.appendChild(confirmText);
    closeCusBtn.className = 'closeCus';
    confirm.className = 'confirmBtn';
    inputR.className = 'inputR';
    inputG.className = 'inputG';
    inputB.className = 'inputB';
    inputR.type = 'number'
    inputR.placeholder = 'R'
    inputR.max = 256;
    inputB.type = 'number'
    inputB.placeholder = 'B'
    inputB.max = 256;
    inputG.type = 'number'
    inputG.placeholder = 'G'
    inputG.max = 256;
    

    div.appendChild(inputR);
    div.appendChild(inputG);
    div.appendChild(inputB);
    div.appendChild(confirm);
    div.appendChild(closeCusBtn)
    button2.insertAdjacentElement('afterend', div)

    button2.disabled = true;
    
    

        function confirmCustom () {
             r = inputR.value
             b = inputB.value
             g = inputG.value
            if (r !== '' && b !== '' && g !== '') {
            body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            code.textContent = `RGB(${r}, ${g}, ${b})`;
            
            } else {
                alert('input all RGB values')
            }
            
        }

        function closeCustom () {
            div.style.display = 'none'
            if (div.style.display === 'none') {
                button2.disabled = false;
            }
        }

        closeCusBtn.addEventListener('click', closeCustom);
        confirm.addEventListener('click', confirmCustom);
        code.classList = 'RGB'
    
        
    
}

function customHex () {
    
    const inputHex = document.createElement('input');
    const confirmHexBtn = document.createElement('button');
    const closeHex = document.createElement('button');
    const closeHexText = document.createTextNode('CLOSE')
    const hexBtnText = document.createTextNode('CONFIRM');
    const divHex = document.createElement('div');
    closeHex.className = 'closeHex'
    inputHex.className = 'hexInput';
    inputHex.placeholder = '#HEXCODE'
    confirmHexBtn.className = 'hexCon'

    closeHex.appendChild(closeHexText)
    confirmHexBtn.appendChild(hexBtnText);
    divHex.appendChild(closeHex)
    divHex.appendChild(inputHex);
    divHex.appendChild(confirmHexBtn);

    button4.insertAdjacentElement('afterend', divHex);
    button4.disabled = true;
    
    function confirmHex () {
    const hexCode = inputHex.value;

    body.style.backgroundColor = `#${hexCode}`;
    code.textContent = `#${hexCode}`;
    code.classList = 'HEX'
    
}
confirmHexBtn.addEventListener('click', confirmHex);   
    
    function closeHexCode() {
        divHex.style.display = 'none';
        if (divHex.style.display === 'none') {
            button4.disabled = false
        }
    }
    closeHex.addEventListener('click', closeHexCode);
}

function activateMouse() {
        const stopMouse = document.createElement('button');
        const mouseText = document.createTextNode('STOP');
        stopMouse.appendChild(mouseText);
        stopMouse.className = 'mouseOff';
        button3.replaceWith(stopMouse);
        
        function mouseBackgroung (e) {
            let gY = e.clientY 
            let rX = e.clientX 
            let b = Math.floor(Math.random() * 130)
             
           body.style.backgroundColor = `rgb(${rX}, ${gY}, ${b}`;
           code.textContent = `RGB(${rX}, ${gY}, ${b})`;
    }
    
    function mouseColourOff() {
        body.removeEventListener('mousemove', mouseBackgroung);

        stopMouse.replaceWith(button3)
    }

    stopMouse.addEventListener('click', mouseColourOff)
    body.addEventListener('mousemove', mouseBackgroung);
}



async function getColourName() {
    try {
        let idHEX =  code.textContent;
        let newHex = idHEX.slice(1)
        
        const idRGB = 'rgb=' + code.textContent;
        let response = await fetch(`https://www.thecolorapi.com/id?${idRGB}`)
        if (code.classList.contains('HEX')) {
            response = await fetch(`https://www.thecolorapi.com/id?hex=${newHex}`)
            
        } else {
        response = await fetch(`https://www.thecolorapi.com/id?${idRGB}`)
        }
        
    if (!response.ok)   {
        throw new Error ('Could not find resource')
    }  
        const data = await response.json();
        code.textContent = data.name.value
    }
    catch(error) {
        console.log(error)
    }
}



button1.addEventListener('click', changeBackground);
button2.addEventListener('click', customRGB);
button3.addEventListener('click', activateMouse);
button4.addEventListener('click', customHex)
button5.addEventListener('click', getColourName)




