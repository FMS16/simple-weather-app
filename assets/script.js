window.onload = () => {

    document.getElementById('search_box').classList.add('show-search');


    document.getElementById('input_search').addEventListener('click', () => {

        let city = document.getElementById('input_city').value;
        if (city != '') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=819ac31ef2f93fd045370e9ec093599d`)
                .then(response => response.json())
                .then(data => loadData(data))
                .catch(error => console.log(error))
        }

    });
}
const loadData = (prop) => {
    let message;
    console.log(prop);
    let notFoundContainer = document.getElementById('not_found');

    let temp = document.getElementById('temp_info');
    let extra = document.getElementById('extra_info');

    if (prop.cod == "404") {
        temp.innerHTML = "";
        extra.innerHTML = "";
        notFoundContainer.classList.add("show");
        return;
    } else if (prop) {
        document.getElementById('not_found').classList.remove("show");
        document.getElementById('temp_info').innerHTML = `<img class='weather-img' src='http://openweathermap.org/img/w/${prop.weather[ 0 ].icon}.png'>`
        document.getElementById('temp_info').innerHTML += `<h1 class='weather-main'>${(prop.main.temp - 273.15).toFixed(1)} C</h1>`;

        document.getElementById('extra_info').innerHTML = `<p><i class="fa-solid fa-temperature-half"></i>${prop.main.humidity}%</p>`
        document.getElementById('extra_info').innerHTML += ` <p><i class="fa-solid fa-wind"></i>${prop.wind.speed}</p>`



        temp.classList.add("show");
        extra.classList.add("show");
    }
}