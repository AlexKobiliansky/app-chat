import tinycolor from 'tinycolor2';

const getCorrectIndex = number => {
  return number > 255 ? 255 : number < 0 ? 0 : number
}

const hash = () => {
  const [r, g, b] = hash
    .substr(1, 4)
    .split('')
    .map(char => getCorrectIndex(char.charCodeAt(0)));

  return {
    color: tinycolor({r, g, b}).saturate(20).toHexString(),
    colorLighten: tinycolor({r, g, b}).lighten(35).saturate(20).toHexString()
  };
}

export default hash;