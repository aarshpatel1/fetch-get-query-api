const breedList = document.getElementById("breed-list")
const dogBreedsAPI = fetch("https://dog.ceo/api/breeds/list/all")

// dogBreedsAPI.then((response) => response.json()) // shorthand method
dogBreedsAPI.then((response) => {
    return response.json()
}).then((data) => {
    console.log(data)
    const dogBreeds = Object.keys(data.message) // Object.keys() method takes an object as its argument and returns an array of the object's own enumerable property keys
    console.log(dogBreeds)
    breedList.innerHTML = `<option selected>Select a Dog Breed</option>`
    dogBreeds.forEach((breed) => {
        breedList.innerHTML += `
        <option>${breed}</option>
        `
    });
})


breedList.addEventListener("change", (event) => {
    const selectedBreed = event.target.value

    if (selectedBreed !== "Select a Dog Breed") {
        const selectedBreedData = fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
        selectedBreedData.then((response) => response.json())
            .then((breedData) => {
                console.log(breedData)
                const imgContainer = document.getElementById("img-container")
                imgContainer.innerHTML = ""
                imgContainer.innerHTML = `
                    <img src="${breedData.message}" alt="${selectedBreed}">
                `
            })
            .catch((error) => console.log(error))
    }
})