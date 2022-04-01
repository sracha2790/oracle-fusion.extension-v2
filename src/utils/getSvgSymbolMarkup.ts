const attributes = {
  size: { width: 200, height: 80 },
  type: 'app.Action',
  position: {
    x: 160,
    y: 148,
  },
  angle: 0,
  id: '0619ff3d-7bb1-4d5f-94e3-2b359b545077',
  z: 96,
};
const svgAttributes = {
  rect: { width: 330, height: 125 },
  '.card': {
    fill: '#161E29',
    stroke: '#3A424F',
    'stroke-width': 2,
    'pointer-events': 'visiblePainted',
    rx: 10,
    ry: 10,
  },
  image: {
    width: 40,
    height: 40,
    ref: '.card',
    'ref-x': 7,
    'ref-y': 6,
    xlinkHref:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUABUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8969F0v4A+M9c+DeofE/TtOjv/Cun3psrx7aZZJ7YhQTJJEMssfzKNx9QcY5q5+zv8b4/gH41vfEEvhHR/Ga3OnvYfYNbjDwx7pIn80DB+YeXt+jmvu3wL/wUY8C6H8B/FHiK88I+FdL8V3dwdOtPB2h2pjN0vlkiW6YqFMPzMOM9COrYHfJyWyOSKT3Z+YNFWdUvv7T1K7vPs8Fp9omeb7Papsii3MTtReyjOAOwAorQkrUUUUAFFFFAH//Z',
  },
  '.rank': {
    'text-decoration': 'none',
    ref: '.card',
    'ref-x': 0.42,
    'ref-y': 0.13,
    'font-size': 25,
    'text-anchor': 'end',
    fill: '#FFFFFF',
    text: 'Action : ',
  },
};
export const getSvgSymbolMarkup = (src: string, actionName: string, isLarge: boolean) => {
  const text = {
    '.in': {
      width: 290,
      height: isLarge ? 48 : 40,
      'ref-x': 0.04,
      'ref-y': 0.49,
    },
    '.name': {
      fill: '#fff',
      'font-weight': '400',
      'font-size': 20,
      'ref-x': 0.08,
      'ref-y': isLarge ? 0.53 : 0.59,
      'text-anchor': 'left',
      text: actionName,
    },
  };
  const name = { src, svgAttributes: { ...attributes, attrs: { ...svgAttributes, ...text } } };
  return name;
};
