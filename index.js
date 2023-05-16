var button = document.getElementById("get-location");

button.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(success, fail);
})

async function success(position) {
    var text=document.getElementById("show-text");
    var img = document.getElementById("img");
    var type= document.getElementById("type");

    const result= await get_data(position.coords.latitude,position.coords.longitude);
    console.log(result)
    let str=result.location.name
    str2=str.concat(" <br>Current Temprature is-",result.current.temp_c);

    text.innerHTML = str2;
    img.src=result.current.condition.icon;
    img.style.visibility = "visible";
    type.innerHTML=result.current.condition.text;

}
function fail(position) {
    console.log("Error:",position);
}
async function get_data(lat,long){
    const promis=await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=5aace33d334f4d609e650639231605&q=${lat},${long}&aqi=yes`
        );
        return await promis.json();
} 