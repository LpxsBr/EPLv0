const toEPLView = (id) => {

    var codigo = document.getElementById(id).value

    console.log(codigo)
    var codigoSplited = codigo.split('\n')

    const convertLen = (value, len) => {
        value = String(value).replace(',', '.')
        return (
            `${Number(value) * (len / 100)}px`
        )
    }

    const extractCode = (code = '') => {
        return code.substring(1, code.length).split(',');
    }

    let fC = 40

    const ETIQ = document.getElementById('Etq')
    ETIQ.style.position = 'relative'

    while(ETIQ.firstChild){
        ETIQ.removeChild(ETIQ.firstChild)
    }

    codigoSplited.forEach(element => {

        // ;ALTURA DA ETIQUETA
        if (element[0] == 'Q') {
            ETIQ.style.height = convertLen(element.substring(1, element.length), fC);
            console.log(convertLen(element.substring(1, element.length), fC));
        }
        // ;COMPRIMENTO DA ETIQUETA
        if (element[0] == 'q') {
            ETIQ.style.width = convertLen(element.substring(1, element.length), fC);
            console.log(convertLen(element.substring(1, element.length), fC));
        }
        // ORIENTAÇÃO
        // if (element[0] == 'Z') {
        //     if (element[1] == 'B') { ETIQ.style.alignItems = 'flex-end' };
        //     if (element[1] == 'T') { ETIQ.style.alignItems = 'flex-start' };
        // }

        // cod barras B100,405,0,1,3,2,60,B,"#CODIGO#"
        if (element[0] == 'B') {
            let barCodeConfig = extractCode(element);
            console.log(barCodeConfig);
            const c = document.createElement('div');
            c.className = 'bar-code-39';
            c.textContent = barCodeConfig[8];
            c.style.position = 'absolute';
            c.style.fontSize = '1.2rem';
            c.style.bottom = convertLen(barCodeConfig[1], fC);
            c.style.left = convertLen(barCodeConfig[0], fC);
            ETIQ.appendChild(c);

        }

        if (element[0] == 'A') {
            let textConfig = extractCode(element);
            console.log(textConfig);
            const t = document.createElement('p');
            t.style.left = convertLen(textConfig[0], fC);
            t.style.bottom = convertLen(textConfig[1], fC);
            let rotate = Number(textConfig[2])
            console.log(rotate);
            if(rotate == 0){t.style.transform = 'rotate(0deg)' }
            if(rotate == 1){t.style.transform = 'rotate(90deg)' }
            if(rotate == 2){t.style.transform = 'rotate(180deg)' }
            if(rotate == 3){t.style.transform = 'rotate(270deg)' }
            t.className = 'text-content';
            t.textContent = textConfig[8].includes('"') && textConfig[8][0] == '"' && textConfig[8][textConfig[8].length - 1] == '"' ? textConfig[8].replaceAll('"', '') : 'Invalid Text';
            t.style.position = 'absolute';
            t.style.fontSize = '1.2rem';
            ETIQ.appendChild(t);

        }
        // if(element.includes('q')) {ETIQ.style.width = `${element.substring(1, element.length)}px`}
    });

}

const eplHighLight = (id) => {
    var editor = document.getElementById(id).value;

    const info = document.getElementById('info');

    let codigo = editor.split('\n');

    const example = {
        B: 'Codigo de barras',
        A: 'Texto',
        Q: 'Altura da etiqueta',
        q: 'Largura da etiqueta'
    }
    var key = codigo[codigo.length - 1][0]
    addEventListener('keyup', ()=>{
        if(typeof(key) != undefined && typeof(key) != 'undefined'){
            console.log(example[key]);
            info.textContent = example[key]
        }
    })
    
    
    
} 

console.log('to on, teste')