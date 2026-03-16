const fs = require('fs');

const size = 32;
const bpp = 32;
const pixelDataSize = size * size * 4;
const bmpHeaderSize = 40;
const imageSize = bmpHeaderSize + pixelDataSize;

const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);

const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(size, 0);
icoEntry.writeUInt8(size, 1);
icoEntry.writeUInt8(0, 2);
icoEntry.writeUInt8(0, 3);
icoEntry.writeUInt16LE(1, 4);
icoEntry.writeUInt16LE(bpp, 6);
icoEntry.writeUInt32LE(imageSize, 8);
icoEntry.writeUInt32LE(22, 12);

const bmpHeader = Buffer.alloc(bmpHeaderSize);
bmpHeader.writeUInt32LE(40, 0);
bmpHeader.writeInt32LE(size, 4);
bmpHeader.writeInt32LE(size * 2, 8);
bmpHeader.writeUInt16LE(1, 12);
bmpHeader.writeUInt16LE(bpp, 14);
bmpHeader.writeUInt32LE(0, 20);

const pixels = Buffer.alloc(pixelDataSize, 0);

function setPixel(x, y, r, g, b, a) {
  const fy = (size - 1 - y);
  const off = (fy * size + x) * 4;
  pixels[off] = b;
  pixels[off + 1] = g;
  pixels[off + 2] = r;
  pixels[off + 3] = a;
}

// Lightning bolt shape 32x32
const bolt = [
  [18,1],[19,1],[20,1],[21,1],
  [17,2],[18,2],[19,2],[20,2],[21,2],
  [16,3],[17,3],[18,3],[19,3],[20,3],
  [15,4],[16,4],[17,4],[18,4],[19,4],
  [14,5],[15,5],[16,5],[17,5],[18,5],
  [13,6],[14,6],[15,6],[16,6],[17,6],
  [12,7],[13,7],[14,7],[15,7],[16,7],
  [11,8],[12,8],[13,8],[14,8],[15,8],
  [10,9],[11,9],[12,9],[13,9],[14,9],
  [9,10],[10,10],[11,10],[12,10],[13,10],
  [8,11],[9,11],[10,11],[11,11],[12,11],
  [7,12],[8,12],[9,12],[10,12],[11,12],
  [6,13],[7,13],[8,13],[9,13],[10,13],
  [5,14],[6,14],[7,14],[8,14],[9,14],
  // wide middle section
  [4,15],[5,15],[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15],[13,15],[14,15],[15,15],[16,15],[17,15],[18,15],[19,15],[20,15],[21,15],[22,15],[23,15],[24,15],[25,15],
  [5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],[15,16],[16,16],[17,16],[18,16],[19,16],[20,16],[21,16],[22,16],[23,16],[24,16],
  // bottom part
  [18,17],[19,17],[20,17],[21,17],[22,17],[23,17],
  [17,18],[18,18],[19,18],[20,18],[21,18],[22,18],
  [16,19],[17,19],[18,19],[19,19],[20,19],[21,19],
  [15,20],[16,20],[17,20],[18,20],[19,20],[20,20],
  [14,21],[15,21],[16,21],[17,21],[18,21],[19,21],
  [13,22],[14,22],[15,22],[16,22],[17,22],[18,22],
  [12,23],[13,23],[14,23],[15,23],[16,23],[17,23],
  [11,24],[12,24],[13,24],[14,24],[15,24],[16,24],
  [10,25],[11,25],[12,25],[13,25],[14,25],[15,25],
  [10,26],[11,26],[12,26],[13,26],[14,26],
  [10,27],[11,27],[12,27],[13,27],
  [10,28],[11,28],[12,28],
  [10,29],[11,29],
  [10,30],
];

for (const [x, y] of bolt) {
  if (x >= 0 && x < size && y >= 0 && y < size) {
    setPixel(x, y, 0x36, 0x76, 0xff, 255);
  }
}

// Anti-alias edges
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const off = ((size - 1 - y) * size + x) * 4;
    if (pixels[off + 3] === 0) {
      let adj = false;
      const neighbors = [[-1,0],[1,0],[0,-1],[0,1]];
      for (const [dx, dy] of neighbors) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
          const no = ((size - 1 - ny) * size + nx) * 4;
          if (pixels[no + 3] === 255) { adj = true; break; }
        }
      }
      if (adj) setPixel(x, y, 0x36, 0x76, 0xff, 80);
    }
  }
}

const ico = Buffer.concat([icoHeader, icoEntry, bmpHeader, pixels]);
fs.writeFileSync('public/favicon.ico', ico);
console.log('favicon.ico gerado! Tamanho:', ico.length, 'bytes');
