const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function printAllElements(obj, indent = 0) {
    const indentString = ' '.repeat(indent);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          console.log(`${indentString}${key}:`);
          printAllElements(value, indent + 2); // Recursive call with increased indent
        } else {
          console.log(`${indentString}${key}: ${value}`);
        }
      }
    }
  }

export {formatPrice, printAllElements}