if("serviceWorker" in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log("it's registered", reg))
        .catch((err) => console.log('its not registered'));
}