# AudioLibraryTrackSheetGenerator
Generates a sound library track list in CSV format

## Usage
To utilize this script, clone the repository, CD into the folder, and after installing dependencies (`npm i`), run the following command:

`node index.js your-directory-path`

The directory path should be the path to the inside of the folder containing all your audio files.

## Format
The script formats your CSV as seen below:

| Track Number | File Name | Duration | Format | Channel Count |
|---|---|---|---|---|
| 1 | my_audio_file_1.wav | 02:32 | 24 bit/48 kHz | Stereo |
| 2 | my_audio_file_2.wav | 01:01 | 24 bit/48 kHz | Stereo |
| 3 | my_audio_file_3.wav | 02:03:03 | 24 bit/48 kHz | Stereo |
| 4 | my_audio_file_4.wav | 04:23 | 24 bit/48 kHz | Stereo |