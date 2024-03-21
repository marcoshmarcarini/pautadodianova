import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getFirestore, collection, query, where, orderBy, getDocs } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const pautadodia = document.querySelector('#pautadodia')
const dataDeHoje = document.querySelector('#dataDeHoje')

const firebaseConfig = {
    apiKey: 'AIzaSyBN-qpVqbeeU7IMM-sdLPfF5rVEQlI7LZM',
    authDomain: 'pautadodia-46332.firebaseapp.com',
    projectId: 'pautadodia-46332',
    storageBucket: 'pautadodia-46332.appspot.com',
    messagingSenderId: '719753994098',
    appId: '1:719753994098:web:8c76159b05792e16c2c7eb'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

let jobs = {
    bruno: [], dani: [], juninho: [],
    leandro: [], luiz: [], rafaela: [],
    renan: [], rodolfo: [], thiago: [],
    victoria: []
}

const dataHoje = () => {
    const currentData = new Date().toLocaleDateString('pt-BR')
    return currentData
}

dataDeHoje.innerHTML += `<h2 class="dataDeHoje">Pauta do dia: ${dataHoje()}</h2>`

const createJobList = (jobsData) => {
    let html = ''
    jobsData.forEach(job => {
        html += `<li class="cardItem">${job.nomeDoJob}</li>`
    })
    return html
}

const fetcherData = async () => {
    try {
        
        const bruno = query(collection(db, "jobs"), where("responsavelJob", "==", "Bruno"), orderBy('timeStamp', 'desc'))
        const dani = query(collection(db, "jobs"), where("responsavelJob", "==", "Dani"), orderBy('timeStamp', 'desc'))
        const juninho = query(collection(db, "jobs"), where("responsavelJob", "==", "Juninho"), orderBy('timeStamp', 'desc'))
        const leandro = query(collection(db, "jobs"), where("responsavelJob", "==", "Leandro"), orderBy('timeStamp', 'desc'))
        const luiz = query(collection(db, "jobs"), where("responsavelJob", "==", "Luiz"), orderBy('timeStamp', 'desc'))
        const rafaela = query(collection(db, "jobs"), where("responsavelJob", "==", "Rafaela"), orderBy('timeStamp', 'desc'))
        const renan = query(collection(db, "jobs"), where("responsavelJob", "==", "Renan Lessa"), orderBy('timeStamp', 'desc'))
        const rodolfo = query(collection(db, "jobs"), where("responsavelJob", "==", "Rodolfo"), orderBy('timeStamp', 'desc'))
        const thiago = query(collection(db, "jobs"), where("responsavelJob", "==", "Thiago"), orderBy('timeStamp', 'desc'))
        const victoria = query(collection(db, "jobs"), where("responsavelJob", "==", "Victoria" || "Victória"), orderBy('timeStamp', 'desc'))

        const brunoSnapshot = await getDocs(bruno)
        const daniSnapshot = await getDocs(dani)
        const juninhoSnapshot = await getDocs(juninho)
        const leandroSnapshot = await getDocs(leandro)
        const luizSnapshot = await getDocs(luiz)
        const rafaelaSnapshot = await getDocs(rafaela)
        const renanSnapshot = await getDocs(renan)
        const rodolfoSnapshot = await getDocs(rodolfo)
        const thiagoSnapshot = await getDocs(thiago)
        const victoriaSnapshot = await getDocs(victoria)

        const brunoData = []
        const daniData = []
        const juninhoData = []
        const leandroData = []
        const luizData = []
        const rafaelaData = []
        const renanData = []
        const rodolfoData = []
        const thiagoData = []
        const victoriaData = []

        brunoSnapshot.forEach((doc) => {
            brunoData.push({ id: doc.id, ...doc.data() })
        })
        daniSnapshot.forEach((doc) => {
            daniData.push({ id: doc.id, ...doc.data() })
        })
        juninhoSnapshot.forEach((doc) => {
            juninhoData.push({ id: doc.id, ...doc.data() })
        })
        leandroSnapshot.forEach((doc) => {
            leandroData.push({ id: doc.id, ...doc.data() })
        })
        luizSnapshot.forEach((doc) => {
            luizData.push({ id: doc.id, ...doc.data() })
        })
        rafaelaSnapshot.forEach((doc) => {
            rafaelaData.push({ id: doc.id, ...doc.data() })
        })
        renanSnapshot.forEach((doc) => {
            renanData.push({ id: doc.id, ...doc.data() })
        })
        rodolfoSnapshot.forEach((doc) => {
            rodolfoData.push({ id: doc.id, ...doc.data() })
        })
        thiagoSnapshot.forEach((doc) => {
            thiagoData.push({ id: doc.id, ...doc.data() })
        })
        victoriaSnapshot.forEach((doc) => {
            victoriaData.push({ id: doc.id, ...doc.data() })
        })

        jobs = {
            bruno: brunoData, dani: daniData, juninho: juninhoData,
            leandro: leandroData, luiz: luizData, rafaela: rafaelaData,
            renan: renanData, rodolfo: rodolfoData, thiago: thiagoData,
            victoria: victoriaData,
        }

        console.log(brunoData, daniData, juninhoData)

        Object.keys(jobs).forEach((responsavel) => {
            const jobsData = jobs[responsavel]
            const jobListHTML = createJobList(jobsData)
            console.log(jobListHTML)
            const responsavelHTML = `
                <div class="tCard">
                <h3 class="cardTitulo">${responsavel.toUpperCase()}</h3>
                <ul class="cardList">${jobListHTML}</ul>
                </div>
            `
            pautadodia.innerHTML += responsavelHTML
        })

    } catch (error) {
        console.error(`Erro ao buscar os dados. ${error}`)
    }
}

fetcherData() 




