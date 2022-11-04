export const masterdata = [
  {
    key: "cn_vienan",
    label: "Chi nhanh Vien an",
    path: "",
  },
  {
    key: "cn_kho",
    label: "Chi nhanh Kho",
    path: "",
  },
  {
    key: "cn_con",
    label: "Chi nhanh con",
    path: "",
  },
  {
    key: "document",
    label: "Tai lieu",
    path: "cn_vienan",
  },
  {
    key: "document",
    label: "Tai lieu",
    path: "cn_kho",
  },
  {
    key: "document",
    label: "Tai lieu",
    path: "cn_con",
  },
  {
    key: "doctor",
    label: "Bac si",
    path: "cn_vienan/department",
  },
  {
    key: "doctor",
    label: "Bac si",
    path: "cn_kho/department",
  },
  {
    key: "doctor",
    label: "Bac si",
    path: "cn_con/department",
  },
  {
    key: "work",
    label: "Cong vien",
    path: "cn_vienan/department/doctor",
  },
  {
    key: "work",
    label: "Cong vien",
    path: "cn_kho/department/doctor",
  },
  {
    key: "work",
    label: "Cong vien",
    path: "cn_con/department/doctor",
  },
  {
    key: "bill",
    label: "Hoa don",
    path: "cn_vienan",
  },
  {
    key: "bill",
    label: "Hoa don",
    path: "cn_kho",
  },
  {
    key: "bill",
    label: "Hoa don",
    path: "cn_con",
  },
  {
    key: "rating",
    label: "Danh gia",
    path: "cn_vienan/bill",
  },
  {
    key: "rating",
    label: "Danh gia",
    path: "cn_kho/bill",
  },
  {
    key: "rating",
    label: "Danh gia",
    path: "cn_con/bill",
  },
  {
    key: "department",
    label: "Phong ban",
    path: "cn_vienan",
  },
  {
    key: "department",
    label: "Phong ban",
    path: "cn_kho",
  },
  {
    key: "department",
    label: "Phong ban",
    path: "cn_con",
  },
];

export const columns = {
  cn: ["title", "address", "city", "state", "province"],
  document: ["name", "type", "description", "size"],
  doctor: ["name", "salary", "rank", "major"],
  work: ["time", "from", "to", "days"],
  bill: ["amount", "date", "type", "action"],
  rating: ["count", "quality", "bad", "good"],
  department: ["name", "address", "type", "major"],
};
