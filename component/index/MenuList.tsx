import Link from "next/link";
import styles from "@/app/page.module.css";
import { SlGameController } from "react-icons/sl";
import { JSX } from "react";
import { MdOutlineSwapVerticalCircle } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { IoTodayOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa6";

const MENUS: Array<{
  name: string;
  className?: string;
  description: string;
  icon: JSX.Element;
  link: string;
}> = [
  {
    name: "Typing Game",
    className: styles.onlyPC,
    description: "Enjoy typing games and measure your accuracy",
    icon: <SlGameController />,
    link: "/typing",
  },
  {
    name: "Text Converter",
    description: "Convert text to another format",
    icon: <MdOutlineSwapVerticalCircle />,
    link: "/converter",
  },
  {
    name: "Password Maker",
    description: "Create your own creative password.",
    icon: <CgPassword />,
    link: "/password",
  },
  {
    name: "Search Holiday",
    description: "When will the holiday be? I'm looking forward to it.",
    icon: <IoTodayOutline />,
    link: "/holiday",
  },
  {
    name: "PDF Slicer",
    description: "Split PDF files into multiple files.",
    icon: <FaRegFilePdf />,
    link: "/pdf-slice",
  },
];

const MenuList = () => {
  return MENUS.map((tool, index) => (
    <Link key={index} href={tool.link} passHref className={tool.className}>
      <div className={styles.card}>
        <div className={styles.icon}>{tool.icon}</div>
        <div className={styles.cardContent}>
          <h2>{tool.name}</h2>
          <p>{tool.description}</p>
        </div>
      </div>
    </Link>
  ));
};

export default MenuList;
