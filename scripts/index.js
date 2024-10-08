let pWord = document.getElementById('word')
let pHash = document.getElementById('hash')
let pZeros = document.getElementById('zeros')
let loadingScreen = document.getElementById('loading')


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getWord(){
    try{
        response = await fetch('https://api.dicionario-aberto.net/random');

        if(!response.ok){
            throw new Error(`Error during fetch, code ${response.status}`);
        }

        data = await response.json();
        return data['word']
    } catch (error){
        console.error(error.message);
    }
    
}

function countZeros(hash){
    let count = 0
    hashSplited = hash.split('')

    for (let i = 0; i < hashSplited.length; i++){
        if (hashSplited[i] == '0'){
            count += 4
        }else if (hashSplited[i] == '1'){
            count += 3
            break;
        }else if (['2', '3'].includes(hashSplited[i])){
            count += 2
            break;
        }else if (['4', '5', '6', '7'].includes(hashSplited[i])){
            count += 1
            break;
        }else{
            break;
        }
    }
    return count;
}

async function computeHash(){
    loadingScreen.style.display = 'flex';
    let word = await getWord();
    let hash = sha256(word);
    let zeros = countZeros(hash);

    document.getElementById('content').style.justifyContent = 'space-around'
    pWord.textContent = capitalize(word);
    pHash.textContent = hash;
    pZeros.textContent = 'Zeros: ' +  (zeros  || 'Nenhum');

    loadingScreen.style.display = 'none';
}