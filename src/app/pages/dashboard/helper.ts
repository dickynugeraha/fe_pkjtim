export const dummyImage =
  "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg";

export const convertRouteToTitle = (route: string) => {
  let title = "";
  switch (route) {
    case "seni":
      title = "Koleksi Seni UP PKJ TIM";
      break;
    case "pementasan":
      title = "Daftar Pementasan";
      break;
    case "seniman":
      title = "Daftar Seniman";
      break;
    default:
      title = "Sekilas Info";
      break;
  }

  return title;
};

export const arrData: any = [
  {
    image: dummyImage,
    title: "Judul",
    description: "Description",
  },
  {
    image: dummyImage,
    title: "Judul",
    description: "Description",
  },
  {
    image: dummyImage,
    title: "Judul",
    description: "Description",
  },
  {
    image: dummyImage,
    title: "Judul",
    description: "Description",
  },
  {
    image: dummyImage,
    title: "Judul",
    description: "Description",
  },
];
