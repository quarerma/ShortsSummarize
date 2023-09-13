import ytdl from 'ytdl-core'
import fs from 'fs'
import { error } from 'console'

export const download = (videoId) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly"})
    .on("info", (info) => 
    {
        const seconds = info.formats[0].aproxDurationMs /  1000 

        if(seconds > 60){
            throw new  Error("A duração desse vídeo é maior que 60 segundos")
        }
    }
    ).on("end", () => {
        console.log("Download do vídeo finalizado")
    })
    .on("error", (error) => {
        console.log("Não foi possível fazer o download. Detalher do erro:", error)
    })
    .pipe(fs.createReadStream("./tmp/audio.mp4"))
}