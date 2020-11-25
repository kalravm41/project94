const imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

async function start() {
  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas
  document.body.append('Loaded')
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    // var resultent = results.label;
    // console.log(results);
    results.forEach(result=>{
      var resultref = [result.label.split(" ")]
      // console.log(resultref);
      for(var i= 0 ; i<3 ; i++ ){
        var k = resultref[0].filter(function(params) {
          return params === 'unknown'
        })
        console.log(k[0]);
        // console.log(resultref[0]);
      // if(resultref[i] === 'unknown'){console.log('UNKNOWN');}
      // if(resultref[i] != 'unknown'){console.log('KNOWN');}
      // // console.log(resultref[i]);
      // if(resultref[i] === 'undefined'){console.log('UNDEFINED');}
      }
    })
    results.forEach((result, i) => {
      // var resultref = result.label.split(" ");
      // console.log(resultref);
      // for(var i= 0 ; i<3 ; i++ ){
      // if(resultref[i] === 'unknown'){console.log('UNKNOWN');}
      // if(resultref[i] !== 'unknown'){console.log('KNOWN');}
      // }
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  })
}

async function loadLabeledImages() {
  const labels = ['Kalrav','Archana']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://firebasestorage.googleapis.com/v0/b/my-hospital-project.appspot.com/o/user_Images%2Fbhattarchana98%40gmail.com.jpeg?alt=media&token=4d63049f-82fe-4c96-b96f-5d14c5f93c42`)

  //       const img = axios.get('https://firebasestorage.googleapis.com/v0/b/my-hospital-project.appspot.com/o/user_Images%2FPhoto%20on%2019-11-20%20at%207.34%20PM.jpeg?alt=media&token=d7762d0a-2011-4635-bd02-1e8d44f6186e',

  //  {headers: {'Access-Control-Allow-Origin': '*',}}
  const k = 'https://firebasestorage.googleapis.com/v0/b/my-hospital-project.appspot.com/o/user_Images%2Fbhattarchana98%40gmail.com.jpeg?alt=media&token=4d63049f-82fe-4c96-b96f-5d14c5f93c42';
  const a = k.split("/");
  const l = a[7].split("%2F");
  const r = l[1].split("?");
  const A = r[0].split("%40");
  const v = A[0]+"@"+A[1];
  // const r = l ? l[1] : null
  console.log(v);
  //  )
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}

// https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg
// Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark',
// https://raw.githubusercontent.com/kalravm41/any/main/kbk/Kalrav/1.jpeg
// https://raw.githubusercontent.com/kalravm41/any/main/kbk/Kalrav/1.jpeg

//https://firebasestorage.googleapis.com/v0/b/my-hospital-project.appspot.com/o/user_Images%2Fbhattarchana78%40gmail.com.jpeg?alt=media&token=2a0ffa0a-fedf-444b-8c83-35c646713fad;

//https://firebasestorage.googleapis.com/v0/b/my-hospital-project.appspot.com/o/user_Images%2Fbhattarchana68%40gmail.com?alt=media&token=f99a0e8d-60e0-4de4-9246-017122009c53;