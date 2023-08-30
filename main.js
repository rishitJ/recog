Webcam.set({
    width:400,
    height:350,
    image_format:"png",
    png_quality:100
})

camera = document.getElementById("camera")
Webcam.attach(camera)

function capture_img()
{
    Webcam.snap(function(image_url)
    {
        console.log(image_url)
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+image_url+"'>"
    });
}

console.log("ml5 version", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Oq9ah9-yY/model.json", model_loaded)

function model_loaded()
{
    console.log("model is loaded")
}

function identify_img()
{
    img = document.getElementById("captured_img")
    classifier.classify(img,got_result)
}

function got_result(error, results)
{
    if (error) 
    {
        console.error(error)
    } 
    else 
    {
        console.log(results)
        document.getElementById("object_name").innerHTML = results[0].label
        document.getElementById("object_accuracy").innerHTML = (results[0].confidence *100).toFixed(2) + "%"
    }
}