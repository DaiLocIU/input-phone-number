type Parts = (string | false | undefined)[];

export default (...parts: Parts) => parts.filter(Boolean).join(' ');
