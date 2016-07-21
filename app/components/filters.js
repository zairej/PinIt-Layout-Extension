
export function greyFilter(data) {
  for (let i = 0; i < data.length; i += 4) {
    const grayscale = (data[i] * 0.3) + (data[i + 1] * 0.59) + (data[i + 2] * 0.11);
    data[i] = grayscale;               // red
    data[i + 1] = grayscale;        // green
    data[i + 2] = grayscale;        // blue
  }
}

export function sepiaFilter(data) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * 1.07;
    data[i + 1] = data[i + 1] * 0.74;
    data[i + 2] = data[i + 2] * 0.43;
  }
}
