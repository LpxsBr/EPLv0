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
        if (element[0] == 'Z') {
            if (element[1] == 'B') { ETIQ.style.alignItems = 'flex-end' };
            if (element[1] == 'T') { ETIQ.style.alignItems = 'flex-start' };
        }

        // cod barras B100,405,0,1,3,2,60,B,"#CODIGO#"
        if (element[0] == 'B') {
            let barCodeConfig = extractCode(element);
            console.log(barCodeConfig);
            const c = document.createElement('div');
            c.className = 'bar-code-39';
            c.textContent = barCodeConfig[8];
            c.style.position = 'relative';
            c.style.fontSize = '1.2rem';
            c.style.bottom = convertLen(barCodeConfig[1], fC);
            c.style.left = convertLen(barCodeConfig[0], fC);
            ETIQ.appendChild(c);

        }
        // if(element.includes('q')) {ETIQ.style.width = `${element.substring(1, element.length)}px`}
    });

}