const servicePic = ['url("img/web 600x1000.png")', 'url("img/Retouch 600 x1000.png")', 'url("img/interior 600x1000.png")'];
const serviceHeader = ["Web design", "Retouching", "3d design"];
const serviceText = ["Front end service in html, css, javascript technology", "beauty, nature, real estate, interior, product", "product presentation, interior visualisation, real estate visualisation"];
const serviceImg = document.querySelector('.services div');
const serviceH1 = document.querySelector('.services h1');
const serviceP = document.querySelector('.services p');
const serviceDiv = document.querySelector('.services div:last-child');
const menu = document.querySelector('.nav');
const menuLi = [...document.querySelectorAll('li')];
const burger = document.querySelector('.OliNav');
const content = document.querySelectorAll('.mainContainer>div');
const logo = document.querySelectorAll('.Oli');



// logo home button
logo.forEach(item => {
  item.addEventListener('click', function(){
    menu.classList.remove('active');
    burger.classList.remove('active');
    content.forEach(item => {
      item.classList.remove('active');
    })
  })
})

// opening menu
burger.addEventListener('click', function(){
    menu.classList.toggle('active');
    burger.classList.toggle('active');
    
})

// burger animation


// menu

// pobranie li i odczytanie z kliknietego elementu jego ID i przechowanie wyniku w zmiennej current
menuLi.forEach(li =>{
    li.addEventListener('click', function(){
        menu.classList.toggle('active');
        burger.classList.toggle('active');
        const current = this.getAttribute('id');
        
        // porownani nazwy klasy z divow z nazwa id z listy menu
        content.forEach(item =>{
            if(item.classList.contains(current)){
                item.classList.add('active')
            }else{
                item.classList.remove('active')
            }
        })
    })
})




// deklaracje zmiennych do animacja pojawiania sie zawartosci sekcji "services"
const opacityAnimate = [
  { opacity: '0' },
  { opacity: '1' },
];

const appearAnimate = [
  { clipPath : "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
  { clipPath : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
];

const textAppearAnimate = [
  { clipPath : "polygon(0 0, 100% 0, 100% 0, 0 0)" },
  { clipPath : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
]

const showTiming = {
  duration: 1000,
  iterations: 1,
}

const clipTiming = {
  duration: 1000,
  iterations: 1,
}

const textClipingTiming = {
  duration: 1000,
  iterations: 1,
}




// SWIPE IMPLEMENTATION
let startingY, movingY;
let moving = false;
let activeElement = 0;

// przypisanie wstepnych styli i zawartosci sekcji "services", nie zwiazane z mplementacja "swipe"
serviceImg.style.backgroundImage = servicePic[activeElement];
serviceH1.textContent = serviceHeader[activeElement];
serviceP.textContent = serviceText[activeElement];

document.querySelector('.mainContainer').addEventListener('touchstart', (e) => {
  startingY = e.touches[0].clientY;
  // console.log("start" + startingY)
});

document.querySelector('.mainContainer').addEventListener('touchmove', (e) => {
  moving = true;
  movingY = e.touches[0].clientY
  // console.log("move" + movingY)
});

document.querySelector('.mainContainer').addEventListener('touchend', (e) => {

  //swipe down
  if( startingY - movingY < -100){
    activeElement++;

    if(activeElement == 3){
        activeElement = 0
    }
  
    // podmiana styli i zawartosci sekcji "services", nie zwiazane z mplementacja "swipe"
    serviceH1.textContent = serviceHeader[activeElement];
    serviceImg.style.backgroundImage = servicePic[activeElement];
    serviceP.textContent = serviceText[activeElement];

    // animowanie pojawiajacych sie styli i zawartosci sekcji "services". Deklaracja zmiennych powyzej. Nie zwiazane z implementacja "swipe"
    serviceDiv.animate(appearAnimate, clipTiming);
    serviceH1.animate(appearAnimate, clipTiming);
    serviceP.animate(textAppearAnimate, textClipingTiming);
    serviceImg.animate(opacityAnimate, showTiming);
  }

  // swipe up
  else if( startingY - movingY > 100 ){
    activeElement--;

    if(activeElement == -1){
      activeElement = 2
  }

  // podmiana styli i zawartosci sekcji "services", nie zwiazane z mplementacja "swipe"
  serviceH1.textContent = serviceHeader[activeElement];
  serviceImg.style.backgroundImage = servicePic[activeElement];
  serviceP.textContent = serviceText[activeElement];

  // animowanie pojawiajacych sie styli i zawartosci sekcji "services". Deklaracja zmiennych powyzej. Nie zwiazane z implementacja "swipe"
  serviceDiv.animate(appearAnimate, clipTiming);
  serviceH1.animate(appearAnimate, clipTiming);
  serviceP.animate(textAppearAnimate, textClipingTiming);
  serviceImg.animate(opacityAnimate, showTiming);
}
  }
    );


// TLO
let canvas =  document.querySelector("#c");

const loader = new THREE.TextureLoader();
// const sakura = loader.load('./sakura.png');
// const bkg = loader.load("img/background.png");

// scene
const scene = new THREE.Scene();

// renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setClearColor( 0xffffff, 0); // przezroczystosc tla

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

window.addEventListener('resize', () =>
{
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})

 // geometry
const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 1000;
const positionArray = new Float32Array(particlesCount * 3);

for( let i = 0; i < particlesCount; i++){
  positionArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

// materials
const particlesMaterial = new THREE.PointsMaterial( { 
  size: 0.05,
  color: '#ffb6c1' 
});

// meshes
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// lights

// mouse
document.addEventListener('mousemove', animateParticles)

let mouseX = 0;
let mouseY = 0;
let flag = 0;

function animateParticles(e){
    mouseX = e.clientX / canvas.width * 20 - 10;
    mouseY = e.clientY / canvas.height * 20 - 10;
    flag = 1;
}

const clock = new THREE.Clock()

// pętla która na bierząco updatuje scenę, jak gameloop
function animate(){
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();
  if(flag == 0) {
    particlesMesh.rotation.y += deltaTime * 0.05;
  }
    particlesMesh.rotation.x -= mouseY * deltaTime * 0.008;
    particlesMesh.rotation.y -= mouseX * deltaTime * 0.008;


    renderer.render(scene, camera);
}
animate();