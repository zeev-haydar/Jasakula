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

function formatWithDate(timestamptz: string | number | Date) {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Membuat objek Date dari timestamp
  const date = new Date(timestamptz);

  // Mendapatkan tanggal, bulan, dan tahun
  const tanggal = date.getDate();
  const namaBulan = bulan[date.getMonth()];
  const tahun = date.getFullYear();

  // Mengembalikan format [tanggal] [nama bulan] [tahun]
  return `${tanggal} ${namaBulan} ${tahun}`;
}

export { formatPrice, printAllElements, formatWithDate }