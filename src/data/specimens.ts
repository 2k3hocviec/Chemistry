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
  5: {
    src: '/specimens/5.webp',
    credit: 'James L Marshall',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Boron_R105.jpg',
    note: 'Tinh thể Boron beta-rhombohedral nguyên chất (99.99%)'
  },
  6: {
    src: '/specimens/6.webp',
    credit: 'USGS',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:GraphiteUSGOV.jpg',
    note: 'Khoáng vật than chì (Graphite - thù hình của Carbon)'
  },
  11: {
    src: '/specimens/11.webp',
    credit: 'The original uploader was Dnn87 at English Wikipedia.',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Na_(Sodium).jpg',
    note: 'Kim loại Natri nguyên chất cắt lát lộ ánh bạc dưới dầu bảo vệ'
  },
  12: {
    src: '/specimens/12.webp',
    credit: 'Warut Roonguthai',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Magnesium_crystals.jpg',
    note: 'Tinh thể magie nguyên chất ngưng tụ từ pha hơi (99.99%)'
  },
  13: {
    src: '/specimens/13.webp',
    credit: 'Jurii (images-of-elements.com)',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Aluminium-4.jpg',
    note: 'Thỏi nhôm nguyên chất kèm khối chuẩn 1cm³'
  },
  14: {
    src: '/specimens/14.webp',
    credit: 'Jurii (images-of-elements.com)',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Silicon.jpg',
    note: 'Khối silicon tinh khiết bề mặt ánh kim cho chip bán dẫn'
  },
  15: {
    src: '/specimens/15.webp',
    credit: 'Tomihahndorf',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Phosphor_rot.jpg',
    note: 'Mẫu bột Phốt pho đỏ (Phosphorus) nguyên chất'
  },
  16: {
    src: '/specimens/16.webp',
    credit: 'Ben Mills',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sulfur-sample.jpg',
    note: 'Khối tinh thể lưu huỳnh tự nhiên màu vàng đặc trưng'
  },
  19: {
    src: '/specimens/19.webp',
    credit: 'Unknown authorUnknown author',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Potassium-2.jpg',
    note: 'Kim loại Kali (Potassium) nguyên chất cắt lát dưới dầu'
  },
  20: {
    src: '/specimens/20.webp',
    credit: 'Original upload by 范皓程',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Calcium_crystals_in_ampoule_cropped.jpg',
    note: 'Tinh thể Canxi (Calcium) nhánh cây dendrite trong ống khí trơ'
  },
  22: {
    src: '/specimens/22.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Titanium_crystal_bar.jpg',
    note: 'Thỏi tinh thể titan van Arkel-de Boer siêu tinh khiết'
  },
  23: {
    src: '/specimens/23.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de).',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vanadium_crystal_bar_and_1cm3_cube.jpg',
    note: 'Thỏi tinh thể Vanadi nguyên chất (99.9%) kèm khối 1cm³'
  },
  24: {
    src: '/specimens/24.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chromium_crystals_and_1cm3_cube.jpg',
    note: 'Tinh thể Crom (Chromium) sáng chói kèm khối 1cm³'
  },
  25: {
    src: '/specimens/25.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Manganese_electrolytic_and_1cm3_cube.jpg',
    note: 'Mảnh Mangan điện phân siêu tinh khiết (99.99%) kèm khối 1cm³'
  },
  26: {
    src: '/specimens/26.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Iron_electrolytic_and_1cm3_cube.jpg',
    note: 'Sắt điện phân siêu tinh khiết (99.97%) kèm khối 1cm³'
  },
  27: {
    src: '/specimens/27.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kobalt_electrolytic_and_1cm3_cube.jpg',
    note: 'Cobalt điện phân nguyên chất (≥99.9%) kèm khối 1cm³'
  },
  28: {
    src: '/specimens/28.webp',
    credit: 'Materialscientist',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nickel_chunk.jpg',
    note: 'Khối niken nguyên chất kết tinh (≥99.9%)'
  },
  29: {
    src: '/specimens/29.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Copper_crystals.jpg',
    note: 'Tinh thể đồng tự do kết tinh điện phân (≥99.95%)'
  },
  30: {
    src: '/specimens/30.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zinc_fragment_sublimed_and_1cm3_cube.jpg',
    note: 'Mảnh kẽm ngưng tụ thăng hoa độ tinh khiết cao'
  },
  31: {
    src: '/specimens/31.webp',
    credit: 'en:user:foobar',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gallium_crystals.jpg',
    note: 'Tinh thể Gali (Gallium) siêu sạch (99.999%) tự kết tinh'
  },
  32: {
    src: '/specimens/32.webp',
    credit: 'Jurii',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Polycrystalline-germanium.jpg',
    note: 'Khối Germani đa tinh thể độ tinh khiết cao 12g'
  },
  33: {
    src: '/specimens/33.webp',
    credit: 'Arsen_1.jpg: Original uploader was Tomihahndorf at de.wikipedia derivative work: Materialscientist (talk)',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Arsen_1a.jpg',
    note: 'Tinh thể Asen (Arsenic) xám kim loại trong ống thủy tinh'
  },
  34: {
    src: '/specimens/34.webp',
    credit: 'W. Oelen',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:SeBlackRed.jpg',
    note: 'Thù hình Selen (Selenium) đen bóng thủy tinh dạng hạt'
  },
  35: {
    src: '/specimens/35.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bromine_vial_in_acrylic_cube.jpg',
    note: 'Ống brom lỏng bốc khói màu nâu đỏ trong khối acrylic'
  },
  40: {
    src: '/specimens/40.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de).',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zirconium_crystal_bar_and_1cm3_cube.jpg',
    note: 'Thỏi tinh thể Zirconi (Zirconium) siêu tinh khiết kèm khối 1cm³'
  },
  41: {
    src: '/specimens/41.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Niobium_crystals_and_1cm3_cube.jpg',
    note: 'Tinh thể Niobi (Niobium) và khối chuẩn 1cm³'
  },
  42: {
    src: '/specimens/42.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Molybdenum_crystaline_fragment_and_1cm3_cube.jpg',
    note: 'Mảnh tinh thể Molipđen (Molybdenum) và khối chuẩn 1cm³'
  },
  44: {
    src: '/specimens/44.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ruthenium_a_half_bar.jpg',
    note: 'Thỏi Rutheni (Ruthenium) kim loại quý nhóm Platin đúc thỏi'
  },
  45: {
    src: '/specimens/45.webp',
    credit: 'Alchemist-hp (talk) www.pse-mendelejew.de derivative work: Purpy Pupple (talk)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rhodium_powder_pressed_melted.jpg',
    note: 'Hạt Rhodi (Rhodium) kim loại quý nguyên chất nung chảy'
  },
  46: {
    src: '/specimens/46.webp',
    credit: 'Hi-Res Images of  Chemical Elements',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Palladium_(46_Pd).jpg',
    note: 'Khối Palađi (Palladium) kim loại quý trắng bạc'
  },
  47: {
    src: '/specimens/47.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Silver_crystal.jpg',
    note: 'Tinh thể bạc kết tinh điện phân siêu tinh khiết (≥99.99%)'
  },
  48: {
    src: '/specimens/48.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cadmium-crystal_bar.jpg',
    note: 'Thỏi tinh thể Cadmi (Cadmium) ngưng tụ từ pha hơi (99.999%)'
  },
  49: {
    src: '/specimens/49.webp',
    credit: 'Nerdtalker',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Indium.jpg',
    note: 'Mẩu kim loại Indi (Indium) siêu dẻo cắt lát'
  },
  50: {
    src: '/specimens/50.webp',
    credit: '范皓程',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tin_crystals.jpg',
    note: 'Tinh thể thiếc trắng (β-tin) nguyên chất kết tinh'
  },
  51: {
    src: '/specimens/51.webp',
    credit: 'Unknown authorUnknown author',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Antimony-4.jpg',
    note: 'Mảnh tinh thể Antimon (Antimony) tự nhiên lấp lánh'
  },
  52: {
    src: '/specimens/52.webp',
    credit: 'Unknown authorUnknown author',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tellurium2.jpg',
    note: 'Khối tinh thể Telu (Tellurium) màu xám bạc'
  },
  53: {
    src: '/specimens/53.webp',
    credit: 'LHcheM',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sample_of_iodine.jpg',
    note: 'Tinh thể Iốt (Iodine) rắn màu tím đen ánh kim bốc hơi tím'
  },
  73: {
    src: '/specimens/73.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tantalum_single_crystal_and_1cm3_cube.jpg',
    note: 'Đơn tinh thể Tantan (Tantalum) và khối chuẩn 1cm³'
  },
  74: {
    src: '/specimens/74.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wolfram_evaporated_crystals_and_1cm3_cube.jpg',
    note: 'Tinh thể Vonfram (Tungsten) ngưng tụ pha hơi kèm khối 1cm³'
  },
  75: {
    src: '/specimens/75.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rhenium_single_crystal_bar_and_1cm3_cube.jpg',
    note: 'Thỏi đơn tinh thể Rheni (Rhenium) quý hiếm kèm khối 1cm³'
  },
  76: {
    src: '/specimens/76.webp',
    credit: 'Alchemist-hp (talk) (www.pse-mendelejew.de)',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Osmium_crystals.jpg',
    note: 'Tinh thể Osmi (Osmium) ánh xanh lơ lộng lẫy nặng nhất bảng tuần hoàn'
  },
  77: {
    src: '/specimens/77.webp',
    credit: 'Hi-Res Images of  Chemical Elements',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Iridium_(77_Ir)_(cropped).jpg',
    note: 'Hạt Iridi (Iridium) nguyên chất trơ tuyệt đối trước mọi axit'
  },
  78: {
    src: '/specimens/78.webp',
    credit: 'Periodictableru',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Platinum_crystals.jpg',
    note: 'Tinh thể bạch kim (platinum) nguyên chất quý hiếm'
  },
  79: {
    src: '/specimens/79.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gold_nugget.jpg',
    note: 'Khối vàng tự nhiên nguyên chất (Gold nugget, ~9g)'
  },
  80: {
    src: '/specimens/80.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'CC BY-SA 3.0 de',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hydrargyrum.jpg',
    note: 'Giọt thủy ngân nguyên chất phản xạ ánh kim thể lỏng'
  },
  82: {
    src: '/specimens/82.webp',
    credit: 'Alchemist-hp (pse-mendelejew.de)',
    license: 'FAL / CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lead_electrolytic_and_1cm3_cube.jpg',
    note: 'Chì điện phân và khối chuẩn 1cm³'
  },
  83: {
    src: '/specimens/83.webp',
    credit: 'Alchemist-hp & Richard Bartz',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bi-crystal.jpg',
    note: 'Tinh thể bismuth nhân tạo với màng oxit giao thoa đa sắc'
  },
  92: {
    src: '/specimens/92.webp',
    credit: 'Unspecified',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:HEUraniumC.jpg',
    note: 'Khối Urani (Uranium) kim loại nguyên chất độ làm giàu cao'
  },
};
