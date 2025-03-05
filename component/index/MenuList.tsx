import Link from "next/link";
import styles from "@/app/page.module.css";
import { SlGameController } from "react-icons/sl";
import { JSX } from "react";
// import { MdOutlineSwapVerticalCircle } from "react-icons/md";

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
  // {
  //   name: "Text Converter",
  //   description: "Convert text to another format",
  //   icon: <MdOutlineSwapVerticalCircle />,
  //   link: "/converter",
  // },
  // {
  //   name: "Tool 3",
  //   description: "Description for Tool 3",
  //   icon: <FaCogs />,
  //   link: "/tool3",
  // },
  // {
  //   name: "Tool 4",
  //   description: "Description for Tool 4",
  //   icon: <FaHammer />,
  //   link: "/tool4",
  // },
  // {
  //   name: "Tool 5",
  //   description: "Description for Tool 5",
  //   icon: <FaScrewdriver />,
  //   link: "/tool5",
  // },
  // {
  //   name: "Tool 6",
  //   description: "Description for Tool 6",
  //   icon: <FaPencilRuler />,
  //   link: "/tool6",
  // },
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
