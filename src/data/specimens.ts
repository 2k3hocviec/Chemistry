export interface SpecimenInfo {
  src: string;
  credit: string;
  license: string;
  sourceUrl: string;
  note?: string;
}

export const SPECIMENS: Record<number, SpecimenInfo> = {
  3: {
    src: '/specimens/3.webp',
    credit: 'AdvancedTinkering',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Purified_lithium_in_an_ampoule_under_argon,_dark_background.png',
    note: 'Lithium chưng cất chân không trong ống thủy tinh khí Argon'
  },
  4: {
    src: '/specimens/4.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Be-140g.jpg',
    note: 'Mảnh tinh thể Beryllium nguyên chất (>99%, >140g)'
  },
  27: {
    src: '/specimens/27.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kobalt_electrolytic_and_1cm3_cube.jpg',
    note: 'Cobalt điện phân nguyên chất (≥99.9%) kèm khối 1cm³'
  },
  26: {
    src: '/specimens/26.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Iron_electrolytic_and_1cm3_cube.jpg',
    note: 'Sắt điện phân siêu tinh khiết (99.97%) kèm khối 1cm³'
  },
  29: {
    src: '/specimens/29.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Copper_crystals.jpg',
    note: 'Tinh thể đồng tự do kết tinh điện phân (≥99.95%)'
  },
  79: {
    src: '/specimens/79.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gold_nugget.jpg',
    note: 'Khối vàng tự nhiên nguyên chất (Gold nugget, ~9g)'
  },
  47: {
    src: '/specimens/47.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Silver_crystal.jpg',
    note: 'Tinh thể bạc kết tinh điện phân siêu tinh khiết (≥99.99%)'
  },
  13: {
    src: '/specimens/13.webp',
    credit: 'Jurii (images-of-elements.com)',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Aluminium-4.jpg',
    note: 'Thỏi nhôm nguyên chất kèm khối chuẩn 1cm³'
  },
  30: {
    src: '/specimens/30.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zinc_fragment_sublimed_and_1cm3_cube.jpg',
    note: 'Mảnh kẽm ngưng tụ thăng hoa độ tinh khiết cao'
  },
  28: {
    src: '/specimens/28.webp',
    credit: 'Materialscientist',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nickel_chunk.jpg',
    note: 'Khối niken nguyên chất kết tinh (≥99.9%)'
  },
  22: {
    src: '/specimens/22.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Titanium_crystal_bar.jpg',
    note: 'Thỏi tinh thể titan van Arkel-de Boer siêu tinh khiết'
  },
  50: {
    src: '/specimens/50.webp',
    credit: '范皓程',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tin_crystals.jpg',
    note: 'Tinh thể thiếc trắng (β-tin) nguyên chất kết tinh'
  },
  82: {
    src: '/specimens/82.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lead_electrolytic_and_1cm3_cube.jpg',
    note: 'Chì điện phân và khối chuẩn 1cm³'
  },
  16: {
    src: '/specimens/16.webp',
    credit: 'Ben Mills',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sulfur-sample.jpg',
    note: 'Khối tinh thể lưu huỳnh tự nhiên màu vàng đặc trưng'
  },
  6: {
    src: '/specimens/6.webp',
    credit: 'USGS',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:GraphiteUSGOV.jpg',
    note: 'Khoáng vật than chì (Graphite - thù hình của Carbon)'
  },
  14: {
    src: '/specimens/14.webp',
    credit: 'Jurii (images-of-elements.com)',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Silicon.jpg',
    note: 'Khối silicon tinh khiết bề mặt ánh kim cho chip bán dẫn'
  },
  80: {
    src: '/specimens/80.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hydrargyrum.jpg',
    note: 'Giọt thủy ngân nguyên chất phản xạ ánh kim thể lỏng'
  },
  35: {
    src: '/specimens/35.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bromine_vial_in_acrylic_cube.jpg',
    note: 'Ống brom lỏng bốc khói màu nâu đỏ trong khối acrylic'
  },
  83: {
    src: '/specimens/83.webp',
    credit: 'Alchemist-hp & Richard Bartz',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bi-crystal.jpg',
    note: 'Tinh thể bismuth nhân tạo với màng oxit giao thoa đa sắc'
  },
  78: {
    src: '/specimens/78.webp',
    credit: 'Periodictableru',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Platinum_crystals.jpg',
    note: 'Tinh thể bạch kim (platinum) nguyên chất quý hiếm'
  },
  12: {
    src: '/specimens/12.webp',
    credit: 'Warut Roonguthai',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Magnesium_crystals.jpg',
    note: 'Tinh thể magie nguyên chất ngưng tụ từ pha hơi (99.99%)'
  }
};
