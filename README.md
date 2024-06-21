# Audio Library TrackSheet Generator
This script generates a CSV file containing metadata for audio files within a specified folder and its subfolders.

## Usage
1. Confirm you have Node.js installed on your system.
2. Install the required dependencies by running `npm install` in the terminal.
3. Run the script with the following command:

```
node index.js <folder_path>
```

#### Note: Replace <folder_path> with the path to the directory containing your audio files.

## Output

The script formats your CSV as seen below:

| Track Number | File Name | Duration | Format | File | Channel Count |
|---|---|---|---|---|---|
| 1 | my_audio_file_1.wav | 02:32 | 24 bit/48 kHz | WAV | Stereo |
| 2 | my_audio_file_2.wav | 01:01 | 24 bit/48 kHz | OGG | Stereo |
| 3 | my_audio_file_3.wav | 02:03:03 | 24 bit/48 kHz | MP3 | Stereo |
| 4 | my_audio_file_4.wav | 04:23 | 24 bit/48 kHz | FLAC | Stereo |

#### Your file will be found in the output folder when the script finishes execution.
