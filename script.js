let filters = {
    brightness: {
        name: "Brightness",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        name:"Contrast",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        name: "Saturation",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        name: "Hue Rotation",
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        name: "Blur",
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        name: "Grayscale",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        name: "Sepia",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        name: "Opacity",
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        name: "Invert",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetbtn = document.querySelector("#reset-btn");
const downloadbtn = document.querySelector("#download-btn");
let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");
const presetsContainer = document.querySelector(".presets");

function createFilterElement(key,name, unit="%", value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const p = document.createElement("p");
    p.textContent = name;

    const input = document.createElement("input");
    input.name = key;
    input.type = "range";
    input.id = key;
    input.min = min;
    input.max = max;
    input.value = value;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[key].value = input.value;
        applyFilters();
    })

    return div;
}

function createFilters(){
    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key,filters[key].name, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
        filtersContainer.appendChild(filterElement);
    });
}

createFilters();

imgInput.addEventListener("change", (event)=>{
    imageCanvas.style.display = "block";
    const placeholder = document.querySelector(".placeholder");
    placeholder.style.display = "none";
    file = event.target.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
});

function applyFilters(){
    canvasCtx.clearRect(0,0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim();
    canvasCtx.drawImage(image,0,0);
}

resetbtn.addEventListener("click", () => {
    filters = {
    brightness: {
        name: "Brightness",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        name:"Contrast",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        name: "Saturation",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        name: "Hue Rotation",
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        name: "Blur",
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        name: "Grayscale",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        name: "Sepia",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        name: "Opacity",
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        name: "Invert",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
            
    }
    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
});

downloadbtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-img.jpg";
    link.href = imageCanvas.toDataURL();
    link.click();
})

const presets = {
    clarendon: {
        brightness: 110,
        contrast: 125,
        saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    lark: {
        brightness: 115,
        contrast: 95,
        saturation: 115,
        hueRotation: 5,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    valencia: {
        brightness: 110,
        contrast: 95,
        saturation: 110,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    gingham: {
        brightness: 105,
        contrast: 90,
        saturation: 75,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    aden: {
        brightness: 110,
        contrast: 85,
        saturation: 80,
        hueRotation: 15,
        blur: 0,
        grayscale: 5,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    xpro: {
        brightness: 105,
        contrast: 145,
        saturation: 140,
        hueRotation: 340,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    goldenHour: {
        brightness: 115,
        contrast: 110,
        saturation: 125,
        hueRotation: 15,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    fadedFilm: {
        brightness: 110,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    moody: {
        brightness: 85,
        contrast: 135,
        saturation: 85,
        hueRotation: 150,
        blur: 0,
        grayscale: 10,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    monochrome: {
        brightness: 105,
        contrast: 125,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    perPetua: {
        brightness: 110,
        contrast: 105,
        saturation: 120,
        hueRotation: 185,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    crema: {
        brightness: 108,
        contrast: 90,
        saturation: 85,
        hueRotation: 5,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 90,
        contrast: 145,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    softGlow: {
        brightness: 120,
        contrast: 85,
        saturation: 110,
        hueRotation: 10,
        blur: 0,
        grayscale: 0,
        sepia: 12,
        opacity: 100,
        invert: 0
    },

    kodakGold: {
        brightness: 108,
        contrast: 115,
        saturation: 125,
        hueRotation: 12,
        blur: 0,
        grayscale: 0,
        sepia: 30,
        opacity: 100,
        invert: 0
    },
};

Object.keys(presets).forEach(presetName => {
    const presetBtn = document.createElement("button");
    presetBtn.classList.add("preset-btn")
    presetBtn.textContent = presetName;
    presetsContainer.appendChild(presetBtn);

    presetBtn.addEventListener("click", ()=>{
        const preset = presets[presetName];
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        });
        applyFilters();
        filtersContainer.innerHTML = "";
        createFilters();
    });
});

