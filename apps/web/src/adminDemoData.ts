export type DemoRequestStatus = "new" | "contacted" | "confirmed" | "cancelled" | "completed";

export type DemoRequest = {
  id: string;
  template: "appointment" | "salon" | "real-estate" | "cafe" | "kindergarten" | "event-venue";
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
    id: "LOTUS-1001",
    template: "cafe",
    customerName: "Ayşe Yılmaz",
    customerPhone: "+90 532 *** ** 18",
    subject: "Börek çeşitleri ve fiyat bilgisi",
    date: "Bugün 10:20",
    status: "new",
    source: "whatsapp"
  },
  {
    id: "LOTUS-1002",
    template: "cafe",
    customerName: "Mehmet Çakır",
    customerPhone: "+90 544 *** ** 90",
    subject: "Toplu sipariş talebi",
    date: "Bugün 12:45",
    status: "contacted",
    source: "website"
  },
  {
    id: "LOTUS-1003",
    template: "cafe",
    customerName: "Meltem Kurtuluş",
    customerPhone: "+90 555 *** ** 42",
    subject: "Cevizli baklava ve kurabiye bilgisi",
    date: "Yarın 09:00",
    status: "confirmed",
    source: "instagram"
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
