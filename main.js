const btn = document.querySelector('button');

function convertTimeStamp(timeStamp,timeZone){
    const convertTimeZone = timeZone/3600;
    const date = new Date(timeStamp*1000)
    const options = {
        day : 'numeric',
        month : 'long',
        // year : 'numeric',
        hour : 'numeric',
        minute : 'numeric',
        timeZone : `Etc/GMT${convertTimeZone>=0?'-':'+'}${Math.abs(convertTimeZone)%1 == 0?Math.abs(convertTimeZone):Math.abs(Math.floor(convertTimeZone))}`,
        hour12: true
    }
    const timeObj = {
        date : date.toLocaleString("en-US",options),
        time : date.toLocaleString("en-US",{timeZone : `Etc/GMT${convertTimeZone>=0?'-':'+'}${Math.abs(convertTimeZone)%1 == 0?Math.abs(convertTimeZone):Math.abs(Math.floor(convertTimeZone))}`,
        hour12: false}),
    }
    return timeObj
}

btn.addEventListener('click', async() => {
    const input = document.querySelector('#location')
    const inputTag = document.querySelector('.input')
    const main = document.querySelector('main');
    const section = document.querySelector('section');
    const city = input.value;
    
    main.style.height = '732px';
    inputTag.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    section.classList.add('flex');
    
    
    try {
        const apiKey = '5b97eeed4149304b0193a2648977300d'
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const json = await data.json();
        const date = convertTimeStamp(json.dt,json.timezone);
        const cityName = document.querySelector('#city');
        const time = document.querySelector('#date');
        const temp = document.querySelector('#temp');
        const description = document.querySelector('.description');
        const humidity = document.querySelector('#humidity');
        const windSpeed = document.querySelector('#wind');

        cityName.innerText = json.name;
        time.innerText = date.date.replace('at',',');
        temp.innerText = Number(json.main.temp).toFixed(0) + '°';
        description.innerText = json.weather[0].description;
        humidity.innerText = json.main.humidity + '%';
        windSpeed.innerText = Number(json.wind.speed).toFixed(0) + 'Km/h';
        setTimeout(()=>{
            section.style.opacity = '1';
        },500)

        const hour24 = Number(date.time.slice(10,12))
        console.log(date.time.slice(10,12));
        
        if(hour24 >= 6 && hour24 < 18){
            if(main.classList.contains('night')){
                main.classList.remove('night');
            }
            switch(json.weather[0].main){
                case 'Clear' :
                    main.style.backgroundImage = 'url(./image/Day-Clear.jpg)';
                    break;
        
                case 'Rain' :
                    main.style.backgroundImage = 'url(./image/Day-Rain.jpg)';
                    break;
        
                case 'Snow' :
                    main.style.backgroundImage = 'url(./image/Day-Snow.jpg)';
                    break;
        
                case 'Clouds' :
                    main.style.backgroundImage = 'url(./image/Day-Cloud.jpg)';
                    break;
        
                case 'Mist' :
                    main.style.backgroundImage = 'url(./image/Day-Mist.jpg)';
                    break;
        
                case 'Haze' :
                    main.style.backgroundImage = 'url(./image/Day-Mist.jpg)';
                    break;
        
                default:
                    main.style.backgroundImage = 'url(./image/Day-Clear.jpg)';
                    break;
            }
        }else{

            main.classList.add('night');
            switch(json.weather[0].main){
                case 'Clear' :
                    main.style.backgroundImage = 'url(./image/Night-Clear.jpg)';
                    break;
        
                case 'Rain' :
                    main.style.backgroundImage = 'url(./image/Night-Rain.jpg)';
                    break;
        
                case 'Snow' :
                    main.style.backgroundImage = 'url(./image/Night-Snow.jpg)';
                    break;
        
                case 'Clouds' :
                    main.style.backgroundImage = 'url(./image/Night-Cloud.jpg)';
                    break;
        
                case 'Mist' :
                    main.style.backgroundImage = 'url(./image/Night-Mist.jpg)';
                    break;
        
                case 'Haze' :
                    main.style.backgroundImage = 'url(./image/Night-Mist.jpg)';
                    break;
        
                default:
                    main.style.backgroundImage = 'url(./image/Night-Clear.jpg)';
                    break;
            }
        }
    } catch (error) {
        section.classList.remove('flex');
        console.log('catch-error');
        main.style.backgroundImage = 'url(./image/invalid.jpg)';
        section.style.opacity = '0';

    }
    
    
    
    input.value = '';
})