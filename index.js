const fs = require('fs');
const mm = require('music-metadata');
const path = require('path');

function secondsToTimecode(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const pad = (number) => {
    return number.toString().padStart(2, '0');
  };

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

function formatBitRateAndDepth(metadata) {
  const bitDepth = `${metadata.format.bitsPerSample} bit`;
  const sampleRate = metadata.format.sampleRate % 1000 === 0
    ? `${(metadata.format.sampleRate / 1000).toFixed(0)} kHz`
    : `${(metadata.format.sampleRate / 1000).toFixed(1)} kHz`;

  return `${bitDepth}/${sampleRate}`;
}

function formatChannelCount(channelCount) {
    switch (channelCount) {
        case 1:
            return "Mono";
        case 2:
            return "Stereo";
        case 4:
            return "Quad";
    }
    return channelCount;
}

async function readFilesInFolder(folderPath, metadataList) {
  const files = await fs.promises.readdir(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await readFilesInFolder(filePath, metadataList); // Recursively read files in subfolders
    } else {
      const index = metadataList.length + 1;
      try {
        const metadata = await mm.parseFile(filePath);
        const extension = path.extname(file);
        metadataList.push({
          track_num: index,
          file_name: file,
          duration: secondsToTimecode(metadata.format.duration),
          format: formatBitRateAndDepth(metadata),
          extension: extension.split('.')[1].toUpperCase(),
          channels: formatChannelCount(metadata.format.numberOfChannels)
        });
      } catch (error) {
        console.error(`Error reading metadata for ${file}:`, error);
      }
    }
  }
}

const folderPath = process.argv[2];
const metadataList = [];

readFilesInFolder(folderPath, metadataList).then(() => {
  // Create a CSV string
  let csvContent = 'Track #, File Name,Duration,Format, File,Channels\n';
  metadataList.forEach(metadata => {
    csvContent += `${metadata.track_num},${metadata.file_name},${metadata.duration},${metadata.format},${metadata.extension},${metadata.channels}\n`;
  });

  // Write CSV string to a file
  fs.promises.mkdir("./output/", { recursive: true }).then(() => {
    fs.writeFile('./output/tracklist.csv', csvContent, (err) => {
      if (err) {
        console.error('Error writing to CSV file:', err);
        return;
      }
      console.log('File saved to /output/tracklist.csv');
    });
  }).catch(err => {
    console.error('Error creating output directory:', err);
  });
}).catch(err => {
  console.error('Error reading files in folder:', err);
});
