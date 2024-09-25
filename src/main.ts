import './style.scss'

import {FilesetResolver,FaceStylizer} from "@mediapipe/tasks-vision";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello!</h1>
  <p><button id="run">Run</button>数秒かかります</p>
  <p><img id="image" src="./face-stylizer-input.png" alt=""></p>
  <p><canvas id="output" width="256" height="256"></canvas></p>
`


async function mainAsync(){
  const vision = await FilesetResolver.forVisionTasks(
    // path/to/wasm/root
    // TODO: ローカルで実行できるようにする
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  const faceStylizer = await FaceStylizer.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: "models/face_stylizer_color_sketch.task"
        },
      });
  if(!faceStylizer){
    throw new Error("faceStylizer is null");
  }
  const image = document.getElementById("image") as HTMLImageElement;
  const faceStylizerResult = faceStylizer.stylize(image);
  faceStylizer.close();

  // console.log(faceStylizerResult);
  if(!faceStylizerResult){
    throw new Error("faceStylizerResult is null");
  }

  const output = document.getElementById("output") as HTMLCanvasElement;

  const context=output.getContext("2d");
  if(!context){
    throw new Error("context is null");
  }

  const imageBitmap=faceStylizerResult.getAsImageBitmap();
  context.drawImage(imageBitmap,0,0);

  faceStylizerResult.close();
  console.log("end");
}


const run=document.getElementById("run") as HTMLButtonElement;
if(!run){
  throw new Error("run is null");
}

run.addEventListener("click",()=>{
  mainAsync().catch((error)=>{
    console.error(error);
  });
});
