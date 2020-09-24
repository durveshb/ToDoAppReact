import urgLow from "./assets/urgLow.svg";
import urgMedium from "./assets/urgMedium.svg";
import urgHigh from "./assets/urgHigh.svg";
import catPer from "./assets/catPersonal.svg";
import catAca from "./assets/catAcademic.svg";
import catSoc from "./assets/catSocial.svg";

export const urgencyLevels = [
  { id: "ug-1", name: "Low", value: "1", src: urgLow },
  {
    id: "ug-2",
    name: "Medium",
    value: "2",
    src: urgMedium,
  },
  { id: "ug-3", name: "High", value: "3", src: urgHigh },
];

export const categories = [
  {
    id: "ct-1",
    name: "Personal",
    value: "1",
    src: catPer,
  },
  {
    id: "ct-2",
    name: "Academic",
    value: "2",
    src: catAca,
  },
  {
    id: "ct-3",
    name: "Social",
    value: "3",
    src: catSoc,
  },
];
