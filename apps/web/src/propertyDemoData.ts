export type PropertyDemo = {
  id: string;
  title: string;
  listingType: "Satılık" | "Kiralık";
  propertyType: string;
  price: string;
  location: string;
  squareMeters: string;
  roomCount: string;
  bathroomCount: string;
  description: string;
  highlights: string[];
  consultantName: string;
  consultantPhone: string;
  isFeatured: boolean;
};

export const propertyDemoData: PropertyDemo[] = [
  {
    id: "milas-2-1-daire",
    title: "Milas merkez 2+1 yeni daire",
    listingType: "Satılık",
    propertyType: "Daire",
    price: "₺2.850.000",
    location: "Milas / Merkez",
    squareMeters: "95 m²",
    roomCount: "2+1",
    bathroomCount: "1",
    description: "Merkezi konumda, yeni bina içinde, aile yaşamına uygun ferah 2+1 daire. Emlak şablonu için örnek portföy kartıdır.",
    highlights: ["Merkezi konum", "Yeni bina", "Krediye uygun", "Aile yaşamı"],
    consultantName: "Faruk Danışman",
    consultantPhone: "+90 5xx xxx xx xx",
    isFeatured: true
  },
  {
    id: "yalikavak-villa",
    title: "Yalıkavak günlük kiralık villa",
    listingType: "Kiralık",
    propertyType: "Villa",
    price: "₺35.000 / gün",
    location: "Bodrum / Yalıkavak",
    squareMeters: "240 m²",
    roomCount: "4+1",
    bathroomCount: "3",
    description: "Denize yakın, havuzlu ve sezonluk/günlük kiralamaya uygun premium villa örneği.",
    highlights: ["Havuzlu", "Denize yakın", "Günlük kiralık", "Premium portföy"],
    consultantName: "Meltem Danışman",
    consultantPhone: "+90 5xx xxx xx xx",
    isFeatured: true
  },
  {
    id: "milas-zeytinlik-arsa",
    title: "Yatırımlık zeytinlik arsa",
    listingType: "Satılık",
    propertyType: "Arsa",
    price: "₺1.500.000",
    location: "Milas / Kırsal",
    squareMeters: "5.000 m²",
    roomCount: "Arsa",
    bathroomCount: "-",
    description: "Kırsal bölgede yatırım ve tarımsal kullanım için uygun örnek zeytinlik arsa portföyü.",
    highlights: ["Zeytinlik", "Yatırımlık", "Kırsal bölge", "Geniş arazi"],
    consultantName: "Faruk Danışman",
    consultantPhone: "+90 5xx xxx xx xx",
    isFeatured: false
  }
];

export function findPropertyById(id: string | string[] | undefined) {
  const normalizedId = Array.isArray(id) ? id[0] : id;
  return propertyDemoData.find((property) => property.id === normalizedId) || propertyDemoData[0];
}
