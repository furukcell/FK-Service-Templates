export type DemoRequestStatus = "new" | "contacted" | "confirmed" | "cancelled" | "completed";

export type DemoRequest = {
  id: string;
  template: "appointment" | "salon" | "real-estate";
  customerName: string;
  customerPhone: string;
  subject: string;
  date: string;
  status: DemoRequestStatus;
  source: "website" | "qr" | "instagram" | "whatsapp";
};

export type DemoProperty = {
  id: string;
  title: string;
  listingType: "Satılık" | "Kiralık";
  price: string;
  location: string;
  isFeatured: boolean;
};

export const demoRequests: DemoRequest[] = [
  {
    id: "REQ-1001",
    template: "appointment",
    customerName: "Ayşe Yılmaz",
    customerPhone: "+90 532 *** ** 18",
    subject: "Kedi aşı randevusu",
    date: "Bugün 14:30",
    status: "new",
    source: "website"
  },
  {
    id: "REQ-1002",
    template: "salon",
    customerName: "Meltem Kurtuluş",
    customerPhone: "+90 555 *** ** 42",
    subject: "Saç kesim ve fön",
    date: "Yarın 11:00",
    status: "confirmed",
    source: "instagram"
  },
  {
    id: "REQ-1003",
    template: "real-estate",
    customerName: "Mehmet Çakır",
    customerPhone: "+90 544 *** ** 90",
    subject: "Milas satılık arsa talebi",
    date: "2 saat önce",
    status: "contacted",
    source: "qr"
  }
];

export const demoProperties: DemoProperty[] = [
  {
    id: "PRP-201",
    title: "Milas merkez 2+1 daire",
    listingType: "Satılık",
    price: "₺2.850.000",
    location: "Milas / Merkez",
    isFeatured: true
  },
  {
    id: "PRP-202",
    title: "Bodrum günlük kiralık villa",
    listingType: "Kiralık",
    price: "₺35.000 / gün",
    location: "Bodrum / Yalıkavak",
    isFeatured: true
  },
  {
    id: "PRP-203",
    title: "Yatırımlık zeytinlik arsa",
    listingType: "Satılık",
    price: "₺1.500.000",
    location: "Milas / Kırsal",
    isFeatured: false
  }
];

export const statusLabels: Record<DemoRequestStatus, string> = {
  new: "Yeni",
  contacted: "Arandı",
  confirmed: "Onaylandı",
  cancelled: "İptal",
  completed: "Tamamlandı"
};
